<template>
  <div>
    <div class="search-header">
      <div>
        <span>应用名称：</span>
        <el-input v-model="form.userName" style="width: 200px" />
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
              <div class="handle-btns">
                <el-button
                  style="margin-right: 10px"
                  size="mini"
                  plain
                  @click="handleEditClick(scope.row.id)"
                  >编辑</el-button>
                <el-dropdown>
                  <el-button plain size="mini">更多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-button size="mini" type="text">资源</el-button></el-dropdown-item>

                    <el-dropdown-item><el-button size="mini" type="text" style="color: #f56c6c">删除</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </template>
        </Table>
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
            <el-form-item label="编码：" prop="id">
              <el-input v-model="firstFormEditor.id"></el-input>
            </el-form-item>
            <el-form-item label="应用密钥：" prop="secret">
              <el-input v-model="firstFormEditor.secret"></el-input>
            </el-form-item>
            <el-form-item label="应用名称：" prop="appName">
              <el-input v-model="firstFormEditor.appName"></el-input>
            </el-form-item>
            <el-form-item label="协议：" prop="protocol">
              <el-input v-model="firstFormEditor.protocol"></el-input>
            </el-form-item>
            <el-form-item label="登录地址：" prop="loginUrl">
              <el-input v-model="firstFormEditor.loginUrl"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <el-switch
                v-model="firstFormEditor.status"
                active-color="#13ce66"
                inactive-color="#909399"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="分类：" prop="category">
              <el-select v-model="firstFormEditor.category" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="常用：">
              <el-radio-group v-model="firstFormEditor.frequently" size="mini">
                <el-radio-button label="yes">是</el-radio-button>
                <el-radio-button label="no">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="配置扩展属性：">
              <el-radio-group v-model="firstFormEditor.isExtendAttr" size="mini">
                <el-radio-button label="0">否</el-radio-button>
                <el-radio-button label="1">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="CAS配置" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="服务：" prop="service">
              <el-input v-model="secondFormEditor.service"></el-input>
            </el-form-item>
            <el-form-item label="回调地址：" prop="callbackUrl">
              <el-input v-model="secondFormEditor.callbackUrl"></el-input>
            </el-form-item>
            <el-form-item label="返回账号：" prop="casUser">
              <el-input v-model="secondFormEditor.casUser"></el-input>
            </el-form-item>
            <el-form-item label="过期时间：" prop="expires">
              <el-input v-model="secondFormEditor.expires" @input="handleNumberInput"><span slot="suffix">秒</span></el-input>
            </el-form-item>
          </el-form></el-tab-pane>
        <el-tab-pane label="扩展信息" name="third"><el-form
            key="third"
            ref="thirdRef"
            :rules="formEditorRules"
            :model="thirdFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="注销地址：">
              <el-input v-model="thirdFormEditor.logoutUrl"></el-input>
            </el-form-item>
            <el-form-item label="注销方式：">
              <el-select v-model="thirdFormEditor.logoutType" placeholder="请选择"><el-option
                  v-for="item in logoutTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option></el-select>
            </el-form-item>
            <el-form-item label="权限范围：">
              <el-select v-model="thirdFormEditor.visible" placeholder="请选择"><el-option
                  v-for="item in visibleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option></el-select>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model.number="thirdFormEditor.sortIndex"></el-input> </el-form-item>‘
            <el-form-item label="供应商：">
              <el-input v-model="thirdFormEditor.vendor"></el-input>
            </el-form-item>
            <el-form-item label="供应商网址：">
              <el-input v-model="thirdFormEditor.vendorUrl"></el-input>
            </el-form-item>
            <el-form-item label="适配：">
              <el-input v-model="thirdFormEditor.isAdapter"></el-input>
            </el-form-item>
            <el-form-item label="适配器：">
              <el-input v-model="thirdFormEditor.adapterName"></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input v-model="thirdFormEditor.description"></el-input>
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
import { appFetch, casGet, casUpdate } from '@/api/application.js'
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
        nmuber: ''
      },
      activeName: 'first',
      dialogVisible: false,
      page: { pageNumber: 1, pageSize: 10 },
      showMore: false,
      loading: false,
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
      formEditorRules: {
        id: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        secret: [{ required: true, message: '请输入应用秘钥', trigger: 'blur' }],
        appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
        protocol: [{ required: true, message: '请输入协议', trigger: 'blur' }],
        loginUrl: [{ required: true, message: '请输入登录地址', trigger: 'blur' }],
        service: [{ required: true, message: '请输入服务', trigger: 'blur' }],
        callbackUrl: [{ required: true, message: '请输入回调地址', trigger: 'blur' }],
        expires: [{ required: true, message: '请输入过期时间', trigger: 'blur' }],
        casUser: [{ required: true, message: '请选择账号', trigger: 'change' }]
      },
      firstFormEditor: {
        id: '824008507220033536',
        secret: 'n0c9MTcwMjIwMjMxNzE2NDMwOTAskV',
        appName: 'CAS SpringBoot',
        loginUrl: 'http://127.0.0.1:8989/test1/index',
        category: 'none',
        protocol: 'CAS',
        status: 1,
        iconBase64: '',
        frequently: 'no',
        isExtendAttr: '0'
      },
      secondFormEditor: {
        service: '',
        callbackUrl: '',
        expires: 0,
        casUser: ''
      },
      thirdFormEditor: {
        logoutUrl: '',
        logoutType: '',
        visible: '',
        sortIndex: 0,
        vendor: '',
        vendorUrl: '',
        isAdapter: '',
        adapterName: '',
        description: ''
      },
      casOptions: [
        { label: '登录账号', value: 'username' },
        { label: '员工编号', value: 'employeeNumber' },
        { label: '电子邮箱', value: 'email' },
        { label: '手机号码', value: 'mobile' },
        { label: '域账号', value: 'windowsaccount' },
        { label: '用户编码', value: 'userId' }
      ],
      logoutTypeOptions: [
        {
          label: '无',
          value: '0'
        },
        {
          label: '后台',
          value: '1'
        },
        {
          label: '前台',
          value: '2'
        }
      ],
      visibleOptions: [
        { label: '隐藏', value: '0' },
        { label: '所有用户', value: '1' },
        { label: '内部用户', value: '2' },
        { label: '外部用户', value: '3' }
      ],
      formCpn: {}
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
      appFetch({ ...this.form, ...this.page })
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
              this.thirdFormEditor
            )
            casUpdate(data)
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
            } else {
              formIndex = 'third'
            }
            this.activeName = formIndex
          }
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
    handleEditClick(id) {
      casGet(id)
        .then((res) => {
          for (let index = 0; index < 3; index++) {
            let formName = ''
            if (index === 0) {
              formName = 'firstFormEditor'
            } else if (index === 1) {
              formName = 'secondFormEditor'
            } else {
              formName = 'thirdFormEditor'
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
    handleNumberInput(e) {
      const value = (e + '').replace(/[^\d]/g, '')
      this.secondFormEditor.expires = Number(value)
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
.icon-img {
  max-width: 32px;
  max-height: 32px;
  margin-right: 4px;
  vertical-align: middle;
  border-radius: 4px;
}
</style>
