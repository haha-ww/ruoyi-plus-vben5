import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'jobNumber',
    label: '工号',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键',
    field: 'id',
  },
  {
    title: '合同名称',
    field: 'fileName',
  },
  {
    title: 'ossId',
    field: 'ossId',
  },
  {
    title: '合同状态(字典contract_status)',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CONTRACT_STATUS 便于维护
        return renderDict(row.status, 'contract_status');
      },
    },
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
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
