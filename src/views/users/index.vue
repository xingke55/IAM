<template>
  <div>
    <div class="search-header">
      <div>
        <span>登录账号：</span>
        <el-input v-model="form.userName" style="width: 200px" />
      </div>

      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="content-table">
      <div class="content-inner">
        <div class="inner-btn">
          <el-button type="primary" @click="add">新增</el-button>
          <el-button type="primary" @click="changePassword">密码修改</el-button>
          <el-button
            type="danger"
            style="margin-bottom: 10px"
            @click="remove"
          >删除</el-button>
        </div>
        <div class="inner-content">
          <div class="left">
            <FileTree
              ref="fileTree"
              :tree-data="treeData"
              :default-props="defaultProps"
              :command-drop-data="commandDropData"
              :expanded-tree-keys="[-1]"
              @node-click="handleClickNode"
              @updateNode="handleUpdateNode"
              @createNode="handleCreateNode"
              @deleteNode="handleDeleteNode"
              @clickDropCommand="handleClickDropCommand"
            />
          </div>
          <div class="right">
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
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import FileTree from '@/components/FileTree'
import { tableConfig } from './tc.config.js'
export default {
  name: 'Users',
  components: {
    Table,
    FileTree
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
      ],
      treeData: [
        {
          accessType: 1,
          children: [
            {
              accessType: 1,
              children: [
                {
                  accessType: 1,
                  children: null,
                  id: '1821800187108716545',
                  level: 3,
                  name: 'a1',
                  nodeType: 'report',
                  path: null,
                  pid: '1821800157442404354'
                }
              ],
              id: '1821800157442404354',
              level: 2,
              name: 'aaa',
              nodeType: 'folder',
              path: null,
              pid: -1
            },
            {
              accessType: 1,
              children: [
                {
                  accessType: 1,
                  children: null,
                  id: '1823198226771800065',
                  level: 4,
                  name: 'zzz',
                  nodeType: 'report',
                  path: null,
                  pid: '1823198200599343106'
                },
                {
                  accessType: 1,
                  children: null,
                  id: '1825702677811240962',
                  level: 4,
                  name: '0',
                  nodeType: 'report',
                  path: null,
                  pid: '1823198200599343106'
                },
                {
                  accessType: 1,
                  children: null,
                  id: '1825715109417918465',
                  level: 4,
                  name: 'bbb',
                  nodeType: 'report',
                  path: null,
                  pid: '1823198200599343106'
                },
                {
                  accessType: 1,
                  children: null,
                  id: '1825719466108592129',
                  level: 4,
                  name: '3323',
                  nodeType: 'report',
                  path: null,
                  pid: '1823198200599343106'
                }
              ],
              id: '1823198200599343106',
              level: 2,
              name: 'zsr',
              nodeType: 'folder',
              path: null,
              pid: -1
            },
            {
              accessType: 1,
              children: null,
              id: '1821806329784365058',
              level: 2,
              name: 'a2',
              nodeType: 'report',
              path: null,
              pid: -1
            },
            {
              accessType: 1,
              children: null,
              id: '1821808273017991169',
              level: 1,
              name: '图表',
              nodeType: 'report',
              path: null,
              pid: -1
            },
            {
              accessType: 1,
              children: null,
              id: '1821814879776600066',
              level: 2,
              name: '辅助',
              nodeType: 'report',
              path: null,
              pid: -1
            },
            {
              accessType: 1,
              children: null,
              id: '1821820442652635137',
              level: 2,
              name: '详细表',
              nodeType: 'report',
              path: null,
              pid: -1
            },
            {
              accessType: 1,
              children: null,
              id: '1823926967013666817',
              level: 2,
              name: '123',
              nodeType: 'report',
              path: null,
              pid: -1
            }
          ],
          id: -1,
          level: 0,
          name: '数据报告',
          nodeType: 'folder',
          path: null,
          pid: -2
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      commandDropData: {
        folder: [
          {
            value: false,
            name: '新建文件夹',
            option: 'create',
            icon: 'iconfont el-icon-folder-add'
          },
          {
            value: false,
            name: '添加报告',
            option: 'addreport',
            icon: 'iconfont el-icon-document-add'
          },

          {
            value: true,
            name: '删除',
            option: 'delete',
            icon: 'iconfont el-icon-folder-delete'
          }
        ],
        report: [

          {
            name: '删除',
            option: 'delete',
            icon: 'iconfont el-icon-document-delete'
          }
        ]
      }
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
    handleRemoveClick() {},
    changePassword() {},

    handleClickDropCommand() {},
    handleClickNode() {},
    handleUpdateNode() {},
    handleCreateNode() {},
    handleDeleteNode() {}
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
    height: calc(100vh - 170px);
    width: 100%;
    .inner-btn {
      height: 60px;
    }
    .inner-content {
      display: flex;
      justify-content: flex-start;
      height: 100%;
      flex-wrap: nowrap;
      .left {
        width: 30%;
        border: 1px solid #ccc;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
