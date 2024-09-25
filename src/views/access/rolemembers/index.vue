<template>
  <div>
    <div class="search-header">
      <div class="search-select">
        <span>角色名称：</span>
        <el-input v-model="form.roleName">
          <el-button slot="append" type="primary">选择</el-button>
        </el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="content-table">
      <div class="content-inner">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" style="margin-bottom: 10px" @click="remove">删除</el-button>
        <Table
          v-model="page"
          v-loading="loading"
          v-bind="tableConfig"
          :list-data="listData"
          :list-count="listData.length"
          @pageChange="init"
        >
          <template #handler="scope">
            <div class="handle-btns">
              <el-button
                style="margin-right: 10px"
                plain
                size="mini"
                type="danger"
                @click="handleRemoveClick([scope.row.id])"
                >删除</el-button>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { memberInRole, rolemembersDelete } from '@/api/access.js'
import { tableConfig } from './tc.config.js'
export default {
  name: 'Rolemembers',
  components: {
    Table
  },
  data() {
    return {
      form: {
        roleName: '',
        displayName: '',
        startDate: '',
        endDate: '',
        nmuber: ''
      },
      page: { pageNumber: 1, pageSize: 10 },
      showMore: false,
      loading: false,
      listData: [],
      tableConfig: {}
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log('change', this.form)
      },
      deep: true
    }
  },
  created() {
    this.tableConfig = tableConfig
    const params = this.$route.params
    this.form = { ...this.form, ...params }
    this.init(params)
  },
  methods: {
    init(params) {
      const data = Object.keys(params).length
        ? { ...this.form, ...this.page, ...params }
        : { ...this.form, ...this.page }
      this.loading = true
      memberInRole(data)
        .then((res) => {
          this.listData = res.data.rows
          this.loading = false
          this.page.pageNumber = res.data.page
        })
        .catch((e) => {
          this.loading = false
        })
    },
    search() {
      this.init()
    },
    resetForm() {
      const params = this.$route.params
      this.form = { roleName: '', appName: '', startDate: '', endDate: '', nmuber: '', ...params }
      this.page = { pageNumber: 1, pageSize: 10 }
      this.init(params)
    },
    add() {},
    remove() {},
    handleRemoveClick(ids) {
      const idArr = [...ids]
      this.loading = true
      rolemembersDelete(idArr.join(','))
        .then((res) => {
          if (res.code === 2) {
            this.loading = false
            this.$message.success('删除成功')
            const params = this.$route.params

            this.form = { ...this.form, ...params }
            this.init(params)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.search-header {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  .search-select {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    span {
      width: 110px;
    }
  }
  div {
    margin-right: 12px;
  }
  .showMore {
    display: block;
    margin-top: 10px;
  }
}
.content-table {
  padding-top: 20px;
  min-height: calc(100vh - 150px);
  width: 100%;
  box-sizing: border-box;
  background-color: #f5f7fa;
  .content-inner {
    background-color: #fff;
    padding: 20px;
    width: 100%;
  }
}
</style>
