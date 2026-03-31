import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planId',
    label: '采购计划id',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'planQuantity',
    label: '计划采购数量',
  },
  {
    component: 'Input',
    fieldName: 'remainQuantity',
    label: '剩余数量',
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
    title: '采购计划id',
    field: 'planId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '计划采购数量',
    field: 'planQuantity',
  },
  {
    title: '剩余数量',
    field: 'remainQuantity',
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
    label: '',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '采购计划id',
    fieldName: 'planId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '计划采购数量',
    fieldName: 'planQuantity',
    component: 'Input',
  },
  {
    label: '剩余数量',
    fieldName: 'remainQuantity',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Input',
  },
];
