import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'transferId',
    label: '调拨单主表ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '数量',
  },
  {
    component: 'Input',
    fieldName: 'inWarehouseId',
    label: '调入仓库ID',
  },
  {
    component: 'Input',
    fieldName: 'outWarehouseId',
    label: '调出仓库ID',
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
    title: '调拨单主表ID',
    field: 'transferId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '数量',
    field: 'quantity',
  },
  {
    title: '调入仓库ID',
    field: 'inWarehouseId',
  },
  {
    title: '调出仓库ID',
    field: 'outWarehouseId',
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
    label: '调拨单主表ID',
    fieldName: 'transferId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '数量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '调入仓库ID',
    fieldName: 'inWarehouseId',
    component: 'Input',
  },
  {
    label: '调出仓库ID',
    fieldName: 'outWarehouseId',
    component: 'Input',
  },
];
