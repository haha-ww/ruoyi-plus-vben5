import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'mainBomId',
    label: '主bomid',
  },
  {
    component: 'Input',
    fieldName: 'parentId',
    label: '父id',
  },
  {
    component: 'Input',
    fieldName: 'bomId',
    label: 'bomid',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'bomVersion',
    label: 'bom版本',
  },
  {
    component: 'Input',
    fieldName: 'supplyMode',
    label: '供应方式(字典 supply_type)',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '用量',
  },
  {
    component: 'Input',
    fieldName: 'basicQuantity',
    label: '基础用量',
  },
  {
    component: 'Input',
    fieldName: 'scrapRate',
    label: '损耗率 (%)',
  },
  {
    component: 'Input',
    fieldName: 'isBomNode',
    label: '是否为bom节点',
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
    title: '主bomid',
    field: 'mainBomId',
  },
  {
    title: '父id',
    field: 'parentId',
  },
  {
    title: 'bomid',
    field: 'bomId',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: 'bom版本',
    field: 'bomVersion',
  },
  {
    title: '供应方式(字典 supply_type)',
    field: 'supplyMode',
  },
  {
    title: '用量',
    field: 'quantity',
  },
  {
    title: '基础用量',
    field: 'basicQuantity',
  },
  {
    title: '损耗率 (%)',
    field: 'scrapRate',
  },
  {
    title: '是否为bom节点',
    field: 'isBomNode',
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
    label: '主bomid',
    fieldName: 'mainBomId',
    component: 'Input',
  },
  {
    label: '父id',
    fieldName: 'parentId',
    component: 'Input',
  },
  {
    label: 'bomid',
    fieldName: 'bomId',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: 'bom版本',
    fieldName: 'bomVersion',
    component: 'Input',
  },
  {
    label: '供应方式(字典 supply_type)',
    fieldName: 'supplyMode',
    component: 'Input',
  },
  {
    label: '用量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '基础用量',
    fieldName: 'basicQuantity',
    component: 'Input',
  },
  {
    label: '损耗率 (%)',
    fieldName: 'scrapRate',
    component: 'Input',
  },
  {
    label: '是否为bom节点',
    fieldName: 'isBomNode',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
