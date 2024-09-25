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
                  @click="handleEditClick(scope.row)"
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
              <el-select v-model="firstFormEditor.protocol" placeholder="请选择">
                <el-option
                  v-for="item in protocolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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

        <el-tab-pane
          v-if="firstFormEditor.protocol === 'OpenID_Connect_v1.0'"
          label="OpenID Connect配置"
          name="fourth"
          ><el-form
            key="first"
            ref="fourthRef"
            :rules="formEditorRules"
            :model="fourthFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="签发人：">
              <el-input v-model="fourthFormEditor.issuer"></el-input>
            </el-form-item>
            <el-form-item label="受众：">
              <el-input v-model="fourthFormEditor.audience"></el-input>
            </el-form-item>
            <el-form-item label="签名算法：">
              <el-select v-model="fourthFormEditor.signature" placeholder="请选择">
                <el-option
                  v-for="item in signatureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户接口类型：">
              <el-select v-model="fourthFormEditor.userInfoResponse" placeholder="请选择">
                <el-option
                  v-for="item in userInfoResponseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签名秘钥：">
              <el-input v-model="fourthFormEditor.signatureKey" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="加密算法：">
              <el-select v-model="fourthFormEditor.algorithm" placeholder="请选择">
                <el-option
                  v-for="item in algorithmOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加密方法：">
              <el-select v-model="fourthFormEditor.encryptionMethod" placeholder="请选择">
                <el-option
                  v-for="item in encryptionMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="秘钥：">
              <el-input v-model="fourthFormEditor.algorithmKey" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          v-if="currentProtocol === 'OAuth2.x' || currentProtocol === 'OpenID Connect'"
          label="OAuth 2.0配置"
          name="second"
          ><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="认证地址：" prop="registeredRedirectUris">
              <el-input
                v-model="secondFormEditor.registeredRedirectUris"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="授权方式：" prop="authorizedGrantTypes">
              <el-select
                v-model="secondFormEditor.authorizedGrantTypes"
                multiple
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in grantTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题：" prop="subject">
              <el-select v-model="secondFormEditor.subject" multiple clearable placeholder="请选择">
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作用域：" prop="select_scope">
              <el-select
                v-model="secondFormEditor.select_scope"
                multiple
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in scopeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="许可确认：" prop="approvalPrompt">
              <el-radio-group v-model="secondFormEditor.approvalPrompt" size="mini">
                <el-radio-button label="force">强制</el-radio-button>
                <el-radio-button label="auto">自动</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="PKCE：" prop="pkce">
              <el-radio-group v-model="secondFormEditor.pkce" size="mini">
                <el-radio-button label="YES">是</el-radio-button>
                <el-radio-button label="NO">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="accessToken有效期：" prop="accessTokenValiditySeconds">
              <el-input
                v-model="secondFormEditor.accessTokenValiditySeconds"
                @input="handleNumberInput"
                ><span slot="suffix">秒</span></el-input>
            </el-form-item>
            <el-form-item label="refreshToken有效期：" prop="refreshTokenValiditySeconds">
              <el-input
                v-model="secondFormEditor.refreshTokenValiditySeconds"
                @input="handleNumberInput"
                ><span slot="suffix">秒</span></el-input>
            </el-form-item>
          </el-form></el-tab-pane>
        <el-tab-pane v-if="currentProtocol === 'CAS认证'" label="CAS配置" name="second"><el-form
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
        <el-tab-pane v-if="currentProtocol === 'SAML2.0'" label="SAML V2.0配置" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="150px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="ACS Url：" prop="spAcsUrl">
              <el-input v-model="secondFormEditor.spAcsUrl"></el-input>
            </el-form-item>
            <el-form-item label="Binding：" prop="binding">
              <el-select
                v-model="secondFormEditor.binding"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in bindingOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Entity Id：" prop="entityId">
              <el-input v-model="secondFormEditor.entityId"></el-input>
            </el-form-item>
            <el-form-item label="Audience：" prop="audience">
              <el-input v-model="secondFormEditor.audience"></el-input>
            </el-form-item>
             <el-form-item label="Issuer" prop="issuer">
              <el-input v-model="secondFormEditor.issuer"></el-input>
            </el-form-item>
             <el-form-item label="签名算法：" prop="signature">
               <el-select
                v-model="secondFormEditor.signature"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in signatureOptions2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="摘要方法：" prop="digestMethod">
               <el-select
                v-model="secondFormEditor.digestMethod"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in digestMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="加密：" prop="encrypted">
              <el-select
                v-model="secondFormEditor.encrypted"
                clearable
                placeholder="请选择"
              >
                <el-option
                  key="yes"
                  label="加密"
                  value="yes"
                >
                </el-option>
                <el-option
                  key="no"
                  label="不加密"
                  value="no"
                >
                </el-option>
              </el-select>

            </el-form-item>
             <el-form-item label="有效期：" prop="validityInterval">
              <el-input v-model="secondFormEditor.validityInterval" @input="handleNumberInput"><span slot="suffix">秒</span></el-input>
            </el-form-item>
             <el-form-item label="Nameid Format：" prop="nameidFormat">
              <el-select
                v-model="secondFormEditor.nameidFormat"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nameidFormatOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="NameId转换：" prop="nameIdConvert">
             <el-select
                v-model="secondFormEditor.nameIdConvert"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nameIdConvertOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="上传证书类型：" prop="fileType">
              <el-input v-model="secondFormEditor.fileType"></el-input>
            </el-form-item>
             <el-form-item label="SAML元数据：" prop="metaFile">
              <el-input v-model="secondFormEditor.metaFile"></el-input>
            </el-form-item>
             <el-form-item label="证书颁发者" prop="certIssuer">
              <el-input v-model="secondFormEditor.certIssuer"></el-input>
            </el-form-item>
             <el-form-item label="证书有效期" prop="certExpiration">
              <el-input v-model="secondFormEditor.certExpiration"></el-input>
            </el-form-item>
             <el-form-item label="证书主题" prop="certSubject">
              <el-input v-model="secondFormEditor.certSubject"></el-input>
            </el-form-item>
          </el-form></el-tab-pane>
        <el-tab-pane v-if="currentProtocol === 'JWT令牌'" label="JWT配置" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
             <el-form-item label="认证地址：" prop="redirectUri">
              <el-input
                v-model="secondFormEditor.redirectUri"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="主题：" prop="subject">
               <el-select
                v-model="secondFormEditor.subject"
                multiple
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="令牌类型：" prop="tokenType">
              <el-select
                v-model="secondFormEditor.tokenType"
                multiple
                clearable
                placeholder="请选择"
              >
                <el-option
                  key="GET"
                  label="GET"
                  value="GET"
                >
                </el-option>
                <el-option
                  key="POST"
                  label="POST"
                  value="POST"
                >
                </el-option>
                <el-option
                 key="LTPA"
                  label="LTPA"
                  value="LTPA"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称：" prop="jwtName">
              <el-input v-model="secondFormEditor.jwtName"></el-input>
            </el-form-item>
            <el-form-item label="过期时间：" prop="expires">
              <el-input v-model="secondFormEditor.expires" @input="handleNumberInput"><span slot="suffix">秒</span></el-input>
            </el-form-item>
             <el-form-item label="签发人：">
              <el-input v-model="secondFormEditor.issuer"></el-input>
            </el-form-item>
             <el-form-item label="受众：">
              <el-input v-model="secondFormEditor.audience"></el-input>
            </el-form-item>
             <el-form-item label="签名算法：" prop="signature">
               <el-select
                v-model="secondFormEditor.signature"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in signatureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签名秘钥：" prop="signatureKey">
              <el-input v-model="secondFormEditor.signatureKey" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="加密算法：">
              <el-select v-model="secondFormEditor.algorithm" placeholder="请选择">
                <el-option
                  v-for="item in algorithmOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加密方法：">
              <el-select v-model="secondFormEditor.encryptionMethod" placeholder="请选择">
                <el-option
                  v-for="item in encryptionMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="秘钥：">
              <el-input v-model="secondFormEditor.algorithmKey" type="textarea"></el-input>
            </el-form-item>
          </el-form></el-tab-pane>
        <el-tab-pane v-if="currentProtocol === '令牌认证'" label="令牌配置" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="认证地址" prop="redirectUri">
              <el-input v-model="secondFormEditor.redirectUri"></el-input>
            </el-form-item>
            <el-form-item label="令牌类型" prop="tokenType">
              <el-select
                v-model="secondFormEditor.tokenType"
                multiple
                clearable
                placeholder="请选择"
              >
                <el-option
                  key="GET"
                  label="GET"
                  value="GET"
                >
                </el-option>
                <el-option
                  key="POST"
                  label="POST"
                  value="POST"
                >
                </el-option>
                <el-option
                 key="LTPA"
                  label="LTPA"
                  value="LTPA"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Cookie名称：" prop="cookieName">
              <el-input v-model="secondFormEditor.cookieName"></el-input>
            </el-form-item>
            <el-form-item label="加密算法：" prop="algorithm">
               <el-select
                v-model="secondFormEditor.algorithm"
                multiple
                clearable
                placeholder="请选择"
              >
                <el-option
                  key="DES"
                  label="DES"
                  value="DES"
                >
                </el-option>
                <el-option
                  key="DESede"
                  label="DESede"
                  value="DESede"
                >
                </el-option>
                <el-option
                 key="Blowfish"
                  label="Blowfish"
                  value="Blowfish"
                >
                </el-option>
                <el-option
                 key="AES"
                  label="AES"
                  value="AES"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="过期时间：" prop="expires">
              <el-input v-model="secondFormEditor.expires" @input="handleNumberInput"><span slot="suffix">秒</span></el-input>
            </el-form-item>
            <el-form-item label="令牌内容" prop="userPropertys">
              <el-select v-model="secondFormEditor.userPropertys" placeholder="请选择">
                <el-option
                  v-for="item in userPropertysOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form></el-tab-pane>
        <el-tab-pane v-if="currentProtocol === 'API扩展认证'" label="API配置" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="凭证：" prop="principal">
              <el-input v-model="secondFormEditor.principal"></el-input>
            </el-form-item>
            <el-form-item label="秘钥：" prop="credentials">
              <el-input v-model="secondFormEditor.credentials"></el-input>
            </el-form-item>
            <el-form-item label="凭证类型：" prop="credential">
              <el-radio-group v-model="secondFormEditor.credential" size="mini">
                <el-radio-button label="user-defined">用户自定义</el-radio-button>
                <el-radio-button label="shared">应用共享</el-radio-button>
                <el-radio-button label="system">系统配置</el-radio-button>
              </el-radio-group>
            </el-form-item>
             <el-form-item v-if="secondFormEditor.credential==='shared'" label="共享用户名：" prop="sharedUsername">
              <el-input v-model="secondFormEditor.sharedUsername"></el-input>
            </el-form-item>
            <el-form-item v-if="secondFormEditor.credential==='shared'" label="共享凭证：" prop="sharedPassword">
              <el-input v-model="secondFormEditor.sharedPassword"></el-input>
            </el-form-item>
             <el-form-item v-if="secondFormEditor.credential==='system'" label="系统属性：" prop="systemUserAttr">
               <el-select v-model="secondFormEditor.systemUserAttr" placeholder="请选择">
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form></el-tab-pane>
        <el-tab-pane v-if="currentProtocol === '表单认证'" label="表单配置" name="second"><el-form
            key="second"
            ref="secondRef"
            :rules="formEditorRules"
            :model="secondFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="认证地址：" prop="redirectUri">
              <el-input v-model="secondFormEditor.redirectUri"></el-input>
            </el-form-item>
            <el-form-item label="登录名映射：" prop="usernameMapping">
              <el-input v-model="secondFormEditor.usernameMapping"></el-input>
            </el-form-item>
            <el-form-item label="登录凭证映射" prop="passwordMapping">
              <el-input v-model="secondFormEditor.passwordMapping"></el-input>
            </el-form-item>
            <el-form-item label="认证视图" prop="authorizeView">
              <el-input v-model="secondFormEditor.authorizeView"></el-input>
            </el-form-item>
            <el-form-item label="密码算法：" prop="passwordAlgorithm">
              <el-select v-model="secondFormEditor.passwordAlgorithm" placeholder="请选择">
                <el-option
                  v-for="item in passwordAlgorithmOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="凭证类型：" prop="credential">
              <el-radio-group v-model="secondFormEditor.credential" size="mini">
                <el-radio-button label="user-defined">用户自定义</el-radio-button>
                <el-radio-button label="shared">应用共享</el-radio-button>
                <el-radio-button label="system">系统配置</el-radio-button>
              </el-radio-group>
            </el-form-item>
             <el-form-item v-if="secondFormEditor.credential==='shared'" label="共享用户名：" prop="sharedUsername">
              <el-input v-model="secondFormEditor.sharedUsername"></el-input>
            </el-form-item>
            <el-form-item v-if="secondFormEditor.credential==='shared'" label="共享凭证：" prop="sharedPassword">
              <el-input v-model="secondFormEditor.sharedPassword"></el-input>
            </el-form-item>
             <el-form-item v-if="secondFormEditor.credential==='system'" label="系统属性：" prop="systemUserAttr">
               <el-select v-model="secondFormEditor.systemUserAttr" placeholder="请选择">
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
    <el-dialog :visible.sync="dialogVisible2" width="50%">
      <span slot="title">
        <div>选择</div>
      </span>
      <el-tabs v-model="activeProtocol">
        <el-tab-pane label="标准协议" name="standard">
          <Table :show-footer="false" v-bind="protocolConfig" :list-data="standardProtocolData">
            <template #iconHandler="scope">
              <div class="handle-btns">
                <img class="icon-img" :src="scope.row.src" alt="" />
              </div>
            </template>
            <template #handler="scope">
              <div class="handle-btns">
                <div class="handle-btns">
                  <el-button
                    style="margin-right: 10px"
                    size="mini"
                    type="primary"
                    @click="handleAddProtocol(scope.row)"
                    >新增</el-button>
                </div>
              </div>
            </template>
          </Table>
        </el-tab-pane>
        <el-tab-pane label="定制协议" name="custom"><Table :show-footer="false" v-bind="protocolConfig" :list-data="customProtocolData">
            <template #iconHandler="scope">
              <div class="handle-btns">
                <img class="icon-img" :src="scope.row.src" alt="" />
              </div>
            </template>
            <template #handler="scope">
              <div class="handle-btns">
                <div class="handle-btns">
                  <el-button
                    style="margin-right: 10px"
                    size="mini"
                    type="primary"
                    @click="handleAddProtocol(scope.row)"
                    >新增</el-button>
                </div>
              </div>
            </template></Table></el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">关闭</el-button>
        <el-button type="primary" @click="handleSelectProtocol">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { appFetch, protocolGet, protocolGetUpdate, protocolGetAdd, protocolInit } from '@/api/application.js'
import { tableConfig, protocolConfig } from './tc.config.js'
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
      activeProtocol: 'standard',
      dialogVisible: false,
      dialogVisible2: false,
      standardProtocolData: [
        {
          src: require(`@/assets/protocol/oauth2.png`),
          protocol: 'OAuth2.x',
          desc: 'OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频等），而无需将用户名和密码提供给第三方应用。',
          version: 'OAuth_v2.0'
        },
        {
          src: require(`@/assets/protocol/oidc.png`),
          protocol: 'OpenID Connect',
          desc: 'OIDC 是 OpenID Connect 的简称，OIDC = (Identity, Authentication) + OAuth 2.0。使用 OIDC 进行分布式站点的单点登录 （SSO）。',
          version: 'OpenID_Connect_v1.0'
        },
        {
          src: require(`@/assets/protocol/saml.jpg`),
          protocol: 'SAML2.0',
          desc: 'SAML 基于XML协议，使用包含断言（Assertion）的安全令牌，在授权方（IDP）和消费方（应用）之间传递身份信息，实现基于网络跨域的单点登录。',
          version: 'SAML_v2.0'
        },
        {
          src: require(`@/assets/protocol/cas.png`),
          protocol: 'CAS认证',
          desc: 'CAS是Central Authentication Service的缩写，中央认证服务，一种独立开放指令协议,具有广泛的使用。',
          version: 'CAS'
        },
        {
          src: require(`@/assets/protocol/jwt.jpg`),
          protocol: 'JWT令牌',
          desc: 'JSON Web Token是一个开放标准，用于在各方之间安全地将信息作为JSON对象传输。由于此信息是经过数字签名的，因此可以被验证和信任。',
          version: 'JWT'
        }
      ],
      customProtocolData: [
        {
          src: require(`@/assets/protocol/token.png`),
          protocol: '令牌认证',
          desc: '简单令牌即认证中心和应用共享凭证或者数字证书，认证中心使用HTTP POST的方式提交令牌到应用系统，应用系统并随后进行身份验证。',
          version: 'Token_Based'
        },
        {
          src: require(`@/assets/protocol/api.png`),
          protocol: 'API扩展认证',
          desc: '通过对应用服务提供认证的API进行扩展，实现应用系统的认证，例如腾讯企业邮箱、网易企业邮箱等。',
          version: 'Extend_API'
        },
        {
          src: require(`@/assets/protocol/form.png`),
          protocol: '表单认证',
          desc: 'HTTP+HTML 简单的基于表单的认证，一个网站使用一个Web表单收集，并随后进行身份验证；认证的凭证信息来源于用户代理，通常web浏览器。',
          version: 'Form_Based'
        },
        {
          src: require(`@/assets/protocol/basic.png`),
          protocol: '基本登录',
          desc: '基本登录地址访问链接，方便用户使用。',
          version: 'Basic'
        }
      ],

      currentProtocol: 'CAS',
      page: { pageNumber: 1, pageSize: 10 },
      loading: false,
      listData: [{ name: 'test' }],
      tableConfig: {},
      protocolConfig: {},
      nameIdConvertOptions: [{
        label: '原始',
        value: 'original'
      }, {
        label: '大写',
        value: 'uppercase'
      }, {
        label: '小写',
        value: 'lowerCase'
      }],
      nameidFormatOptions: [{
        label: 'transient',
        value: 'transient'
      }, {
        label: 'emailAddress',
        value: 'emailAddress'
      }, {
        label: 'X509SubjectName',
        value: 'X509SubjectName'
      }, {
        label: 'WindowsDomainQualifiedName',
        value: 'WindowsDomainQualifiedName'
      }, {
        label: 'unspecified',
        value: 'unspecified'
      }, {
        label: 'entity',
        value: 'entity'
      }],
      bindingOptions: [{
        label: 'Post-Post',
        value: 'Post-Post'
      },
      {
        label: 'IdpInit-Post',
        value: 'IdpInit-Post'
      }, {
        label: 'Redirect-PostSimpleSign',
        value: 'Redirect-PostSimpleSign'
      },
      {
        label: 'Post-PostSimpleSign',
        value: 'Post-PostSimpleSign'
      }, {
        label: 'IdpInit-PostSimpleSign',
        value: 'IdpInit-PostSimpleSign'
      }
      ],
      encryptionMethodOptions: [
        {
          label: 'A128GCM',
          value: 'A128GCM'
        },
        {
          label: 'A192GCM',
          value: 'A192GCM'
        },
        {
          label: 'A256GCM',
          value: 'A256GCM'
        },
        {
          label: 'A128CBC-HS256',
          value: 'A128CBC-HS256'
        },
        {
          label: 'A192CBC-HS384',
          value: 'A192CBC-HS384'
        },
        {
          label: 'A256CBC-HS512',
          value: 'A256CBC-HS512'
        },
        {
          label: 'XC20P',
          value: 'XC20P'
        }
      ],
      algorithmOptions: [
        {
          label: 'NONE',
          value: 'NONE'
        },
        {
          label: 'RSA1_5',
          value: 'RSA1_5'
        },
        {
          label: 'RSA_OAEP',
          value: 'RSA_OAEP'
        },
        {
          label: 'RSA-OAEP-256',
          value: 'RSA-OAEP-256'
        },
        {
          label: 'A128KW',
          value: 'A128KW'
        },
        {
          label: 'A192KW',
          value: 'A192KW'
        },
        {
          label: 'A256KW',
          value: 'A256KW'
        },
        {
          label: 'A128GCMKW',
          value: 'A128GCMKW'
        },
        {
          label: 'A192GCMKW',
          value: 'A192GCMKW'
        },
        {
          label: 'A256GCMKW',
          value: 'A256GCMKW'
        }
      ],
      signatureOptions: [
        {
          label: 'NONE',
          value: 'NONE'
        },
        {
          label: 'RS256',
          value: 'RS256'
        },
        {
          label: 'RS384',
          value: 'RS384'
        },
        {
          label: 'RS512',
          value: 'RS512'
        },
        {
          label: 'HS256',
          value: 'HS256'
        },
        {
          label: 'HS384',
          value: 'HS384'
        },
        {
          label: 'HS512',
          value: 'HS512'
        }
      ],
      digestMethodOptions: [{
        label: 'MD5',
        value: 'MD5'
      },
      {
        label: 'SHA1',
        value: 'SHA1'
      }, {
        label: 'SHA256',
        value: 'SHA256'
      },
      {
        label: 'SHA512',
        value: 'SHA512'
      }, {
        label: 'RIPEMD-160',
        value: 'RIPEMD-160'
      }],
      signatureOptions2: [
        {
          label: 'RSAwithSHA256',
          value: 'RSAwithSHA256'
        },
        {
          label: 'RSAwithSHA384',
          value: 'RSAwithSHA384'
        },
        {
          label: 'RSAwithSHA512',
          value: 'RSAwithSHA512'
        },
        {
          label: 'RSAwithMD5',
          value: 'RSAwithMD5'
        },
        {
          label: 'RSAwithRIPEMD160',
          value: 'RSAwithRIPEMD160'
        },
        {
          label: 'DSAwithSHA1',
          value: 'DSAwithSHA1'
        },
        {
          label: 'ECDSAwithSHA1',
          value: 'ECDSAwithSHA1'
        },
        {
          label: 'ECDSAwithSHA256',
          value: 'ECDSAwithSHA256'
        },
        {
          label: 'ECDSAwithSHA384',
          value: 'ECDSAwithSHA384'
        },
        {
          label: 'ECDSAwithSHA512',
          value: 'ECDSAwithSHA512'
        },
        {
          label: 'HMAC-MD5',
          value: 'HMAC-MD5'
        },
        {
          label: 'HMAC-SHA1',
          value: 'HMAC-SHA1'
        },
        {
          label: 'HMAC-SHA256',
          value: 'HMAC-SHA256'
        },
        {
          label: 'HMAC-SHA384',
          value: 'HMAC-SHA384'
        },
        {
          label: 'HMAC-SHA512',
          value: 'HMAC-SHA512'
        },
        {
          label: 'HMAC-RIPEMD160',
          value: 'HMAC-RIPEMD160'
        }
      ],
      passwordAlgorithmOptions: [
        {
          label: 'NONE',
          value: 'NONE'
        }, {
          label: 'MD5',
          value: 'MD5'
        },
        {
          label: 'SHA',
          value: 'SHA'
        },
        {
          label: 'SHA-1',
          value: 'SHA-1'
        },
        {
          label: 'SHA-256',
          value: 'SHA-256'
        },
        {
          label: 'SHA-384',
          value: 'SHA-384'
        },
        {
          label: 'SHA-512',
          value: 'SHA-512'
        },
        {
          label: 'MD5-HEX',
          value: 'MD5-HEX'
        },
        {
          label: 'SHA-HEX',
          value: 'SHA-HEX'
        },
        {
          label: 'SHA-1-HEX',
          value: 'SHA-1-HEX'
        },
        {
          label: 'SHA-256-HEX',
          value: 'SHA-256-HEX'
        },
        {
          label: 'SHA-384-HEX',
          value: 'SHA-384-HEX'
        },
        {
          label: 'SHA-512-HEX',
          value: 'SHA-512-HEX'
        }
      ],
      userInfoResponseOptions: [
        {
          label: 'NORMAL',
          value: 'NORMAL'
        },
        {
          label: 'SIGNING',
          value: 'SIGNING'
        },
        {
          label: 'ENCRYPTION',
          value: 'ENCRYPTION'
        },
        {
          label: 'SIGNING_ENCRYPTION',
          value: 'SIGNING_ENCRYPTION'
        }
      ],
      userPropertysOptions: [
        {
          label: '用户编号',
          value: 'userId'
        },
        {
          label: '登录名',
          value: 'username'
        },
        {
          label: '性别',
          value: 'gender'
        },
        {
          label: '证件类型',
          value: 'idtype'
        }, {
          label: '证件号码',
          value: 'idCardNo'
        },
        {
          label: '手机号码',
          value: 'mobile'
        },
        {
          label: '电子邮箱',
          value: 'email'
        },
        {
          label: 'token',
          value: 'userType'
        },

        {
          label: '员工编号',
          value: 'employeeNumber'
        }, {
          label: '职位',
          value: 'jobTitle'
        }, {
          label: '部门编号',
          value: 'departmentId'
        }, {
          label: '部门名称',
          value: 'department'
        }, {
          label: '域账号',
          value: 'windowsAccount'
        }
      ],
      grantTypeOptions: [
        {
          label: 'authorization_code',
          value: 'authorization_code'
        },
        {
          label: 'password',
          value: 'password'
        },
        {
          label: 'implicit',
          value: 'implicit'
        },
        {
          label: 'id_token',
          value: 'id_token'
        },
        {
          label: 'token',
          value: 'token'
        },
        {
          label: 'refresh_token',
          value: 'refresh_token'
        }
      ],
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
      scopeOptions: [
        {
          value: 'read',
          label: 'read'
        },
        {
          value: 'write',
          label: 'write'
        },
        {
          value: 'trust',
          label: 'trust'
        },
        {
          value: 'openid',
          label: 'openid'
        },
        {
          value: 'profile',
          label: 'profile'
        },
        {
          value: 'email',
          label: 'email'
        },
        {
          value: 'phone',
          label: 'phone'
        },
        {
          value: 'address',
          label: 'address'
        },
        {
          value: 'all',
          label: 'all'
        }
      ],

      subjectOptions: [
        {
          value: 'username',
          label: '登录账号'
        },
        {
          value: 'employeeNumber',
          label: '员工编号'
        },
        {
          value: 'email',
          label: '电子邮箱'
        },
        {
          value: 'mobile',
          label: '手机号码'
        },
        {
          value: 'windowsaccount',
          label: '域账号'
        },
        {
          value: 'userId',
          label: '用户编码'
        }
      ],
      formEditorRules: {
        // cas
        id: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        secret: [{ required: true, message: '请输入应用秘钥', trigger: 'blur' }],
        appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
        protocol: [{ required: true, message: '请输入协议', trigger: 'blur' }],
        loginUrl: [{ required: true, message: '请输入登录地址', trigger: 'blur' }],
        service: [{ required: true, message: '请输入服务', trigger: 'blur' }],
        callbackUrl: [{ required: true, message: '请输入回调地址', trigger: 'blur' }],
        expires: [{ required: true, message: '请输入过期时间', trigger: 'blur' }],
        casUser: [{ required: true, message: '请选择账号', trigger: 'change' }],
        // auth2.0
        registeredRedirectUris: [{ required: true, message: '认证地址', trigger: 'blur' }],
        authorizedGrantTypes: [{ required: true, message: '请选择授权方式', trigger: 'change' }],
        subject: [{ required: true, message: '请选择', trigger: 'change' }],
        select_scope: [{ required: true, message: '请选择', trigger: 'change' }],
        approvalPrompt: [{ required: true, message: '请选择', trigger: 'blur' }],
        pkce: [{ required: true, message: '请选择', trigger: 'blur' }],
        accessTokenValiditySeconds: [{ required: true, message: '请输入', trigger: 'blur' }],
        refreshTokenValiditySeconds: [{ required: true, message: '请输入', trigger: 'blur' }],
        // saml2
        spAcsUrl: [{ required: true, message: '请输入url', trigger: 'blur' }],
        binding: [{ required: true, message: '请输入', trigger: 'blur' }],
        entityId: [{ required: true, message: '请输入ID', trigger: 'blur' }],
        audience: [{ required: true, message: '请输入', trigger: 'blur' }],
        issuer: [{ required: true, message: '请输入', trigger: 'blur' }],
        signature: [{ required: true, message: '请选择', trigger: 'change' }],
        digestMethod: [{ required: true, message: '请选择', trigger: 'change' }],
        encrypted: [{ required: true, message: '请选择', trigger: 'change' }],
        validityInterval: [{ required: true, message: '请输入', trigger: 'change' }],
        nameidFormat: [{ required: true, message: '请输入', trigger: 'change' }],
        nameIdConvert: [{ required: true, message: '请输入', trigger: 'change' }],
        fileType: [{ required: true, message: '请选择', trigger: 'change' }],
        metaFile: [{ required: true, message: '请选择', trigger: 'change' }],
        certIssuer: [{ required: true, message: '请上传', trigger: 'blur' }],
        certExpiration: [{ required: true, message: '请选择账号', trigger: 'blur' }],
        certSubject: [{ required: true, message: '请选择账号', trigger: 'blur' }],
        // jwt
        redirectUri: [{ required: true, message: '请输入', trigger: 'blur' }],
        jwtName: [{ required: true, message: '请输入', trigger: 'blur' }],
        signatureKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        encryptionMethod: [{ required: true, message: '请输入', trigger: 'blur' }],
        // 令牌配置
        tokenType: [{ required: true, message: '请选择', trigger: 'change' }],
        cookieName: [{ required: true, message: '请输入', trigger: 'blur' }],
        // expires: [{ required: true, message: '请输入', trigger: 'blur' }],
        userPropertys: [{ required: true, message: '请输入', trigger: 'blur' }],
        algorithm: [{ required: true, message: '请选择', trigger: 'change' }],
        // api
        principal: [{ required: true, message: '请输入', trigger: 'blur' }],
        credentials: [{ required: true, message: '请输入', trigger: 'blur' }],
        // 表单
        usernameMapping: [{ required: true, message: '请输入', trigger: 'blur' }],
        passwordMapping: [{ required: true, message: '请输入', trigger: 'blur' }]
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
        // jwt
        // redirectUri: '',
        // subject: '',
        // tokenType: '',
        jwtName: '',
        // expires: '',
        // audience: '',
        // signature: '',
        signatureKey: '',
        // algorithm: '',
        encryptionMethod: '',
        algorithmKey: '',
        // 令牌认证
        // redirectUri: '',
        // tokenType: '',
        // cookieName: '',
        // algorithm: '',
        // expires: '',
        // userPropertys: '',
        // SAML2
        spAcsUrl: '',
        binding: '',
        entityId: '',
        audience: '',
        issuer: '',
        signature: '',
        digestMethod: '',
        encrypted: '',
        validityInterval: '',
        nameidFormat: '',
        nameIdConvert: '',
        fileType: '',
        metaFile: '',
        certIssuer: '',
        certExpiration: '',
        certSubject: '',
        redirectUri: '',
        tokenType: '',
        cookieName: '',
        algorithm: '',
        // expires:'',
        userPropertys: '',
        // API扩展认证
        principal: '',
        credentials: '',
        credential: '',
        sharedUsername: '',
        sharedPassword: '',
        systemUserAttr: '',
        // 表单认证
        // redirectUri: '',
        usernameMapping: '',
        passwordMapping: '',
        authorizeView: '',
        // credentials: '',
        // credential: '',
        // sharedUsername: '',
        // sharedPassword: '',
        // systemUserAttr: '',

        // cas
        service: '',
        callbackUrl: '',
        expires: 0,
        casUser: '',
        // OAuth2
        registeredRedirectUris: '',
        authorizedGrantTypes: ['password'],
        subject: ['username'],
        select_scope: ['read'],
        approvalPrompt: 'auto',
        pkce: 'no',
        accessTokenValiditySeconds: '300',
        refreshTokenValiditySeconds: '300'
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
      isAdd: true,
      requestProtocol: '',
      fourthFormEditor: {
        algorithmKey: '',
        encryptionMethod: '',
        algorithm: '',
        userInfoResponse: '',
        signature: '',
        audience: '',
        issuer: ''
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
      formCpn: {},
      protocolOptions: [
        {
          label: 'OAuth v2.0',
          value: 'OAuth_v2.0'
        },
        {
          label: 'OAuth v2.1',
          value: 'OAuth_v2.1'
        },
        {
          label: 'OpenID Connect 1.0',
          value: 'OpenID_Connect_v1.0'
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
    this.protocolConfig = protocolConfig
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
    add() {
      this.dialogVisible2 = true
    },
    handleAddProtocol(curPro) {
      this.currentProtocol = curPro.protocol
      this.seturl(curPro.version)
      protocolInit(this.requestProtocol).then(res => {
        for (let index = 0; index < 3; index++) {
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
      })
      this.dialogVisible2 = false
      this.dialogVisible = true
      this.isAdd = true
      this.$nextTick(() => {
        this.formCpn['first'] = this.$refs[`firstRef`]
      })
    },
    remove() {},
    handleRemoveClick() {},
    handleSelectProtocol() {},
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
            console.log('提交 ')
            const data = Object.assign(
              {},
              this.firstFormEditor,
              this.secondFormEditor,
              this.thirdFormEditor,
              this.fourthFormEditor
            )
            if (this.isAdd) {
              protocolGetAdd(this.requestProtocol, data)
                .then((res) => {
                  this.init()
                })
                .catch((e) => {
                  console.log(e)
                })
            } else {
              protocolGetUpdate(this.requestProtocol, data)
                .then((res) => {
                  this.init()
                })
                .catch((e) => {
                  console.log(e)
                })
            }
          } else {
            let formIndex
            if (index === 0) {
              formIndex = 'first'
            } else if (index === 1) {
              formIndex = 'second'
            } else if (index === 2) {
              formIndex = 'third'
            } else {
              formIndex = 'fourth'
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
    seturl(protocol) {
      if (protocol.includes('OAuth') || protocol.includes('OpenID')) {
        this.requestProtocol = 'oauth20'
      } else if (protocol === 'CAS') {
        this.requestProtocol = 'cas'
      } else if (protocol === 'SAML_v2.0') {
        this.requestProtocol = 'saml20'
      } else if (protocol === 'JWT') {
        this.requestProtocol = 'jwt'
      } else if (protocol === 'Form_Based') {
        this.requestProtocol = 'formbased'
      } else if (protocol === 'Extend_API') {
        this.requestProtocol = 'extendapi'
      } else if (protocol === 'Token_Based') {
        this.requestProtocol = 'tokenbased'
      } else {
        this.requestProtocol = ''
      }
    },
    protocolGetByType(protocol, id) {
      if (protocol.includes('OAuth')) {
        this.currentProtocol = 'OAuth2.x'
        this.requestProtocol = 'oauth20'
      } else if (protocol === 'CAS') {
        this.currentProtocol = 'CAS认证'
        this.requestProtocol = 'cas'
      } else if (protocol === 'SAML_v2.0') {
        this.currentProtocol = 'SAML2.0'
        this.requestProtocol = 'saml20'
      } else if (protocol === 'JWT') {
        this.currentProtocol = 'JWT令牌'
        this.requestProtocol = 'jwt'
      } else if (protocol === 'Form_Based') {
        this.currentProtocol = '表单认证'
        this.requestProtocol = 'formbased'
      } else if (protocol === 'Extend_API') {
        this.currentProtocol = 'API扩展认证'
        this.requestProtocol = 'extendapi'
      } else if (protocol === 'Token_Based') {
        this.currentProtocol = '令牌认证'
        this.requestProtocol = 'tokenbased'
      } else {
        this.requestProtocol = 'saml20'
        this.currentProtocol = 'API扩展认证'
      }
      return protocolGet(this.requestProtocol, id)
    },
    handleEditClick(data) {
      this.isAdd = false
      this.protocolGetByType(data.protocol, data.id)
        .then((res) => {
          for (let index = 0; index < 3; index++) {
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
