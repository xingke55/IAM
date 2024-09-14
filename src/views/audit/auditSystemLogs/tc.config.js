export const tableConfig = {
  title: '',
  propList: [
    { prop: 'topic', label: '主题', minWidth: '100' },
    { prop: 'message', label: '内容', minWidth: '100' },
    { prop: 'messageType', label: '操作', minWidth: '100' },
    { prop: 'messageResult', label: '结果', minWidth: '100', slotName: 'status' },
    { prop: 'displayName', label: '操作人', minWidth: '100', slotName: 'status' },
    {
      prop: 'executeTime',
      label: '执行时间',
      minWidth: '200',
      slotName: 'createAt'
    }
  ]
  // showIndexColumn: true,
  // showSelectColumn: true
}
