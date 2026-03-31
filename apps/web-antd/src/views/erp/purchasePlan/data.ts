import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


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
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
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

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '主键',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '采购计划编码',
    fieldName: 'planCode',
    component: 'Input',
  },
  {
    label: '销售订单id',
    fieldName: 'salesOrderId',
    component: 'Input',
  },
  {
    label: '销售订单编码',
    fieldName: 'salesOrderCode',
    component: 'Input',
  },
  {
    label: '日期',
    fieldName: 'planDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '采购计划状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Input',
  },
];
