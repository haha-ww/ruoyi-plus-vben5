import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'outboundOrderId',
    label: '销售出库id',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderId',
    label: '销售订单id',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderNo',
    label: '销售订单编号',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderItemId',
    label: '销售订单明细id',
  },
  {
    component: 'Input',
    fieldName: 'outboundQuantity',
    label: '出库数量',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '仓库id',
  },
  {
    component: 'Input',
    fieldName: 'locationId',
    label: '库位id',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '自增主键ID',
    field: 'id',
  },
  {
    title: '销售出库id',
    field: 'outboundOrderId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '销售订单id',
    field: 'salesOrderId',
  },
  {
    title: '销售订单编号',
    field: 'salesOrderNo',
  },
  {
    title: '销售订单明细id',
    field: 'salesOrderItemId',
  },
  {
    title: '出库数量',
    field: 'outboundQuantity',
  },
  {
    title: '仓库id',
    field: 'warehouseId',
  },
  {
    title: '库位id',
    field: 'locationId',
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
    label: '自增主键ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '销售出库id',
    fieldName: 'outboundOrderId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '销售订单id',
    fieldName: 'salesOrderId',
    component: 'Input',
  },
  {
    label: '销售订单编号',
    fieldName: 'salesOrderNo',
    component: 'Input',
  },
  {
    label: '销售订单明细id',
    fieldName: 'salesOrderItemId',
    component: 'Input',
  },
  {
    label: '出库数量',
    fieldName: 'outboundQuantity',
    component: 'Input',
  },
  {
    label: '仓库id',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '库位id',
    fieldName: 'locationId',
    component: 'Input',
  },
];
