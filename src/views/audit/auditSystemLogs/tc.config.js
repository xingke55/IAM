export const tableConfig = {
  title: '',
  propList: [
    { prop: 'name', label: '主题', minWidth: '100' },
    { prop: 'realname', label: '内容', minWidth: '100' },
    { prop: 'cellphone', label: '操作', minWidth: '100' },
    { prop: 'enable', label: '结果', minWidth: '100', slotName: 'status' },
    { prop: 'enable', label: '操作人', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '执行时间',
      minWidth: '200',
      slotName: 'createAt'
    }

  ]
  // showIndexColumn: true,
  // showSelectColumn: true
}
