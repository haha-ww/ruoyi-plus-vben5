import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundOrderCode',
    label: '生产入库单编码',
  },
  {
    component: 'TreeSelect',
    fieldName: 'deptId',
    label: '入库部门',
    componentProps: {
      params: {},
      placeholder: '请选择',
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'inboundResponsiblePerson',
    label: '入库负责人',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'inboundDate',
    label: '入库日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '生产入库单编码',
    field: 'inboundOrderCode',
  },
  {
    title: '入库部门',
    field: 'deptName',
  },
  {
    title: '入库负责人',
    field: 'inboundResponsiblePersonName',
  },
  {
    title: '入库日期',
    field: 'inboundDate',
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
    width: 80,
  },
];

