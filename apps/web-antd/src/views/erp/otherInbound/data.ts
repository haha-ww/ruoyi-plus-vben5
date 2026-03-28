import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundCode',
    label: '其他入库单编号',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'businessType',
    label: '业务类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'inboundDate',
    label: '单据日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键ID',
    field: 'id',
  },
  {
    title: '其他入库单编号',
    field: 'inboundCode',
  },
  {
    title: '业务类型',
    field: 'businessType',
  },
  {
    title: '单据日期',
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
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '主键ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '其他入库单编号',
    fieldName: 'inboundCode',
    component: 'Input',
  },
  {
    label: '业务类型',
    fieldName: 'businessType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '单据日期',
    fieldName: 'inboundDate',
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
