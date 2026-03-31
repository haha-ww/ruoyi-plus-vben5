import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundOrderId',
    label: '生产入库单id',
  },
  {
    component: 'Input',
    fieldName: 'productionOrderId',
    label: '生产订单id',
  },
  {
    component: 'Input',
    fieldName: 'productionOrderCode',
    label: '生产订单编码',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'inboundQuantity',
    label: '入库数量',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '入库仓库id',
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
    title: '生产入库单id',
    field: 'inboundOrderId',
  },
  {
    title: '生产订单id',
    field: 'productionOrderId',
  },
  {
    title: '生产订单编码',
    field: 'productionOrderCode',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '入库数量',
    field: 'inboundQuantity',
  },
  {
    title: '入库仓库id',
    field: 'warehouseId',
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
    label: '生产入库单id',
    fieldName: 'inboundOrderId',
    component: 'Input',
  },
  {
    label: '生产订单id',
    fieldName: 'productionOrderId',
    component: 'Input',
  },
  {
    label: '生产订单编码',
    fieldName: 'productionOrderCode',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '入库数量',
    fieldName: 'inboundQuantity',
    component: 'Input',
  },
  {
    label: '入库仓库id',
    fieldName: 'warehouseId',
    component: 'Input',
  },
];
