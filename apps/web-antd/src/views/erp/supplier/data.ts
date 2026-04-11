import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'supplierCode',
    label: '供应商编码',
  },
  {
    component: 'Input',
    fieldName: 'supplierName',
    label: '供应商名称',
  },
  {
    component: 'Input',
    labelWidth: '200px',
    fieldName: 'socialCommunicationCode',
    label: '统一社会信用代码',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '供应商编码',
    field: 'supplierCode',
  },
  {
    title: '供应商名称',
    field: 'supplierName',
  },
  {
    title: '简称',
    field: 'shortName',
  },
  {
    title: '统一社会信用代码',
    field: 'socialCommunicationCode',
  },
  {
    title: '联系人',
    field: 'contactPerson',
  },
  {
    title: '联系电话',
    field: 'phone',
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
    label: '供应商编码',
    fieldName: 'supplierCode',
    component: 'Input',
    disabled: true,
    componentProps: {
      placeholder: '系统自动生成',
    },
  },
  {
    label: '供应商名称',
    fieldName: 'supplierName',
    component: 'Input',
    rules: 'required'
  },
  {
    label: '简称',
    fieldName: 'shortName',
    component: 'Input',
  },
  {
    label: '统一社会信用代码',
    fieldName: 'socialCommunicationCode',
    component: 'Input',
  },
  {
    label: '成立时间',
    fieldName: 'succeedDate',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '所属行业',
    fieldName: 'industry',
    component: 'Input',
  },
  {
    label: '联系人',
    fieldName: 'contactPerson',
    component: 'Input',
  },
  {
    label: '联系电话',
    fieldName: 'phone',
    component: 'Input',
  },
  {
    label: '电子邮箱',
    fieldName: 'email',
    component: 'Input',
  },
  {
    label: '联系地址',
    fieldName: 'address',
    component: 'Input',
  },
  {
    label: '开户行',
    fieldName: 'bank',
    component: 'Input',
  },
  {
    label: '银行账号',
    fieldName: 'bankCard',
    component: 'Input',
  },
  {
    label: '开票抬头',
    fieldName: 'bill',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
