export const tableConfig = {
  title: '',
  propList: [
    { prop: 'roleName', label: '角色名称', minWidth: '100' },
    { prop: 'category', label: '类型', minWidth: '100' },
    { prop: 'description', label: '描述', minWidth: '200' },
    { prop: 'enable', label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
