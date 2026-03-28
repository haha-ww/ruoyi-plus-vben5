import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'returnCode',
    label: '生产退货单编码',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '退料部门',
  },
  {
    component: 'Input',
    fieldName: 'returnResponsiblePerson',
    label: '退料负责人',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'returnDate',
    label: '退货日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'id',
    field: 'id',
  },
  {
    title: '生产退货单编码',
    field: 'returnCode',
  },
  {
    title: '退料部门',
    field: 'deptId',
  },
  {
    title: '退料负责人',
    field: 'returnResponsiblePerson',
  },
  {
    title: '退货日期',
    field: 'returnDate',
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
    label: 'id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '生产退货单编码',
    fieldName: 'returnCode',
    component: 'Input',
  },
  {
    label: '退料部门',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '退料负责人',
    fieldName: 'returnResponsiblePerson',
    component: 'Input',
  },
  {
    label: '退货日期',
    fieldName: 'returnDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
