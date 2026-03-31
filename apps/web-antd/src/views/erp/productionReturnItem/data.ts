import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'returnCode',
    label: '领料退货单编码',
  },
  {
    component: 'Input',
    fieldName: 'returnId',
    label: '领料退货单Id',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'actualReturnQuantity',
    label: '实退数量',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '退料仓库id',
  },
  {
    component: 'Input',
    fieldName: 'returnReason',
    label: '退货原因',
  },
  {
    component: 'Input',
    fieldName: 'outboundOrderCode',
    label: '领料出库单号',
  },
  {
    component: 'Input',
    fieldName: 'outboundOrderItemId',
    label: '领料出库单明细id',
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
    title: '领料退货单编码',
    field: 'returnCode',
  },
  {
    title: '领料退货单Id',
    field: 'returnId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '实退数量',
    field: 'actualReturnQuantity',
  },
  {
    title: '退料仓库id',
    field: 'warehouseId',
  },
  {
    title: '退货原因',
    field: 'returnReason',
  },
  {
    title: '领料出库单号',
    field: 'outboundOrderCode',
  },
  {
    title: '领料出库单明细id',
    field: 'outboundOrderItemId',
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
    label: '领料退货单编码',
    fieldName: 'returnCode',
    component: 'Input',
  },
  {
    label: '领料退货单Id',
    fieldName: 'returnId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '实退数量',
    fieldName: 'actualReturnQuantity',
    component: 'Input',
  },
  {
    label: '退料仓库id',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '退货原因',
    fieldName: 'returnReason',
    component: 'Input',
  },
  {
    label: '领料出库单号',
    fieldName: 'outboundOrderCode',
    component: 'Input',
  },
  {
    label: '领料出库单明细id',
    fieldName: 'outboundOrderItemId',
    component: 'Input',
  },
];
