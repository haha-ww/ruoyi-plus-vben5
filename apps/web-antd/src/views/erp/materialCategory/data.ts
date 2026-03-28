import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'categoryCode',
    label: '分类编码',
  },
  {
    component: 'Input',
    fieldName: 'categoryName',
    label: '分类名称',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  
  {
    title: '分类名称',
    field: 'categoryName',
    treeNode: true,
  },
  {
    title: '分类编码',
    field: 'categoryCode',
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
    label: '主键',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '上级分类',
    fieldName: 'parentId',
    component: 'TreeSelect',
  },
  {
    label: '分类编码',
    fieldName: 'categoryCode',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '分类名称',
    fieldName: 'categoryName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
