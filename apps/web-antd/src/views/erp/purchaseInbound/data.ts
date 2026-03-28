import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundCode',
    label: '采购入库单编码',
  },
  {
    component: 'Input',
    fieldName: 'purchaseOrderId',
    label: '采购订单id',
  },
  {
    component: 'Input',
    fieldName: 'purchaseCode',
    label: '采购订单编码',
  },
  {
    component: 'Input',
    fieldName: 'supplierId',
    label: '供应商id',
  },
  {
    component: 'Input',
    fieldName: 'warehouseManager',
    label: '库管员id',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'inboundDate',
    label: '入库日期',
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
    title: '主键ID',
    field: 'id',
  },
  {
    title: '采购入库单编码',
    field: 'inboundCode',
  },
  {
    title: '采购订单id',
    field: 'purchaseOrderId',
  },
  {
    title: '采购订单编码',
    field: 'purchaseCode',
  },
  {
    title: '供应商id',
    field: 'supplierId',
  },
  {
    title: '库管员id',
    field: 'warehouseManager',
  },
  {
    title: '入库日期',
    field: 'inboundDate',
  },
  {
    title: '备注',
    field: 'remark',
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
    label: '主键ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '采购入库单编码',
    fieldName: 'inboundCode',
    component: 'Input',
  },
  {
    label: '采购订单id',
    fieldName: 'purchaseOrderId',
    component: 'Input',
  },
  {
    label: '采购订单编码',
    fieldName: 'purchaseCode',
    component: 'Input',
  },
  {
    label: '供应商id',
    fieldName: 'supplierId',
    component: 'Input',
  },
  {
    label: '库管员id',
    fieldName: 'warehouseManager',
    component: 'Input',
  },
  {
    label: '入库日期',
    fieldName: 'inboundDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
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
