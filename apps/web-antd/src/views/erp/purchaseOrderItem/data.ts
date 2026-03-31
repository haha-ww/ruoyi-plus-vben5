import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderId',
    label: '采购订单ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '采购数量',
  },
  {
    component: 'Input',
    fieldName: 'remainQuantity',
    label: '剩余数量',
  },
  {
    component: 'Input',
    fieldName: 'planItemId',
    label: '采购计划明细id',
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
    fieldName: 'taxTotalAmount',
    label: '含税金额',
  },
  {
    component: 'Input',
    fieldName: 'actualTotalAmount',
    label: '未税金额',
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
    title: '采购订单ID',
    field: 'orderId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '采购数量',
    field: 'quantity',
  },
  {
    title: '剩余数量',
    field: 'remainQuantity',
  },
  {
    title: '采购计划明细id',
    field: 'planItemId',
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
    title: '含税金额',
    field: 'taxTotalAmount',
  },
  {
    title: '未税金额',
    field: 'actualTotalAmount',
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
    label: '采购订单ID',
    fieldName: 'orderId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '采购数量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '剩余数量',
    fieldName: 'remainQuantity',
    component: 'Input',
  },
  {
    label: '采购计划明细id',
    fieldName: 'planItemId',
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
    label: '含税金额',
    fieldName: 'taxTotalAmount',
    component: 'Input',
  },
  {
    label: '未税金额',
    fieldName: 'actualTotalAmount',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Input',
  },
];
