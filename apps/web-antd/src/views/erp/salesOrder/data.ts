import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderCode',
    label: '销售订单编码',
  },
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户名称id',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'orderStatus',
    label: '订单状态(字典 order_status)',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '部门id',
  },
  {
    component: 'Input',
    fieldName: 'salesPersonId',
    label: '销售人员',
  },
  {
    component: 'Input',
    fieldName: 'orderSource',
    label: '订单来源',
  },
  {
    component: 'Input',
    fieldName: 'isInvoice',
    label: '是否开票(字典 sys_yes_no)',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'voucherType',
    label: '票据类型(字典 voucher_type)',
  },
  {
    component: 'Input',
    fieldName: 'taxRate',
    label: '税率',
  },
  {
    component: 'Input',
    fieldName: 'totalTaxAmount',
    label: '总含税金额',
  },
  {
    component: 'Input',
    fieldName: 'discountRate',
    label: '折扣率',
  },
  {
    component: 'Input',
    fieldName: 'totalDiscountAmount',
    label: '总折扣金额',
  },
  {
    component: 'Input',
    fieldName: 'favourableAmount',
    label: '优惠',
  },
  {
    component: 'Input',
    fieldName: 'netAmount',
    label: '不含税金额',
  },
  {
    component: 'Input',
    fieldName: 'orderTotalAmount',
    label: '订单总金额',
  },
  {
    component: 'Input',
    fieldName: 'deliveryAddress',
    label: '交货地址',
  },
  {
    component: 'Input',
    fieldName: 'orderRemark',
    label: '订单备注',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'deliveryDate',
    label: '交付日期',
  },
  {
    component: 'Input',
    fieldName: 'settlementMethod',
    label: '结算方式(字典 settlement_type)',
  },
  {
    component: 'Input',
    fieldName: 'bankAccountId',
    label: '结算账户id',
  },
  {
    component: 'Input',
    fieldName: 'settlementAccountNumber',
    label: '结算账户账号',
  },
  {
    component: 'Input',
    fieldName: 'prepaymentAmount',
    label: '预收金额',
  },
  {
    component: 'Input',
    fieldName: 'finalPaymentAmount',
    label: '尾款金额',
  },
  {
    component: 'Input',
    fieldName: 'shippingFeeAmount',
    label: '运费金额',
  },
  {
    component: 'Input',
    fieldName: 'shippingFeeBearer',
    label: '运费承担方(字典 freight_bearer)',
  },
  {
    component: 'Input',
    fieldName: 'isMrp',
    label: '是否进行mrp',
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
    title: '销售订单编码',
    field: 'orderCode',
  },
  {
    title: '客户名称id',
    field: 'customerId',
  },
  {
    title: '订单状态(字典 order_status)',
    field: 'orderStatus',
  },
  {
    title: '部门id',
    field: 'deptId',
  },
  {
    title: '销售人员',
    field: 'salesPersonId',
  },
  {
    title: '订单来源',
    field: 'orderSource',
  },
  {
    title: '是否开票(字典 sys_yes_no)',
    field: 'isInvoice',
  },
  {
    title: '票据类型(字典 voucher_type)',
    field: 'voucherType',
  },
  {
    title: '税率',
    field: 'taxRate',
  },
  {
    title: '总含税金额',
    field: 'totalTaxAmount',
  },
  {
    title: '折扣率',
    field: 'discountRate',
  },
  {
    title: '总折扣金额',
    field: 'totalDiscountAmount',
  },
  {
    title: '优惠',
    field: 'favourableAmount',
  },
  {
    title: '不含税金额',
    field: 'netAmount',
  },
  {
    title: '订单总金额',
    field: 'orderTotalAmount',
  },
  {
    title: '交货地址',
    field: 'deliveryAddress',
  },
  {
    title: '订单备注',
    field: 'orderRemark',
  },
  {
    title: '交付日期',
    field: 'deliveryDate',
  },
  {
    title: '结算方式(字典 settlement_type)',
    field: 'settlementMethod',
  },
  {
    title: '结算账户id',
    field: 'bankAccountId',
  },
  {
    title: '结算账户账号',
    field: 'settlementAccountNumber',
  },
  {
    title: '预收金额',
    field: 'prepaymentAmount',
  },
  {
    title: '尾款金额',
    field: 'finalPaymentAmount',
  },
  {
    title: '运费金额',
    field: 'shippingFeeAmount',
  },
  {
    title: '运费承担方(字典 freight_bearer)',
    field: 'shippingFeeBearer',
  },
  {
    title: '是否进行mrp',
    field: 'isMrp',
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
    label: '销售订单编码',
    fieldName: 'orderCode',
    component: 'Input',
  },
  {
    label: '客户名称id',
    fieldName: 'customerId',
    component: 'Input',
  },
  {
    label: '订单状态(字典 order_status)',
    fieldName: 'orderStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '部门id',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '销售人员',
    fieldName: 'salesPersonId',
    component: 'Input',
  },
  {
    label: '订单来源',
    fieldName: 'orderSource',
    component: 'Input',
  },
  {
    label: '是否开票(字典 sys_yes_no)',
    fieldName: 'isInvoice',
    component: 'Input',
  },
  {
    label: '票据类型(字典 voucher_type)',
    fieldName: 'voucherType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '税率',
    fieldName: 'taxRate',
    component: 'Input',
  },
  {
    label: '总含税金额',
    fieldName: 'totalTaxAmount',
    component: 'Input',
  },
  {
    label: '折扣率',
    fieldName: 'discountRate',
    component: 'Input',
  },
  {
    label: '总折扣金额',
    fieldName: 'totalDiscountAmount',
    component: 'Input',
  },
  {
    label: '优惠',
    fieldName: 'favourableAmount',
    component: 'Input',
  },
  {
    label: '不含税金额',
    fieldName: 'netAmount',
    component: 'Input',
  },
  {
    label: '订单总金额',
    fieldName: 'orderTotalAmount',
    component: 'Input',
  },
  {
    label: '交货地址',
    fieldName: 'deliveryAddress',
    component: 'Input',
  },
  {
    label: '订单备注',
    fieldName: 'orderRemark',
    component: 'Input',
  },
  {
    label: '交付日期',
    fieldName: 'deliveryDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '结算方式(字典 settlement_type)',
    fieldName: 'settlementMethod',
    component: 'Input',
  },
  {
    label: '结算账户id',
    fieldName: 'bankAccountId',
    component: 'Input',
  },
  {
    label: '结算账户账号',
    fieldName: 'settlementAccountNumber',
    component: 'Input',
  },
  {
    label: '预收金额',
    fieldName: 'prepaymentAmount',
    component: 'Input',
  },
  {
    label: '尾款金额',
    fieldName: 'finalPaymentAmount',
    component: 'Input',
  },
  {
    label: '运费金额',
    fieldName: 'shippingFeeAmount',
    component: 'Input',
  },
  {
    label: '运费承担方(字典 freight_bearer)',
    fieldName: 'shippingFeeBearer',
    component: 'Input',
  },
  {
    label: '是否进行mrp',
    fieldName: 'isMrp',
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
