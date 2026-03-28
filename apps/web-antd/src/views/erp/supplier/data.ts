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
    fieldName: 'shortName',
    label: '简称',
  },
  {
    component: 'Input',
    fieldName: 'socialCommunicationCode',
    label: '统一社会信用代码',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'type',
    label: '供应商类型(字典 supplier_type)',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'cooperationStatus',
    label: '合作状态(字典 cooperation_status)',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'succeedDate',
    label: '成立时间',
  },
  {
    component: 'Input',
    fieldName: 'industry',
    label: '所属行业',
  },
  {
    component: 'Input',
    fieldName: 'contactPerson',
    label: '联系人',
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: '联系电话',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '电子邮箱',
  },
  {
    component: 'Input',
    fieldName: 'address',
    label: '联系地址',
  },
  {
    component: 'Input',
    fieldName: 'bank',
    label: '开户行',
  },
  {
    component: 'Input',
    fieldName: 'bankCard',
    label: '银行账号',
  },
  {
    component: 'Input',
    fieldName: 'bill',
    label: '开票抬头',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'settlementType',
    label: '结算方式',
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
    title: '供应商类型(字典 supplier_type)',
    field: 'type',
  },
  {
    title: '合作状态(字典 cooperation_status)',
    field: 'cooperationStatus',
  },
  {
    title: '成立时间',
    field: 'succeedDate',
  },
  {
    title: '所属行业',
    field: 'industry',
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
    title: '电子邮箱',
    field: 'email',
  },
  {
    title: '联系地址',
    field: 'address',
  },
  {
    title: '开户行',
    field: 'bank',
  },
  {
    title: '银行账号',
    field: 'bankCard',
  },
  {
    title: '开票抬头',
    field: 'bill',
  },
  {
    title: '结算方式',
    field: 'settlementType',
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
  },
  {
    label: '供应商名称',
    fieldName: 'supplierName',
    component: 'Input',
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
    label: '供应商类型(字典 supplier_type)',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '合作状态(字典 cooperation_status)',
    fieldName: 'cooperationStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '成立时间',
    fieldName: 'succeedDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
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
    label: '结算方式',
    fieldName: 'settlementType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
