import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'checkId',
    label: '盘点单id',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'actualQuantity',
    label: '盘点数量',
  },
  {
    component: 'Input',
    fieldName: 'varianceQuantity',
    label: '盈亏数量',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'varianceType',
    label: '盘点结果',
  },
  {
    component: 'Input',
    fieldName: 'inboundId',
    label: '其它入库id',
  },
  {
    component: 'Input',
    fieldName: 'outboundId',
    label: '其他出库id',
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
    title: '盘点单id',
    field: 'checkId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '盘点数量',
    field: 'actualQuantity',
  },
  {
    title: '盈亏数量',
    field: 'varianceQuantity',
  },
  {
    title: '盘点结果',
    field: 'varianceType',
  },
  {
    title: '其它入库id',
    field: 'inboundId',
  },
  {
    title: '其他出库id',
    field: 'outboundId',
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
    label: '盘点单id',
    fieldName: 'checkId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '盘点数量',
    fieldName: 'actualQuantity',
    component: 'Input',
  },
  {
    label: '盈亏数量',
    fieldName: 'varianceQuantity',
    component: 'Input',
  },
  {
    label: '盘点结果',
    fieldName: 'varianceType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '其它入库id',
    fieldName: 'inboundId',
    component: 'Input',
  },
  {
    label: '其他出库id',
    fieldName: 'outboundId',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
