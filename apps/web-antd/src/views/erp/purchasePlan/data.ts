import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planCode',
    label: '采购计划编码',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderId',
    label: '销售订单id',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderCode',
    label: '销售订单编码',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'planDate',
    label: '日期',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PURCHASE_PLAN_STATUS 便于维护
      options: getDictOptions('purchase_plan_status'),
    },
    fieldName: 'status',
    label: '采购计划状态',
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
    title: '采购计划编码',
    field: 'planCode',
  },
  {
    title: '销售订单id',
    field: 'salesOrderId',
  },
  {
    title: '销售订单编码',
    field: 'salesOrderCode',
  },
  {
    title: '日期',
    field: 'planDate',
  },
  {
    title: '采购计划状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.PURCHASE_PLAN_STATUS 便于维护
        return renderDict(row.status, 'purchase_plan_status');
      },
    },
  },
  {
    title: '备注',
    field: 'remark',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

