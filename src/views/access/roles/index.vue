<template>
  <div>
    <div class="search-header">
      <div>
        <span>角色名称：</span>
        <el-input v-model="form.roleName" style="width: 200px" />
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
                @click="handleEditClick(scope.row)"
                >编辑</el-button>
              <el-dropdown>
                <el-button size="mini" plain>
                  更多<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><el-button size="mini" type="text" @click="routeToMember(scope.row)">成员</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button size="mini" type="text" @click="routeToPermission(scope.row)">访问权限</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                      size="mini"
                      type="text"
                      style="color: #f56c6c"
                      @click="handleDelete([scope.row.roleCode])"
                      >删除</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span slot="title" class="dialog-footer">
        <div>编辑</div>
      </span>
      <el-form
        ref="formEditorRef"
        :rules="formEditorRules"
        :model="formEditor"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item label="编码：" prop="roleCode">
          <el-input v-model="formEditor.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="formEditor.roleName"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio-group v-model="formEditor.category" size="mini">
            <el-radio-button label="static">静态</el-radio-button>
            <el-radio-button label="dynamic">动态</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <template v-if="formEditor.category === 'dynamic'">
          <div>
            <el-form-item label="加入时间：">
              <el-time-select
                v-model="formEditor.resumeTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:01',
                  end: '23:59'
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
            <el-form-item label="挂起时间：">
              <el-time-select
                v-model="formEditor.suspendTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:01',
                  end: '23:59'
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
            <el-form-item label="部门别表：">
              <el-cascader
                placeholder="试试搜索：指南"
                :options="options"
                :props="{ multiple: true }"
                filterable
              ></el-cascader>
            </el-form-item>
          </div>
        </template>
        <el-form-item label="描述：">
          <el-input v-model="formEditor.description" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleUpdate">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { tableConfig } from './tc.config.js'
import { accessRoles, rolesGet, rolesUpdate, rolesDelete } from '@/api/access.js'
export default {
  name: 'Roles',
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
      formEditor: {},
      dialogVisible: false,
      loading: false,
      showMore: false,
      listData: [{ name: 'test' }],
      tableConfig: {},
      page: { pageNumber: 1, pageSize: 10 },
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        }
      ],
      formEditorRules: {
        roleCode: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.tableConfig = tableConfig
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      accessRoles({ ...this.form, ...this.page })
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
    add() {},
    remove() {},
    handleEditClick(data) {
      rolesGet(data.id).then((res) => {
        this.formEditor = res.data
        this.dialogVisible = true
      })
    },
    handleUpdate() {
      this.$refs['formEditorRef'].validate((valid) => {
        if (valid) {
          rolesUpdate(this.formEditor)
            .then((res) => {})
            .catch((e) => {
              console.log(e)
            })
        } else {
          return false
        }
      })
    },
    routeToMember(row) {
      this.$router.push({
        name: 'Rolemembers',
        params: {
          roleId: row.roleId,
          roleName: row.roleName
        }
      })
    },
    routeToPermission(row) {
      this.$router.push({
        name: 'Permissions',
        params: {
          roleId: row.roleId,
          roleName: row.roleName
        }
      })
    },
    handleDelete(ids) {
      const idArr = [...ids]
      this.loading = true
      rolesDelete(idArr.join(','))
        .then((res) => {
          this.loading = false
          this.$message.success('删除成功')
          this.init()
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
