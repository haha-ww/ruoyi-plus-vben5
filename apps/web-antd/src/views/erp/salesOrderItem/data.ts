import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderId',
    label: '销售订单ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'bomId',
    label: 'bomId',
  },
  {
    component: 'Input',
    fieldName: 'bomVersion',
    label: 'bom版本',
  },
  {
    component: 'Input',
    fieldName: 'returnQuantity',
    label: '退货数',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '订单数量',
  },
  {
    component: 'Input',
    fieldName: 'taxIncludedPrice',
    label: '含税单价',
  },
  {
    component: 'Input',
    fieldName: 'taxRate',
    label: '税率(字典 tax_rate)',
  },
  {
    component: 'Input',
    fieldName: 'taxExcludedPrice',
    label: '不含税单价',
  },
  {
    component: 'Input',
    fieldName: 'priceBeforeDiscount',
    label: '价税合计金额',
  },
  {
    component: 'Input',
    fieldName: 'discountRate',
    label: '折扣率',
  },
  {
    component: 'Input',
    fieldName: 'discountAmount',
    label: '折扣金额',
  },
  {
    component: 'Input',
    fieldName: 'actualTotalAmount',
    label: '实际总金额',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'requiredDeliveryDate',
    label: '要求交货日期',
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
    title: '销售订单ID',
    field: 'orderId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: 'bomId',
    field: 'bomId',
  },
  {
    title: 'bom版本',
    field: 'bomVersion',
  },
  {
    title: '退货数',
    field: 'returnQuantity',
  },
  {
    title: '订单数量',
    field: 'quantity',
  },
  {
    title: '含税单价',
    field: 'taxIncludedPrice',
  },
  {
    title: '税率(字典 tax_rate)',
    field: 'taxRate',
  },
  {
    title: '不含税单价',
    field: 'taxExcludedPrice',
  },
  {
    title: '价税合计金额',
    field: 'priceBeforeDiscount',
  },
  {
    title: '折扣率',
    field: 'discountRate',
  },
  {
    title: '折扣金额',
    field: 'discountAmount',
  },
  {
    title: '实际总金额',
    field: 'actualTotalAmount',
  },
  {
    title: '要求交货日期',
    field: 'requiredDeliveryDate',
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
    label: '销售订单ID',
    fieldName: 'orderId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: 'bomId',
    fieldName: 'bomId',
    component: 'Input',
  },
  {
    label: 'bom版本',
    fieldName: 'bomVersion',
    component: 'Input',
  },
  {
    label: '退货数',
    fieldName: 'returnQuantity',
    component: 'Input',
  },
  {
    label: '订单数量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '含税单价',
    fieldName: 'taxIncludedPrice',
    component: 'Input',
  },
  {
    label: '税率(字典 tax_rate)',
    fieldName: 'taxRate',
    component: 'Input',
  },
  {
    label: '不含税单价',
    fieldName: 'taxExcludedPrice',
    component: 'Input',
  },
  {
    label: '价税合计金额',
    fieldName: 'priceBeforeDiscount',
    component: 'Input',
  },
  {
    label: '折扣率',
    fieldName: 'discountRate',
    component: 'Input',
  },
  {
    label: '折扣金额',
    fieldName: 'discountAmount',
    component: 'Input',
  },
  {
    label: '实际总金额',
    fieldName: 'actualTotalAmount',
    component: 'Input',
  },
  {
    label: '要求交货日期',
    fieldName: 'requiredDeliveryDate',
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
