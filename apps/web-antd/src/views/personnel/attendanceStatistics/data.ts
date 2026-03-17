import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { getDeptTree } from '#/api/system/user';

// 获取当前月份
const date = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要 +1
  const currentYearMonth = `${year}-${month}`;

  return currentYearMonth;
};
// 部门下拉树
const deptTreeData = () => {
  const deptTree = ref<any[]>([]);
  getDeptTree().then((res) => {
    deptTree.value = res;
  });
  return deptTree;
};
export const querySchema: FormSchemaGetter = () => [
  {
    defaultValue: date(),
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM',
      valueFormat: 'YYYY-MM',
      picker: 'month',
    },
    fieldName: 'attendanceDate',
    label: '考勤时间',
  },
  {
    fieldName: 'deptId',
    label: '部门',
    component: 'TreeSelect',
    componentProps: {
      treeData: deptTreeData(),
      allowClear: true,
      showCheckedStrategy: 'SHOW_ALL',
      placeholder: '选择考勤部门',
      treeNodeFilterProp: 'label',
      fieldNames: {
        label: 'label',
        value: 'id',
        children: 'children',
      },
    },
    slot: 'deptItem',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  {
    title: '姓名',
    field: 'name',
  },
  {
    title: '部门',
    field: 'deptName',
  },
  {
    title: '出勤统计',
    children: [
      {
        title: '应出勤天数',
        field: 'requiredWorkDays',
      },
      {
        title: '实际出勤天数',
        field: 'actualWorkDays',
        width: 120,
      },
    ],
  },
  {
    title: '异常统计',
    children: [
      {
        title: '迟到次数',
        field: 'lateTimes',
      },
      {
        title: '早退次数',
        field: 'earlyLeaveTimes',
      },
      {
        title: '缺卡次数',
        field: 'lackCardTimes',
      },
      {
        title: '旷工天数',
        field: 'absenceDays',
      },
    ],
  },

  {
    title: '加班(小时)',
    field: 'overtimeHours',
  },
  {
    title: '请假(小时)',
    field: 'leaveHours',
  },
  {
    title: '调休(小时)',
    field: 'restHours',
  },
];
