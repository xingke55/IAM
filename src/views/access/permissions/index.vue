<template>
  <div>
    <div class="search-header">
      <div class="search-select">
        <span>角色名称：</span>
        <el-input v-model="form.userName" style="width: 200px">
          <el-button slot="append" type="primary">选择</el-button>
        </el-input>
      </div>
      <div class="search-select">
        <span>应用名称：</span> <el-input v-model="form.displayName" style="width: 200px" />
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
          <template #iconHandler="scope">
            <div class="handle-btns">
              <img class="icon-img" :src="scope.row.iconBase64" alt="" />
            </div>
          </template>
          <template #handler="scope">
            <div class="handle-btns">
              <el-button
                style="margin-right: 10px"
                plain
                type="danger"
                @click="handleRemoveClick(scope.row)"
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
import { tableConfig } from './tc.config.js'
import { appsInRole } from '@/api/access.js'
export default {
  name: 'Permission',
  components: {
    Table
  },
  data() {
    return {
      form: {
        userName: '',
        displayName: '',
        startDate: '',
        endDate: '',
        nmuber: ''
      },
      page: { pageNumber: 1, pageSize: 10 },
      showMore: false,
      listData: [{ name: 'test' }],
      tableConfig: {},
      loading: false
    }
  },
  created() {
    this.tableConfig = tableConfig
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      appsInRole({ ...this.form, ...this.page })
        .then((res) => {
          this.listData = res.data.rows
          this.loading = false
          this.page.pageNumber = res.data.page
          this.page.pageSize = res.data.totalPage
        })
        .catch((e) => {
          this.loading = false
        })
    },
    search() {},
    resetForm() {},
    add() {},
    remove() {},
    handleRemoveClick() {}
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
.icon-img {
  max-width: 32px;
  max-height: 32px;
  margin-right: 4px;
  vertical-align: middle;
  border-radius: 4px;
}
</style>
