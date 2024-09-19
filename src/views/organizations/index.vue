<template>
  <div>
    <div class="search-header">
      <div>
        <span>组织名称：</span>
        <el-input v-model="form.userName" style="width: 200px" />
      </div>

      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="content-table">
      <div class="content-inner">
        <div class="inner-btn">
          <el-button type="primary" @click="add">新增</el-button>
          <el-button type="danger" style="margin-bottom: 10px" @click="remove">删除</el-button>
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
              v-model="page"
              v-loading="loading"
              v-bind="tableConfig"
              :list-data="listData"
              :list-count="listData.length"
              @pageChange="init"
            >
              <template #handler="scope">
                <div class="handle-btns">
                  <div class="handle-btns">
                    <el-button
                      style="margin-right: 10px"
                      plain
                      size="mini"
                      @click="handleEditClick(scope.row.id)"
                      >编辑</el-button>
                    <el-button size="mini" plain type="danger" @click="handleDeleteOrg([scope.row.orgCode])">删除</el-button>
                  </div>
                </div>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <span slot="title" class="dialog-footer">
        <div>编辑</div>
      </span>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="基本信息" name="first"><el-form
            key="first"
            ref="firstRef"
            :rules="formEditorRules"
            :model="firstFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="组织编码：" prop="orgCode">
              <el-input v-model="firstFormEditor.orgCode"></el-input>
            </el-form-item>
            <el-form-item label="组织名称：" prop="orgName">
              <el-input v-model="firstFormEditor.orgName"></el-input>
            </el-form-item>
            <el-form-item label="组织全称：" prop="fullName">
              <el-input v-model="firstFormEditor.fullName"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="type">
              <el-select v-model="firstFormEditor.type" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父级名称：">
              <el-input v-model="firstFormEditor.parentName"></el-input>
            </el-form-item>

            <el-form-item label="排序：">
              <el-input v-model="firstFormEditor.sortIndex"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <el-switch
                v-model="firstFormEditor.status"
                active-color="#13ce66"
                inactive-color="#909399"
              >
              </el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="扩展信息" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
            ><el-form-item label="编码路径：">
              <el-input v-model="secondFormEditor.codePath"></el-input>
            </el-form-item>
            <el-form-item label="名称路径：">
              <el-input v-model="secondFormEditor.namePath"></el-input>
            </el-form-item>
            <el-form-item label="级别：">
              <el-input v-model="secondFormEditor.level"></el-input>
            </el-form-item>

            <el-form-item label="分支机构：">
              <el-input v-model="secondFormEditor.division"></el-input>
            </el-form-item> </el-form></el-tab-pane>
        <el-tab-pane label="地址" name="third"><el-form
            key="third"
            ref="thirdRef"
            :rules="formEditorRules"
            :model="thirdFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="国家：">
              <el-input v-model="thirdFormEditor.organization"></el-input>
            </el-form-item>
            <el-form-item label="省/州">
              <el-input v-model="thirdFormEditor.region"></el-input>
            </el-form-item>
            <el-form-item label="市：">
              <el-input v-model="thirdFormEditor.locality" disabled></el-input>
            </el-form-item>
            <el-form-item label="街道：">
              <el-input v-model="thirdFormEditor.street"></el-input>
            </el-form-item>

            <el-form-item label="地址：">
              <el-input v-model="thirdFormEditor.address"></el-input>
            </el-form-item> </el-form></el-tab-pane>
        <el-tab-pane label="联系方式" name="fourth"><el-form
            key="fourth"
            ref="fourthRef"
            :rules="formEditorRules"
            :model="fourthFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="联系人：">
              <el-input v-model="fourthFormEditor.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="fourthFormEditor.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：">
              <el-input v-model="fourthFormEditor.email"></el-input>
            </el-form-item>
            <el-form-item label="传真：">
              <el-input v-model="fourthFormEditor.fax"></el-input> </el-form-item>‘

            <el-form-item label="邮政编码：">
              <el-input v-model="fourthFormEditor.postalCode"></el-input>
            </el-form-item> </el-form></el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleUpdate">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Table from '@/components/Table'
import FileTree from '@/components/FileTree'
import { tableConfig } from './tc.config.js'
import { orgsFetch, orgsGet, orgUpdate, orgsDelete } from '@/api/org.js'
export default {
  name: 'Organizations',
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
        nmuber: ''
      },
      formCpn: {},
      page: { pageNumber: 1, pageSize: 10 },
      loading: false,
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
      },
      formEditorRules: {
        orgCode: [{ required: true, message: '请输入组织编码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        fullName: [{ required: true, message: '请输入组织全称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      },
      dialogVisible: false,
      activeName: 'first',
      firstFormEditor: {
        orgCode: '',
        orgName: '',
        fullName: '',
        type: '',
        parentName: '',
        sortIndex: '',
        status: ''
      },
      secondFormEditor: {
        codePath: '',
        namePath: '',
        level: 0,
        division: ''
      },
      thirdFormEditor: {
        country: '',
        region: '',
        locality: '',
        street: '',
        address: ''
      },
      fourthFormEditor: {
        contact: '',
        phone: '',
        email: '',
        fax: '',
        postalCode: ''
      },
      typeOptions: [
        { value: 'company', label: '公司' },
        { value: 'division', label: '分支机构' },
        { value: 'department', label: '部门' },
        { value: 'team', label: '组' },
        { value: 'entity', label: '实体' },
        { value: 'virtual', label: '虚拟' }
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
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      orgsFetch({ ...this.form, ...this.page })
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
    handleRemoveClick() {},
    changePassword() {},

    handleClickDropCommand() {},
    handleClickNode() {},
    handleUpdateNode() {},
    handleCreateNode() {},
    handleDeleteNode() {},
    handleEditClick(id) {
      orgsGet(id)
        .then((res) => {
          for (let index = 0; index < 4; index++) {
            let formName = ''
            if (index === 0) {
              formName = 'firstFormEditor'
            } else if (index === 1) {
              formName = 'secondFormEditor'
            } else if (index === 2) {
              formName = 'thirdFormEditor'
            } else {
              formName = 'fourthFormEditor'
            }
            for (const key in this[formName]) {
              this[formName][key] = res.data[key]
            }
          }
          this.$nextTick(() => {
            this.formCpn['first'] = this.$refs[`firstRef`]
          })
          this.dialogVisible = true
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleUpdate() {
      const allFomPromise = Object.keys(this.formCpn).map((key, index) => {
        return new Promise((resolve) => {
          this.formCpn[key].validate((res) => {
            resolve(res)
          })
        })
      })
      Promise.all(allFomPromise)
        .then((res) => {
          // 找出第一个校验报错的表单
          const index = res.indexOf(false)
          if (index === -1) {
            // 无报错
            console.log('提交')
            const data = Object.assign(
              {},
              this.firstFormEditor,
              this.secondFormEditor,
              this.thirdFormEditor,
              this.fourthFormEditor,
              this.fifthFormEditor
            )
            orgUpdate(data)
              .then((res) => {
                this.init()
              })
              .catch((e) => {
                console.log(e)
              })
          } else {
            let formIndex
            if (index === 0) {
              formIndex = 'first'
            } else if (index === 1) {
              formIndex = 'second'
            } else if (index === 2) {
              formIndex = 'third'
            } else if (index === 3) {
              formIndex = 'fourth'
            } else {
              formIndex = 'fifth'
            }
            this.activeName = formIndex
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleDeleteOrg(ids) {
      const idArr = [...ids]
      this.loading = true
      orgsDelete(idArr.join(',')).then(res => {
        this.loading = false
        this.$message.success('删除成功')
        this.init()
      }).catch(e => {
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
