import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { groupSelectList } from '#/api/personnel/personnelGroup';

loadGroups();
const groupOptions = ref<any[]>([]);
// 初始化加载考勤组
async function loadGroups() {
  const list = await groupSelectList();
  groupOptions.value = list;
}
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {
      options: groupOptions,
      showSearch: true,
      optionFilterProp: 'name',
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
    fieldName: 'groupId',
    label: '考勤组',
  },
  {
    component: 'DatePicker',
    componentProps: {
      picker: 'month',
      valueFormat: 'YYYY-MM',
    },
    fieldName: 'date',
    label: '考勤时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '考勤时间',
    field: 'date',
  },
  {
    title: '考勤组',
    field: 'groupName',
  },

  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
