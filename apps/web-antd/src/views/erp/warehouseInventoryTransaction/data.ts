import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'transactionNo',
    label: '事务单号(业务单据号)',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'transactionDate',
    label: '单据日期',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'type',
    label: '单据类型：1-入库单，2-出库单',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'subType',
    label: '事务类型(字典 transaction_type)',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '关联仓库ID',
  },
  {
    component: 'Input',
    fieldName: 'businessPartnerId',
    label: '业务伙伴ID',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料ID',
  },
  {
    component: 'Input',
    fieldName: 'batchNo',
    label: '批次号',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '变动数量',
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
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '事务ID',
    field: 'id',
  },
  {
    title: '事务单号(业务单据号)',
    field: 'transactionNo',
  },
  {
    title: '单据日期',
    field: 'transactionDate',
  },
  {
    title: '单据类型：1-入库单，2-出库单',
    field: 'type',
  },
  {
    title: '事务类型(字典 transaction_type)',
    field: 'subType',
  },
  {
    title: '关联仓库ID',
    field: 'warehouseId',
  },
  {
    title: '业务伙伴ID',
    field: 'businessPartnerId',
  },
  {
    title: '物料ID',
    field: 'materialId',
  },
  {
    title: '批次号',
    field: 'batchNo',
  },
  {
    title: '变动数量',
    field: 'quantity',
  },
  {
    title: '状态',
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
    label: '事务ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '事务单号(业务单据号)',
    fieldName: 'transactionNo',
    component: 'Input',
  },
  {
    label: '单据日期',
    fieldName: 'transactionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '单据类型：1-入库单，2-出库单',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '事务类型(字典 transaction_type)',
    fieldName: 'subType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '关联仓库ID',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '业务伙伴ID',
    fieldName: 'businessPartnerId',
    component: 'Input',
  },
  {
    label: '物料ID',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '批次号',
    fieldName: 'batchNo',
    component: 'Input',
  },
  {
    label: '变动数量',
    fieldName: 'quantity',
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
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
