export const tableConfig = {
  title: '',
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '100' },
    { prop: 'realname', label: '图标', minWidth: '100', slotName: 'iconHandler' },
    { prop: 'cellphone', label: '应用名称', minWidth: '200' },
    { prop: 'enable', label: '分类', minWidth: '150' },
    { prop: 'enable', label: '操作', minWidth: '100', slotName: 'handler' }

  ],
  showIndexColumn: true,
  showSelectColumn: true
}
