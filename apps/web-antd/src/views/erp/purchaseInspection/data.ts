import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inspectionCode',
    label: '质检单编码',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'businessType',
    label: '类型',
  },
  {
    component: 'Input',
    fieldName: 'purchaseOrderId',
    label: '采购订单id',
  },
  {
    component: 'Input',
    fieldName: 'purchaseOrderNo',
    label: '采购订单编码',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '质检部门id',
  },
  {
    component: 'Input',
    fieldName: 'inspectorId',
    label: '质检员id',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'documentDate',
    label: '单据日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '自增主键',
    field: 'id',
  },
  {
    title: '质检单编码',
    field: 'inspectionCode',
  },
  {
    title: '类型',
    field: 'businessType',
  },
  {
    title: '采购订单id',
    field: 'purchaseOrderId',
  },
  {
    title: '采购订单编码',
    field: 'purchaseOrderNo',
  },
  {
    title: '质检部门id',
    field: 'deptId',
  },
  {
    title: '质检员id',
    field: 'inspectorId',
  },
  {
    title: '单据日期',
    field: 'documentDate',
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
    label: '自增主键',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '质检单编码',
    fieldName: 'inspectionCode',
    component: 'Input',
  },
  {
    label: '类型',
    fieldName: 'businessType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '采购订单id',
    fieldName: 'purchaseOrderId',
    component: 'Input',
  },
  {
    label: '采购订单编码',
    fieldName: 'purchaseOrderNo',
    component: 'Input',
  },
  {
    label: '质检部门id',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '质检员id',
    fieldName: 'inspectorId',
    component: 'Input',
  },
  {
    label: '单据日期',
    fieldName: 'documentDate',
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
];
