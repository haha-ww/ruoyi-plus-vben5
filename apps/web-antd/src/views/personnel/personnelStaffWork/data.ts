import type { VxeGridProps } from '#/adapter/vxe-table';

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '公司',
    field: 'company',
  },
  {
    title: '部门',
    field: 'dept',
  },
  {
    title: '职务',
    field: 'job',
  },
  {
    title: '开始日期',
    field: 'startDate',
  },
  {
    title: '结束日期',
    field: 'endDate',
  },
  {
    title: '工作描述',
    field: 'jobDescription',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
