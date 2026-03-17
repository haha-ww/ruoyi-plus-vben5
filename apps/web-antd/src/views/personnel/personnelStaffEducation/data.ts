import type { VxeGridProps } from '#/adapter/vxe-table';

import { renderDict } from '#/utils/render';

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '学历',
    field: 'degree',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.DEGREE_TYPE 便于维护
        return renderDict(row.degree, 'degree_type');
      },
    },
  },
  {
    title: '学校',
    field: 'school',
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
    title: '专业',
    field: 'major',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
