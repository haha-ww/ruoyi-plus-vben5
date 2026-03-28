import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inspectionId',
    label: '采购质检主表ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'orderItemId',
    label: '采购订单明细id',
  },
  {
    component: 'Input',
    fieldName: 'purchaseOrderCode',
    label: '采购订单编码',
  },
  {
    component: 'Input',
    fieldName: 'inspectQty',
    label: '检验数量',
  },
  {
    component: 'Input',
    fieldName: 'qualifiedQty',
    label: '合格数量',
  },
  {
    component: 'Input',
    fieldName: 'unqualifiedQty',
    label: '不合格数量',
  },
  {
    component: 'Input',
    fieldName: 'unqualifiedReason',
    label: '不合格原因',
  },
  {
    component: 'Input',
    fieldName: 'passRate',
    label: '质检合格率',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键',
    field: 'id',
  },
  {
    title: '采购质检主表ID',
    field: 'inspectionId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '采购订单明细id',
    field: 'orderItemId',
  },
  {
    title: '采购订单编码',
    field: 'purchaseOrderCode',
  },
  {
    title: '检验数量',
    field: 'inspectQty',
  },
  {
    title: '合格数量',
    field: 'qualifiedQty',
  },
  {
    title: '不合格数量',
    field: 'unqualifiedQty',
  },
  {
    title: '不合格原因',
    field: 'unqualifiedReason',
  },
  {
    title: '质检合格率',
    field: 'passRate',
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
    label: '主键',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '采购质检主表ID',
    fieldName: 'inspectionId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '采购订单明细id',
    fieldName: 'orderItemId',
    component: 'Input',
  },
  {
    label: '采购订单编码',
    fieldName: 'purchaseOrderCode',
    component: 'Input',
  },
  {
    label: '检验数量',
    fieldName: 'inspectQty',
    component: 'Input',
  },
  {
    label: '合格数量',
    fieldName: 'qualifiedQty',
    component: 'Input',
  },
  {
    label: '不合格数量',
    fieldName: 'unqualifiedQty',
    component: 'Input',
  },
  {
    label: '不合格原因',
    fieldName: 'unqualifiedReason',
    component: 'Input',
  },
  {
    label: '质检合格率',
    fieldName: 'passRate',
    component: 'Input',
  },
];
