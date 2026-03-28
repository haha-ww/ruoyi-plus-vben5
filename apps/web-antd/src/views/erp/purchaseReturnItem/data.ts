import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'returnId',
    label: '采购退货主表ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'outboundOrderCode',
    label: '采购入库单编号',
  },
  {
    component: 'Input',
    fieldName: 'outboundOrderId',
    label: '采购入库单id',
  },
  {
    component: 'Input',
    fieldName: 'outboundOrderItemId',
    label: '采购入库明细id',
  },
  {
    component: 'Input',
    fieldName: 'purchaseOrderCode',
    label: '采购订单编号',
  },
  {
    component: 'Input',
    fieldName: 'shouldReturnQty',
    label: '应退数量',
  },
  {
    component: 'Input',
    fieldName: 'actualReturnQty',
    label: '实退数量',
  },
  {
    component: 'Input',
    fieldName: 'returnAmount',
    label: '退货金额',
  },
  {
    component: 'Input',
    fieldName: 'returnPrice',
    label: '退货单价',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '退货入库仓库id',
  },
  {
    component: 'Input',
    fieldName: 'locationId',
    label: '库位id',
  },
  {
    component: 'Input',
    fieldName: 'returnReason',
    label: '退货原因',
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
    title: '采购退货主表ID',
    field: 'returnId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '采购入库单编号',
    field: 'outboundOrderCode',
  },
  {
    title: '采购入库单id',
    field: 'outboundOrderId',
  },
  {
    title: '采购入库明细id',
    field: 'outboundOrderItemId',
  },
  {
    title: '采购订单编号',
    field: 'purchaseOrderCode',
  },
  {
    title: '应退数量',
    field: 'shouldReturnQty',
  },
  {
    title: '实退数量',
    field: 'actualReturnQty',
  },
  {
    title: '退货金额',
    field: 'returnAmount',
  },
  {
    title: '退货单价',
    field: 'returnPrice',
  },
  {
    title: '退货入库仓库id',
    field: 'warehouseId',
  },
  {
    title: '库位id',
    field: 'locationId',
  },
  {
    title: '退货原因',
    field: 'returnReason',
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
    label: '采购退货主表ID',
    fieldName: 'returnId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '采购入库单编号',
    fieldName: 'outboundOrderCode',
    component: 'Input',
  },
  {
    label: '采购入库单id',
    fieldName: 'outboundOrderId',
    component: 'Input',
  },
  {
    label: '采购入库明细id',
    fieldName: 'outboundOrderItemId',
    component: 'Input',
  },
  {
    label: '采购订单编号',
    fieldName: 'purchaseOrderCode',
    component: 'Input',
  },
  {
    label: '应退数量',
    fieldName: 'shouldReturnQty',
    component: 'Input',
  },
  {
    label: '实退数量',
    fieldName: 'actualReturnQty',
    component: 'Input',
  },
  {
    label: '退货金额',
    fieldName: 'returnAmount',
    component: 'Input',
  },
  {
    label: '退货单价',
    fieldName: 'returnPrice',
    component: 'Input',
  },
  {
    label: '退货入库仓库id',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '库位id',
    fieldName: 'locationId',
    component: 'Input',
  },
  {
    label: '退货原因',
    fieldName: 'returnReason',
    component: 'Input',
  },
];
