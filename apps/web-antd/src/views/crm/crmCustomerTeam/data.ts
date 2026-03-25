import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: '用户id',
  },
  {
    component: 'Input',
    fieldName: 'customerFollowed',
    label: '是否关注(0否，1是)',
  },
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
    title: '姓名',
    field: 'name',
  },
  {
    title: '手机号',
    field: 'phone',
  },
  {
    title: '性别',
    field: 'sex',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SEX_TYPE 便于维护
        if (!row.sex) {
          return '';
        }
        return renderDict(row.sex, 'sys_user_sex');
      },
    },
  },
  {
    title: '部门',
    field: 'deptName',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 80,
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
    label: '客户id',
    fieldName: 'customerId',
    component: 'Input',
  },
  {
    label: '用户id',
    fieldName: 'userIds',
    component: 'Input',
  },
];
