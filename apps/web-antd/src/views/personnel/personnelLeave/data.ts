import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { staffSelectList } from '#/api/personnel/personnelStaff';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

getStaff();
const staffData = ref<any[]>([]);
// 员工下拉
async function getStaff() {
  const res = await staffSelectList();
  staffData.value = res;
}
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {
      options: staffData,
      showSearch: true,
      optionFilterProp: 'name',
      fieldNames: { label: 'name', value: 'id' },
    },
    fieldName: 'staffId',
    label: '员工',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.LEAVE_TYPE 便于维护
      options: getDictOptions('leave_type'),
    },
    fieldName: 'leaveType',
    label: '请假类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'startTime',
    label: '开始时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endTime',
    label: '结束时间',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.AUDIT_STATUS 便于维护
      options: getDictOptions('audit_status'),
    },
    fieldName: 'auditStatus',
    label: '审核状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键',
    field: 'id',
    visible: false,
  },
  {
    title: '员工',
    field: 'staffName',
  },
  {
    title: '请假类型',
    field: 'leaveType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.LEAVE_TYPE 便于维护
        return renderDict(row.leaveType, 'leave_type');
      },
    },
  },
  {
    title: '开始时间',
    field: 'startTime',
  },
  {
    title: '结束时间',
    field: 'endTime',
  },
  {
    title: '请假时长',
    field: 'leaveLength',
  },
  {
    title: '审核状态',
    field: 'auditStatus',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.AUDIT_STATUS 便于维护
        return renderDict(row.auditStatus, 'audit_status');
      },
    },
  },
  {
    title: '请假原因',
    field: 'reason',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
