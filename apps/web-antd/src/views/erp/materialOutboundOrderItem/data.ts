import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'outboundOrderId',
    label: '领料出库id',
  },
  {
    component: 'Input',
    fieldName: 'outboundOrderCode',
    label: '领料出库单号',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'actualQuantity',
    label: '实际领料数量',
  },
  {
    component: 'Input',
    fieldName: 'returnQuantity',
    label: '退料数量',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '发料仓库id',
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
    title: '领料出库id',
    field: 'outboundOrderId',
  },
  {
    title: '领料出库单号',
    field: 'outboundOrderCode',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '实际领料数量',
    field: 'actualQuantity',
  },
  {
    title: '退料数量',
    field: 'returnQuantity',
  },
  {
    title: '发料仓库id',
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
    label: '领料出库id',
    fieldName: 'outboundOrderId',
    component: 'Input',
  },
  {
    label: '领料出库单号',
    fieldName: 'outboundOrderCode',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '实际领料数量',
    fieldName: 'actualQuantity',
    component: 'Input',
  },
  {
    label: '退料数量',
    fieldName: 'returnQuantity',
    component: 'Input',
  },
  {
    label: '发料仓库id',
    fieldName: 'warehouseId',
    component: 'Input',
  },
];
