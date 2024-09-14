export const tableConfig = {
  title: '',
  propList: [
    { prop: 'sessionId', label: '会话', minWidth: '100' },
    { prop: 'username', label: '登录名', minWidth: '100' },
    { prop: 'displayName', label: '姓名', minWidth: '100' },
    { prop: 'message', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'loginType', label: '登录方式', minWidth: '100', slotName: 'status' },
    { prop: 'sourceIp', label: '访问地址', minWidth: '100', slotName: 'status' },
    { prop: 'browser', label: '浏览器', minWidth: '100', slotName: 'status' },
    { prop: 'platform', label: '平台', minWidth: '100', slotName: 'status' },
    {
      prop: 'loginTime',
      label: '登录时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'logoutTime',
      label: '退出时间',
      minWidth: '200',
      slotName: 'updateAt'
    }
  ]
  // showIndexColumn: true,
  // showSelectColumn: true
}
