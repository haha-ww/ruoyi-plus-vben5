import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'bomName',
    label: 'bom名称',
  },
  {
    component: 'Input',
    fieldName: 'bomCode',
    label: 'bom编码',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'bomType',
    label: 'bom类型(字典 bom_type)',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'effectiveDate',
    label: '生效日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'expiryDate',
    label: '失效日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
  },
  {
    title: 'bom名称',
    field: 'bomName',
  },
  {
    title: 'bom编码',
    field: 'bomCode',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: '状态',
    field: 'status',
  },
  {
    title: 'bom类型(字典 bom_type)',
    field: 'bomType',
  },
  {
    title: '生效日期',
    field: 'effectiveDate',
  },
  {
    title: '失效日期',
    field: 'expiryDate',
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
    label: '',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: 'bom名称',
    fieldName: 'bomName',
    component: 'Input',
  },
  {
    label: 'bom编码',
    fieldName: 'bomCode',
    component: 'Input',
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: 'bom类型(字典 bom_type)',
    fieldName: 'bomType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '生效日期',
    fieldName: 'effectiveDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '失效日期',
    fieldName: 'expiryDate',
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
