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
                    <el-dropdown>
                      <el-button size="mini" plain>
                        更多<i class="el-icon-arrow-down el-icon--right" />
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><el-button size="mini" type="text">资源</el-button></el-dropdown-item>

                        <el-dropdown-item><el-button size="mini" type="text" style="color: #f56c6c" @click="handleDeleteUser([scope.row.id])">删除</el-button></el-dropdown-item>
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
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="firstFormEditor.name"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="username">
              <el-input v-model="firstFormEditor.username"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio-group v-model="firstFormEditor.gender" size="mini">
                <el-radio-button :label="2">男</el-radio-button>
                <el-radio-button :label="1">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="员工编号：" prop="employeeNumber">
              <el-input v-model="firstFormEditor.employeeNumber"></el-input>
            </el-form-item>
            <el-form-item label="域账号" prop="windowsAccount">
              <el-input v-model="firstFormEditor.windowsAccount"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="firstFormEditor.mobile"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="firstFormEditor.email"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="userType">
              <el-select v-model="firstFormEditor.userType" placeholder="请选择">
                <el-option
                  v-for="item in userTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态" prop="userState">
              <el-select v-model="firstFormEditor.userState" placeholder="请选择">
                <el-option
                  v-for="item in userStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="loginUrl">
              <el-input v-model="firstFormEditor.loginUrl"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <el-select v-model="firstFormEditor.status" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人信息" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
            ><el-col :span="12"><el-form-item label="姓：">
                <el-input v-model="secondFormEditor.familyName"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="中间名：">
                <el-input v-model="secondFormEditor.middleName"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="名：">
                <el-input v-model="secondFormEditor.givenName"></el-input> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="昵称：">
                <el-input v-model="secondFormEditor.nickName"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="证件类型：">
                <el-select v-model="secondFormEditor.idType" placeholder="请选择">
                  <el-option
                    v-for="item in idTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="证件号码：">
                <el-input v-model="secondFormEditor.idCardNo"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="婚姻状态：">
                <el-select v-model="secondFormEditor.married" placeholder="请选择">
                  <el-option
                    v-for="item in marriedOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="出生日期：">
                <el-input v-model="secondFormEditor.birthDate"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="学历：">
                <el-input v-model="secondFormEditor.education"></el-input> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="毕业院校：">
                <el-input v-model="secondFormEditor.graduateFrom"></el-input> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间：">
                <el-input v-model="secondFormEditor.graduateDate"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="工作时间：">
                <el-input v-model="secondFormEditor.startWorkDate"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="时区">
                <el-input v-model="secondFormEditor.timeZone"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="语言偏好：">
                <el-input v-model="secondFormEditor.preferredLanguage"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="个人主业：">
                <el-input v-model="secondFormEditor.webSite"></el-input> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="即时通讯：">
                <el-input v-model="secondFormEditor.defineIm"></el-input> </el-form-item></el-col> </el-form></el-tab-pane>
        <el-tab-pane label="机构信息" name="third"><el-form
            key="third"
            ref="thirdRef"
            :rules="formEditorRules"
            :model="thirdFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-col :span="12"><el-form-item label="所属组织：">
                <el-input v-model="thirdFormEditor.organization"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="分支机构：">
                <el-input v-model="thirdFormEditor.division"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="部门编号：">
                <el-input v-model="thirdFormEditor.departmentId" disabled></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="部门名称：">
                <el-input v-model="thirdFormEditor.departmentId"></el-input> </el-form-item>‘</el-col>
            <el-col :span="12">
              <el-form-item label="成本中心：">
                <el-input v-model="thirdFormEditor.costCenter"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="级别：">
                <el-input v-model="thirdFormEditor.jobLevel"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="职位：">
                <el-input v-model="thirdFormEditor.jobTitle"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="上级经理：">
                <el-input v-model="thirdFormEditor.manager"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="助理：">
                <el-input v-model="thirdFormEditor.assistant"></el-input> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="办公地址：">
                <el-input v-model="thirdFormEditor.workOfficeName"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="入职时间：">
                <el-input v-model="thirdFormEditor.entryDate"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="离职时间：">
                <el-input v-model="thirdFormEditor.quitDate"></el-input> </el-form-item></el-col> </el-form></el-tab-pane>
        <el-tab-pane label="机构扩展" name="fourth"><el-form
            key="fourth"
            ref="fourthRef"
            :rules="formEditorRules"
            :model="fourthFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-col :span="12"><el-form-item label="工作电话：">
                <el-input v-model="fourthFormEditor.workPhoneNumber"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="工作邮件：">
                <el-input v-model="fourthFormEditor.workEmail"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="国家：">
                <el-input v-model="fourthFormEditor.workCountry"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="省：">
                <el-input v-model="fourthFormEditor.workRegion"></el-input> </el-form-item>‘</el-col>
            <el-col :span="12">
              <el-form-item label="城市：">
                <el-input v-model="fourthFormEditor.workLocality"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="地址：">
                <el-input v-model="fourthFormEditor.workStreetAddress"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="邮编：">
                <el-input v-model="fourthFormEditor.workPostalCode"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="传真：">
                <el-input v-model="fourthFormEditor.workFax"></el-input> </el-form-item></el-col> </el-form></el-tab-pane>
        <el-tab-pane label="家庭信息" name="fifth"><el-form
            key="fifth"
            ref="fifthRef"
            :rules="formEditorRules"
            :model="fifthFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-col :span="12"><el-form-item label="家庭邮箱：">
                <el-input v-model="fifthFormEditor.homeEmail"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="家庭电话：">
                <el-input v-model="fifthFormEditor.homePhoneNumber"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="家庭传真：">
                <el-input v-model="fifthFormEditor.homeFax"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="家庭邮编：">
                <el-input v-model="fifthFormEditor.homePostalCode"></el-input> </el-form-item>‘</el-col>
            <el-col :span="12">
              <el-form-item label="国家：">
                <el-input v-model="fifthFormEditor.homeCountry"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="省：">
                <el-input v-model="fifthFormEditor.homeRegion"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="城市：">
                <el-input v-model="fifthFormEditor.homeLocality"></el-input> </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="家庭地址：">
                <el-input v-model="fifthFormEditor.homeStreetAddress"></el-input> </el-form-item></el-col> </el-form></el-tab-pane>
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
import { usersFetch, usersGet, usersUpdate, usersDelete } from '@/api/user.js'
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
        nmuber: ''
      },
      page: { pageNumber: 1, pageSize: 10 },
      activeName: 'first',
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
      dialogVisible: false,
      formEditorRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],

        userType: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
        userState: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        sortIndex: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      firstFormEditor: {
        gender: 1,
        name: '',
        username: '',
        loginUrl: '',
        status: '',
        userState: '',
        email: '',
        userType: '',
        employeeNumber: '',
        windowsAccount: '',
        iconBase64: '',
        mobile: '',
        sortIndex: 1
      },
      secondFormEditor: {
        familyName: '',
        middleName: '',
        givenName: 0,
        nickName: '',
        idType: '',
        idCardNo: '',
        married: '',
        birthDate: '',
        education: '',
        graduateFrom: '',
        graduateDate: '',
        startWorkDate: '',
        timeZone: '',
        preferredLanguage: '',
        webSite: '',
        defineIm: ''
      },
      thirdFormEditor: {
        organization: '',
        division: '',
        departmentId: '',
        costCenter: '',
        jobLevel: '',
        jobTitle: '',
        manager: '',
        assistant: '',
        entryDate: '',
        quitDate: '',
        workOfficeName: ''
      },
      fourthFormEditor: {
        workPhoneNumber: '',
        workEmail: '',
        workCountry: '',
        workRegion: '',
        workLocality: '',
        workStreetAddress: '',
        workPostalCode: '',
        workFax: ''
      },
      fifthFormEditor: {
        homePhoneNumber: '',
        homeFax: '',
        homePostalCode: '',
        homeCountry: '',
        homeRegion: '',
        homeLocality: '',
        homeStreetAddress: '',
        homeEmail: ''
      },
      formCpn: {},
      userTypeOptions: [
        { label: '内部员工', value: 'EMPLOYEE' },
        { label: '供应商', value: 'SUPPLIER' },
        { label: '客户', value: 'CUSTOMER' },
        { label: '承包商', value: 'CONTRACTOR' },
        { label: '经销商', value: 'DEALER' },
        { label: '合作伙伴', value: 'PARTNER' },
        { label: '外部用户', value: 'EXTERNAL' },
        { label: '实习生', value: 'INTERN' },
        { label: '临时用户', value: 'TEMP' }
      ],

      userStateOptions: [
        { label: '在职', value: 'RESIDENT' },
        { label: '离职', value: 'WITHDRAWN' },
        { label: '停薪留职', value: 'INACTIVE' },
        { label: '退休', value: 'RETIREE' }
      ],
      statusOptions: [
        { label: '活动', value: '1' },
        { label: '不活动', value: '2' },
        { label: '禁用', value: '4' },
        { label: '锁定', value: '5' },
        { label: '已删除', value: '9' }
      ],
      idTypeOptions: [
        { label: '未知', value: '0' },
        { label: '身份证', value: '1' },
        { label: '护照', value: '2' },
        { label: '学生证', value: '3' },
        { label: '军人证', value: '4' }
      ],
      marriedOptions: [
        { label: '未知', value: '0' },
        { label: '单身', value: '1' },
        { label: '已婚', value: '2' },
        { label: '离异', value: '3' },
        { label: '丧偶', value: '4' }
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
      usersFetch({ ...this.form, ...this.page })
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
      usersGet(id)
        .then((res) => {
          for (let index = 0; index < 5; index++) {
            let formName = ''
            if (index === 0) {
              formName = 'firstFormEditor'
            } else if (index === 1) {
              formName = 'secondFormEditor'
            } else if (index === 2) {
              formName = 'thirdFormEditor'
            } else if (index === 3) {
              formName = 'fourthFormEditor'
            } else {
              formName = 'fifthFormEditor'
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
    handleTabClick() {
      if (!this.formCpn[this.activeName]) {
        this.formCpn[this.activeName] = this.$refs[`${this.activeName}Ref`]
      } else {
        return
      }
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
            usersUpdate(data)
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
    handleDeleteUser(ids) {
      const idArr = [...ids]
      this.loading = true
      usersDelete(idArr.join(',')).then(res => {
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
