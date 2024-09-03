<template>
  <div>
    <div class="search-header">
      <div>
        <span>角色名称：</span>
        <el-input v-model="form.userName" style="width: 200px" />
      </div>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="content-table">
      <div class="content-inner">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button
          type="danger"
          style="margin-bottom: 10px"
          @click="remove"
        >删除</el-button>
        <Table v-bind="tableConfig" :list-data="listData">
          <template #handler="scope">
            <div class="handle-btns">
              <el-button style="margin-right:10px" plain @click="handleEditClick(scope.row)">编辑</el-button>
              <el-dropdown>
                <el-button plain>
                  更多<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><el-button size="mini" type="text">成员</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button size="mini" type="text">访问权限</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button size="mini" type="text" style="color:#f56c6c">删除</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
export default {
  name: 'Roles',
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
      showMore: false,
      listData: [{ name: 'test' }],
      tableConfig: {}
    }
  },
  created() {
    this.tableConfig = tableConfig
  },
  methods: {
    search() {},
    resetForm() {},
    add() {},
    remove() {},
    handleEditClick() {}
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
