import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundId',
    label: '其他入库单主表ID',
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
    label: '仓库ID',
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
    title: '其他入库单主表ID',
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
    title: '仓库ID',
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
    label: '其他入库单主表ID',
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
    label: '仓库ID',
    fieldName: 'warehouseId',
    component: 'Input',
  },
];
