<template>
  <div>
    <div class="search-header">
      <div>
        <span>应用名称：</span>
        <el-input v-model="form.userName" style="width:200px" />
      </div>
      <div>
        <span>协议：</span>
        <el-select v-model="form.display" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        <Table
          v-model="form.pageInfo"
          v-bind="tableConfig"
          :list-data="listData"
          :list-count="listData.length"
        >
          <template #handler="scope">
            <div class="handle-btns">
              <div class="handle-btns">
                <el-button
                  style="margin-right: 10px"
                  plain
                  @click="handleEditClick(scope.row)"
                >编辑</el-button>
                <el-dropdown>
                  <el-button plain>
                    更多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-button
                      size="mini"
                      type="text"
                    >资源</el-button></el-dropdown-item>

                    <el-dropdown-item><el-button
                      size="mini"
                      type="text"
                      style="color: #f56c6c"
                    >删除</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
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
  name: 'Application',
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
        nmuber: '',
        pageInfo: {
          currentPage: 1,
          pageSize: 10
        }
      },
      showMore: false,
      listData: [{ name: 'test' }],
      tableConfig: {},
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ]
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
  },
  methods: {
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
