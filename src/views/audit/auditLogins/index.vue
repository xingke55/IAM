<template>
  <div>
    <div class="search-header">
      <div><span>登录账号：</span> <el-input v-model="form.userName" style="width:200px" /></div>
      <div><span>姓名：</span> <el-input v-model="form.displayName" style="width:200px" /></div>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button @click="showMore = !showMore">{{ showMore?"收起":"展开" }}</el-button>

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
      <Table v-bind="tableConfig" :list-data="listData" />
    </div>

  </div>
</template>
<script>
import Table from '@/components/Table'
import { tableConfig } from './tc.config.js'
export default {
  name: 'AuditLogin',
  components: {
    Table
  },
  data() {
    return {
      form: { userName: '', displayName: '', startDate: '', endDate: '' },
      showMore: false,
      listData: [],
      tableConfig: {}
    }
  },
  created() {
    this.tableConfig = tableConfig
  },
  methods: {
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
.content-table{
  padding-top:20px;
  min-height:calc(100vh - 150px);
  width: 100%;
  box-sizing: border-box;
  background-color: #f5f7fa;
}
</style>
