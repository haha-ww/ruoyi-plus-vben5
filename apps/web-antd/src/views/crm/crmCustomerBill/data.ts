import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
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
    fieldName: 'billCateId',
    label: '财务科目',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.BILL_TYPE 便于维护
      options: getDictOptions('bill_type'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'billTypes',
    label: '类型:1,支出;2,收入',
  },
  {
    component: 'Input',
    fieldName: 'invoiceId',
    label: '发票ID',
  },
  {
    component: 'Input',
    fieldName: 'num',
    label: '金额',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PAY_TYPE 便于维护
      options: getDictOptions('pay_type'),
    },
    fieldName: 'typeId',
    label: '支付方式ID',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'payType',
    label: '支付方式名称',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'date',
    label: '收款日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endDate',
    label: '续费结束日期',
  },
  {
    component: 'Input',
    fieldName: 'billNo',
    label: '付款单号',
  },
  {
    component: 'Input',
    fieldName: 'applyId',
    label: '关联申请审批ID',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.AUDIT_STATUS 便于维护
      options: getDictOptions('audit_status'),
    },
    fieldName: 'status',
    label: '类型：1，待审核；2，已通过；3，未通过',
  },
  {
    component: 'Input',
    fieldName: 'failMsg',
    label: '失败原因',
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
    title: '记录类型',
    field: 'billTypes',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.BILL_TYPE 便于维护
        return renderDict(row.billTypes, 'bill_type');
      },
    },
  },
  {
    title: '付款金额（元）',
    field: 'num',
  },
  {
    title: '备注',
    field: 'remark',
  },
  {
    title: '支付方式',
    field: 'typeId',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.PAY_TYPE 便于维护
        return renderDict(row.typeId, 'pay_type');
      },
    },
  },
  {
    title: '收款日期',
    field: 'date',
  },
  {
    title: '审核状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.AUDIT_STATUS 便于维护
        return renderDict(row.status, 'audit_status');
      },
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
