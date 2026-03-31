import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'warehouseCode',
    label: '仓库编码',
  },
  {
    component: 'Input',
    fieldName: 'warehouseName',
    label: '仓库名称',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'warehouseType',
    label: '仓库类型(字典 warehouse_type)',
  },
  {
    component: 'Input',
    fieldName: 'location',
    label: '仓库地址',
  },
  {
    component: 'Input',
    fieldName: 'userId',
    label: '负责人',
  },
  {
    component: 'Input',
    fieldName: 'orderNum',
    label: '显示顺序',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '启用状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '仓库ID',
    field: 'id',
  },
  {
    title: '仓库编码',
    field: 'warehouseCode',
  },
  {
    title: '仓库名称',
    field: 'warehouseName',
  },
  {
    title: '仓库类型(字典 warehouse_type)',
    field: 'warehouseType',
  },
  {
    title: '仓库地址',
    field: 'location',
  },
  {
    title: '负责人',
    field: 'userId',
  },
  {
    title: '显示顺序',
    field: 'orderNum',
  },
  {
    title: '启用状态',
    field: 'status',
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
    label: '仓库ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '仓库编码',
    fieldName: 'warehouseCode',
    component: 'Input',
  },
  {
    label: '仓库名称',
    fieldName: 'warehouseName',
    component: 'Input',
  },
  {
    label: '仓库类型(字典 warehouse_type)',
    fieldName: 'warehouseType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '仓库地址',
    fieldName: 'location',
    component: 'Input',
  },
  {
    label: '负责人',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: '显示顺序',
    fieldName: 'orderNum',
    component: 'Input',
  },
  {
    label: '启用状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
