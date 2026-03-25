import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
    visible: false,
  },
  {
    title: '联系人姓名',
    field: 'liaisonName',
  },
  {
    title: '联系电话',
    field: 'liaisonTel',
  },
  {
    title: '联系人职位',
    field: 'liaisonJob',
  },
  {
    title: '性别',
    field: 'liaisonSex',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_USER_SEX 便于维护
        return renderDict(row.liaisonSex, 'sys_user_sex');
      },
    },
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

export const drawerSchema: FormSchemaGetter = () => [
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
    label: '客户ID',
    fieldName: 'customerId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '联系人姓名',
    fieldName: 'liaisonName',
    component: 'Input',
  },
  {
    label: '联系电话',
    fieldName: 'liaisonTel',
    component: 'Input',
  },
  {
    label: '联系人职位',
    fieldName: 'liaisonJob',
    component: 'Input',
  },
  {
    label: '性别',
    fieldName: 'liaisonSex',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_USER_SEX 便于维护
      options: getDictOptions('sys_user_sex'),
    },
  },
  {
    label: '联系人邮箱',
    fieldName: 'liaisonEmail',
    component: 'Input',
  },
  {
    label: '联系人微信',
    fieldName: 'liaisonWx',
    component: 'Input',
  },
  {
    label: '联系人QQ',
    fieldName: 'liaisonQq',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
