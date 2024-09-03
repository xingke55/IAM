export const tableConfig = {
  title: '',
  propList: [
    { prop: 'name', label: '会话', minWidth: '100' },
    { prop: 'realname', label: '登录名', minWidth: '100' },
    { prop: 'cellphone', label: '姓名', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'enable', label: '登录方式', minWidth: '100', slotName: 'status' },
    { prop: 'enable', label: '访问地址', minWidth: '100', slotName: 'status' },
    { prop: 'enable', label: '浏览器', minWidth: '100', slotName: 'status' },
    { prop: 'enable', label: '平台', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '登录时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '退出时间',
      minWidth: '200',
      slotName: 'updateAt'
    }
  ]
  // showIndexColumn: true,
  // showSelectColumn: true
}
