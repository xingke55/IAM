<template>
  <div>
    <div class="search-header">
      <div>
        <span>登录账号：</span>
        <el-input v-model="form.userName" style="width: 200px" />
      </div>
      <div>
        <span>姓名：</span>
        <el-input v-model="form.displayName" style="width: 200px" />
      </div>
      <div>
        <span>员工编号：</span>
        <el-input v-model="form.number" style="width: 200px" />
      </div>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button @click="showMore = !showMore">{{ showMore ? '收起' : '展开' }}</el-button>

      <div v-if="showMore" class="showMore">
        <div>
          <span>开始时间：</span>
          <el-date-picker
            v-model="form.startDate"
            type="datetime"
            style="width: 300px; margin-right: 10px"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </div>
        <div>
          <span>结束时间：</span>
          <el-date-picker
            v-model="form.endDate"
            type="datetime"
            style="width: 300px; margin-right: 10px"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </div>
      </div>
    </div>
    <div class="content-table">
      <div class="content-inner">
        <el-button type="danger" style="margin-bottom: 10px" @click="remove">删除</el-button>
        <Table
          v-model="page"
          v-loading="loading"
          v-bind="tableConfig"
          :list-data="listData"
          :list-count="listData.length"
          @pageChange="init"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { tableConfig } from './tc.config.js'
import { accessSession } from '@/api/access.js'
export default {
  name: 'Sessions',
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
      listData: [],
      tableConfig: {}
    }
  },
  created() {
    this.tableConfig = tableConfig
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      accessSession({ ...this.form, ...this.page })
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
      this.form = { roleName: '', appName: '', startDate: '', endDate: '', nmuber: '' }
      this.page = { pageNumber: 1, pageSize: 10 }
      this.init()
    },
    remove() {},
    add() {}
  }
}
</script>
<style lang='scss' scoped>
.search-header {
  padding: 20px;
  background-color: #fff;
  div {
    display: inline-block;
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
