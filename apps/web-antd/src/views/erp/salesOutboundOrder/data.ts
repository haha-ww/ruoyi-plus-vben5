import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'outboundOrderCode',
    label: '销售出库单编码',
  },
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户id',
  },
  {
    component: 'Input',
    fieldName: 'outboundResponsiblePerson',
    label: '出库负责人',
  },
  {
    component: 'Textarea',
    fieldName: 'shippingAddress',
    label: '收货地址',
  },
  {
    component: 'Input',
    fieldName: 'logisticsCompany',
    label: '物流公司',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'orderDate',
    label: '单据日期',
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
    title: '销售出库单编码',
    field: 'outboundOrderCode',
  },
  {
    title: '客户id',
    field: 'customerId',
  },
  {
    title: '出库负责人',
    field: 'outboundResponsiblePerson',
  },
  {
    title: '收货地址',
    field: 'shippingAddress',
  },
  {
    title: '物流公司',
    field: 'logisticsCompany',
  },
  {
    title: '单据日期',
    field: 'orderDate',
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
    label: '主键ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '销售出库单编码',
    fieldName: 'outboundOrderCode',
    component: 'Input',
  },
  {
    label: '客户id',
    fieldName: 'customerId',
    component: 'Input',
  },
  {
    label: '出库负责人',
    fieldName: 'outboundResponsiblePerson',
    component: 'Input',
  },
  {
    label: '收货地址',
    fieldName: 'shippingAddress',
    component: 'Textarea',
  },
  {
    label: '物流公司',
    fieldName: 'logisticsCompany',
    component: 'Input',
  },
  {
    label: '单据日期',
    fieldName: 'orderDate',
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
