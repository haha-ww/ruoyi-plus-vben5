import type { VxeGridProps } from '#/adapter/vxe-table';

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '文件名称',
    field: 'fileName',
  },
  {
    title: '文件预览',
    field: 'fileUrl',
    slots: { default: 'fileUrl' },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
