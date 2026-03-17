import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '标签名称',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键id',
    field: 'id',
    visible: false,
  },
  {
    title: '标签组名称',
    field: 'name',
  },
  {
    title: '标签',
    field: 'labelName',
    width: 520,
    slots: { default: 'labelName' },
  },
  {
    title: '排序',
    field: 'sort',
  },
  {
    title: '',
    field: 'inputVisible',
    visible: false,
  },
  {
    title: '',
    field: 'inputValue',
    visible: false,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    label: '主键id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '标签名称',
    fieldName: 'name',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '排序',
    fieldName: 'sort',
    component: 'InputNumber',
    rules: 'required',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
