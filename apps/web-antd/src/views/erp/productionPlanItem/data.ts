import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planId',
    label: '主计划ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '产品ID',
  },
  {
    component: 'Input',
    fieldName: 'planQty',
    label: '计划生产数量',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'planStartTime',
    label: '计划开始时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'planEndTime',
    label: '计划结束时间',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'sourceType',
    label: '来源类型',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderId',
    label: '销售订单id',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
  },
  {
    title: '主计划ID',
    field: 'planId',
  },
  {
    title: '产品ID',
    field: 'materialId',
  },
  {
    title: '计划生产数量',
    field: 'planQty',
  },
  {
    title: '计划开始时间',
    field: 'planStartTime',
  },
  {
    title: '计划结束时间',
    field: 'planEndTime',
  },
  {
    title: '来源类型',
    field: 'sourceType',
  },
  {
    title: '销售订单id',
    field: 'salesOrderId',
  },
  {
    title: '状态',
    field: 'status',
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
    label: '',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '主计划ID',
    fieldName: 'planId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '产品ID',
    fieldName: 'materialId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '计划生产数量',
    fieldName: 'planQty',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '计划开始时间',
    fieldName: 'planStartTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '计划结束时间',
    fieldName: 'planEndTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '来源类型',
    fieldName: 'sourceType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '销售订单id',
    fieldName: 'salesOrderId',
    component: 'Input',
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
];
