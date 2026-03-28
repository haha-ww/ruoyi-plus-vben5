import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundId',
    label: '采购入库ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '入库数量',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '仓库id',
  },
  {
    component: 'Input',
    fieldName: 'orderItemId',
    label: '采购订单明细id',
  },
  {
    component: 'Input',
    fieldName: 'purchaseCode',
    label: '采购订单编码',
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
    title: '采购入库ID',
    field: 'inboundId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '入库数量',
    field: 'quantity',
  },
  {
    title: '仓库id',
    field: 'warehouseId',
  },
  {
    title: '采购订单明细id',
    field: 'orderItemId',
  },
  {
    title: '采购订单编码',
    field: 'purchaseCode',
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
    label: '采购入库ID',
    fieldName: 'inboundId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '入库数量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '仓库id',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '采购订单明细id',
    fieldName: 'orderItemId',
    component: 'Input',
  },
  {
    label: '采购订单编码',
    fieldName: 'purchaseCode',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Input',
  },
];
