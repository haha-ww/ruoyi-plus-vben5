import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'outboundOrderCode',
    label: '领料出库单号',
  },
  {
    component: 'Input',
    fieldName: 'picker',
    label: '领料人',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '领料部门',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'outboundDate',
    label: '出库日期',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '是否出库',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键id',
    field: 'id',
  },
  {
    title: '领料出库单号',
    field: 'outboundOrderCode',
  },
  {
    title: '领料人',
    field: 'picker',
  },
  {
    title: '领料部门',
    field: 'deptId',
  },
  {
    title: '出库日期',
    field: 'outboundDate',
  },
  {
    title: '是否出库',
    field: 'status',
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
    label: '主键id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '领料出库单号',
    fieldName: 'outboundOrderCode',
    component: 'Input',
  },
  {
    label: '领料人',
    fieldName: 'picker',
    component: 'Input',
  },
  {
    label: '领料部门',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '出库日期',
    fieldName: 'outboundDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '是否出库',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Input',
  },
];
