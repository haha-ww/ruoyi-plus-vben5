import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'purchaseCode',
    label: '采购订单编码',
  },
  {
    component: 'Input',
    fieldName: 'supplierId',
    label: '供应商id',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'purchaseType',
    label: '采购类型(字典 purchase_type)',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '部门id',
  },
  {
    component: 'Input',
    fieldName: 'salesperson',
    label: '业务员id',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'orderStatus',
    label: '订单状态',
  },
  {
    component: 'Input',
    fieldName: 'isInvoice',
    label: '是否开票(字典 sys_yes_no)',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'requiredDeliveryDate',
    label: '要求到货日期',
  },
  {
    component: 'Input',
    fieldName: 'settlementMethod',
    label: '结算方式',
  },
  {
    component: 'Input',
    fieldName: 'prepaymentAmount',
    label: '预付金额',
  },
  {
    component: 'Input',
    fieldName: 'currency',
    label: '币种',
  },
  {
    component: 'Input',
    fieldName: 'bankAccountId',
    label: '结算账户id',
  },
  {
    component: 'Input',
    fieldName: 'orderTotalAmount',
    label: '订单总金额',
  },
  {
    component: 'Input',
    fieldName: 'totalTaxAmount',
    label: '总含税金额',
  },
  {
    component: 'Input',
    fieldName: 'discountAmount',
    label: '优惠金额',
  },
  {
    component: 'Input',
    fieldName: 'settlementAccountNumber',
    label: '结算账户账号',
  },
  {
    component: 'Input',
    fieldName: 'approver',
    label: '审批人',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'approvalTime',
    label: '审批时间',
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
    title: '采购订单编码',
    field: 'purchaseCode',
  },
  {
    title: '供应商id',
    field: 'supplierId',
  },
  {
    title: '采购类型(字典 purchase_type)',
    field: 'purchaseType',
  },
  {
    title: '部门id',
    field: 'deptId',
  },
  {
    title: '业务员id',
    field: 'salesperson',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
  },
  {
    title: '是否开票(字典 sys_yes_no)',
    field: 'isInvoice',
  },
  {
    title: '要求到货日期',
    field: 'requiredDeliveryDate',
  },
  {
    title: '备注',
    field: 'remark',
  },
  {
    title: '结算方式',
    field: 'settlementMethod',
  },
  {
    title: '预付金额',
    field: 'prepaymentAmount',
  },
  {
    title: '币种',
    field: 'currency',
  },
  {
    title: '结算账户id',
    field: 'bankAccountId',
  },
  {
    title: '订单总金额',
    field: 'orderTotalAmount',
  },
  {
    title: '总含税金额',
    field: 'totalTaxAmount',
  },
  {
    title: '优惠金额',
    field: 'discountAmount',
  },
  {
    title: '结算账户账号',
    field: 'settlementAccountNumber',
  },
  {
    title: '审批人',
    field: 'approver',
  },
  {
    title: '审批时间',
    field: 'approvalTime',
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
    label: '采购订单编码',
    fieldName: 'purchaseCode',
    component: 'Input',
  },
  {
    label: '供应商id',
    fieldName: 'supplierId',
    component: 'Input',
  },
  {
    label: '采购类型(字典 purchase_type)',
    fieldName: 'purchaseType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '部门id',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '业务员id',
    fieldName: 'salesperson',
    component: 'Input',
  },
  {
    label: '订单状态',
    fieldName: 'orderStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '是否开票(字典 sys_yes_no)',
    fieldName: 'isInvoice',
    component: 'Input',
  },
  {
    label: '要求到货日期',
    fieldName: 'requiredDeliveryDate',
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
    component: 'Input',
  },
  {
    label: '结算方式',
    fieldName: 'settlementMethod',
    component: 'Input',
  },
  {
    label: '预付金额',
    fieldName: 'prepaymentAmount',
    component: 'Input',
  },
  {
    label: '币种',
    fieldName: 'currency',
    component: 'Input',
  },
  {
    label: '结算账户id',
    fieldName: 'bankAccountId',
    component: 'Input',
  },
  {
    label: '订单总金额',
    fieldName: 'orderTotalAmount',
    component: 'Input',
  },
  {
    label: '总含税金额',
    fieldName: 'totalTaxAmount',
    component: 'Input',
  },
  {
    label: '优惠金额',
    fieldName: 'discountAmount',
    component: 'Input',
  },
  {
    label: '结算账户账号',
    fieldName: 'settlementAccountNumber',
    component: 'Input',
  },
  {
    label: '审批人',
    fieldName: 'approver',
    component: 'Input',
  },
  {
    label: '审批时间',
    fieldName: 'approvalTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
