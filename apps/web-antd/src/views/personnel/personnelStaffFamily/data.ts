import type { VxeGridProps } from '#/adapter/vxe-table';

import { renderDict } from '#/utils/render';

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '姓名',
    field: 'name',
  },
  {
    title: '用户性别',
    field: 'sex',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_USER_SEX 便于维护
        return renderDict(row.sex, 'sys_user_sex');
      },
    },
  },
  {
    title: '关系',
    field: 'relation',
  },
  {
    title: '出生日期',
    field: 'birthday',
  },
  {
    title: '联系电话',
    field: 'phone',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
