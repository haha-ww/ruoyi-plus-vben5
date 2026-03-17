import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { staffSelectList } from '#/api/personnel/personnelStaff';
import { getDeptTree } from '#/api/system/user';

deptTree();
getStaff();
const deptTreeData = ref<any[]>([]);
// 部门下拉树
async function deptTree() {
  const res = await getDeptTree();
  deptTreeData.value = res;
}
const staffData = ref<any[]>([]);
// 员工下拉
async function getStaff() {
  const res = await staffSelectList();
  staffData.value = res;
}
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'TreeSelect',
    componentProps: {
      treeData: deptTreeData,
      showSearch: true,
      treeNodeFilterProp: 'label',
      treeLine: { showLeafIcon: false },
      fieldNames: {
        label: 'label',
        key: 'id',
        value: 'id',
      },
    },
    fieldName: 'deptId',
    label: '部门',
  },
  {
    component: 'Select',
    componentProps: {
      options: staffData,
      showSearch: true,
      optionFilterProp: 'name',
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
    fieldName: 'uid',
    label: '考勤人员',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '自增ID',
    field: 'id',
    visible: false,
  },
  {
    title: '部门',
    field: 'deptName',
  },
  {
    title: '考勤人员',
    field: 'userName',
  },
  {
    title: '打卡状态',
    field: 'clockStatusName',
  },
  {
    title: '打卡地址',
    field: 'address',
  },
  {
    title: '打卡时间',
    field: 'clockTime',
  },

  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
