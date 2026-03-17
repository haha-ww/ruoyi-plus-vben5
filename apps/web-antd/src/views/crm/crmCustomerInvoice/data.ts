import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'serialNumber',
    label: '发票流水号',
  },
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户ID',
  },
  {
    component: 'Input',
    fieldName: 'contractId',
    label: '合同ID',
  },
  {
    component: 'Input',
    fieldName: 'categoryId',
    label: '发票类目ID',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '发票名称',
  },
  {
    component: 'Input',
    fieldName: 'num',
    label: '发票编号',
  },
  {
    component: 'Input',
    fieldName: 'price',
    label: '合同金额',
  },
  {
    component: 'Input',
    fieldName: 'amount',
    label: '发票金额',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.INVOICE_TYPE 便于维护
      options: getDictOptions('invoice_type'),
    },
    fieldName: 'types',
    label: '发票类型',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '发票抬头',
  },
  {
    component: 'Input',
    fieldName: 'ident',
    label: '纳税人识别号',
  },
  {
    component: 'Input',
    fieldName: 'bank',
    label: '开户行',
  },
  {
    component: 'Input',
    fieldName: 'account',
    label: '开户账号',
  },
  {
    component: 'Input',
    fieldName: 'address',
    label: '开票地址',
  },
  {
    component: 'Input',
    fieldName: 'tel',
    label: '电话',
  },
  {
    component: 'Input',
    fieldName: 'collectName',
    label: '邮寄联系人',
  },
  {
    component: 'Input',
    fieldName: 'collectTel',
    label: '邮寄联系电话',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'collectType',
    label: '邮寄方式',
  },
  {
    component: 'Input',
    fieldName: 'collectEmail',
    label: '邮寄邮箱',
  },
  {
    component: 'Input',
    fieldName: 'mailAddress',
    label: '邮寄地址',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'invoiceType',
    label: '开票方式',
  },
  {
    component: 'Input',
    fieldName: 'invoiceAddress',
    label: '开票地址',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.INVOICE_STATUS 便于维护
      options: getDictOptions('invoice_status'),
    },
    fieldName: 'status',
    label:
      '发票状态 -1：开票撤回；0：待开票；1：已开票；2:已拒绝；3：申请作废；4:同意作废；5：拒绝作废；6：作废撤回；',
  },
  {
    component: 'Input',
    fieldName: 'invalid',
    label: '作废状态: 0，默认；-1，撤回；1，待审核；2，审核通过；3，审核未通过',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'billDate',
    label: '开票日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'realDate',
    label: '实际开票日期',
  },
  {
    component: 'Textarea',
    fieldName: 'mark',
    label: '备注内容',
  },
  {
    component: 'Input',
    fieldName: 'cardRemark',
    label: '业务员备注',
  },
  {
    component: 'Input',
    fieldName: 'financeRemark',
    label: '财务备注',
  },
  {
    component: 'Input',
    fieldName: 'linkId',
    label: '关联审批ID',
  },
  {
    component: 'Input',
    fieldName: 'revokeId',
    label: '撤销申请ID',
  },
  {
    component: 'Input',
    fieldName: 'linkBill',
    label: '关联付款单ID',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '自增id',
    field: 'id',
    visible: false,
  },
  {
    title: '发票名称',
    field: 'name',
  },
  {
    title: '发票金额',
    field: 'amount',
  },
  {
    title: '发票类型',
    field: 'types',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.INVOICE_TYPE 便于维护
        return renderDict(row.types, 'invoice_type');
      },
    },
  },
  {
    title: '发票抬头',
    field: 'title',
  },
  {
    title: '开票方式',
    field: 'invoiceType',
  },
  {
    title: '发票状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.INVOICE_STATUS 便于维护
        return renderDict(row.status, 'invoice_status');
      },
    },
  },
  {
    title: '开票日期',
    field: 'billDate',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
