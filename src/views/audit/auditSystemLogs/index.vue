<template>
  <div>
    <div class="search-header">
      <div><span>登录账号：</span> <el-input v-model="form.userName" style="width: 200px" /></div>
      <div><span>姓名：</span> <el-input v-model="form.displayName" style="width: 200px" /></div>
      <div><span>员工编号：</span> <el-input v-model="form.number" style="width: 200px" /></div>
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
</template>
<script>
import Table from '@/components/Table'
import { tableConfig } from './tc.config.js'
import { fetchSystemLogs } from '@/api/history'
export default {
  name: 'AuditSystemLogs',
  components: {
    Table
  },
  data() {
    return {
      form: { userName: '', displayName: '', startDate: '', endDate: '', nmuber: '' },
      showMore: false,
      listData: [],
      tableConfig: {},
      page: { pageNumber: 1, pageSize: 10 }
    }
  },
  created() {
    this.tableConfig = tableConfig
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      fetchSystemLogs({ ...this.form, ...this.page })
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
    resetForm() {}
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
}
</style>
