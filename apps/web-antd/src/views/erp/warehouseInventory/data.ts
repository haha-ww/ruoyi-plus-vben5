import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '仓库ID',
  },
  {
    component: 'Input',
    fieldName: 'locationId',
    label: '库位ID',
  },
  {
    component: 'Input',
    fieldName: 'batchNo',
    label: '批次号',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料ID',
  },
  {
    component: 'Input',
    fieldName: 'currentQty',
    label: '当前可用库存',
  },
  {
    component: 'Input',
    fieldName: 'lockedQty',
    label: '锁定库存(已分配未出库)',
  },
  {
    component: 'Input',
    fieldName: 'inTransitQty',
    label: '在途库存',
  },
  {
    component: 'Input',
    fieldName: 'adjustmentQty',
    label: '待调整数量',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '库存ID',
    field: 'id',
  },
  {
    title: '仓库ID',
    field: 'warehouseId',
  },
  {
    title: '库位ID',
    field: 'locationId',
  },
  {
    title: '批次号',
    field: 'batchNo',
  },
  {
    title: '物料ID',
    field: 'materialId',
  },
  {
    title: '当前可用库存',
    field: 'currentQty',
  },
  {
    title: '锁定库存(已分配未出库)',
    field: 'lockedQty',
  },
  {
    title: '在途库存',
    field: 'inTransitQty',
  },
  {
    title: '待调整数量',
    field: 'adjustmentQty',
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
    label: '库存ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '仓库ID',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '库位ID',
    fieldName: 'locationId',
    component: 'Input',
  },
  {
    label: '批次号',
    fieldName: 'batchNo',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '物料ID',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '当前可用库存',
    fieldName: 'currentQty',
    component: 'Input',
  },
  {
    label: '锁定库存(已分配未出库)',
    fieldName: 'lockedQty',
    component: 'Input',
  },
  {
    label: '在途库存',
    fieldName: 'inTransitQty',
    component: 'Input',
  },
  {
    label: '待调整数量',
    fieldName: 'adjustmentQty',
    component: 'Input',
  },
];
