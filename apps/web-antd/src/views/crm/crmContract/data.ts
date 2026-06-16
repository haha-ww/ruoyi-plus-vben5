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
    fieldName: 'contractName',
    label: '合同名称',
  },
  {
    component: 'Input',
    fieldName: 'contractNo',
    label: '订单编号',
  },
  {
    component: 'Input',
    fieldName: 'contractPrice',
    label: '合同金额(元)',
  },
  {
    component: 'Input',
    fieldName: 'received',
    label: '回款金额',
  },
  {
    component: 'Input',
    fieldName: 'surplus',
    label: '尾款金额',
  },
  {
    component: 'Input',
    fieldName: 'contractFollowed',
    label: '是否关注',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CONTRACT_STATUS 便于维护
      options: getDictOptions('contract_status'),
    },
    fieldName: 'contractStatus',
    label: '合同状态',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'startDate',
    label: '开始时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endDate',
    label: '结束时间',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'signingStatus',
    label: '签约状态',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CONTRACT_TYPE 便于维护
      options: getDictOptions('contract_type'),
    },
    fieldName: 'contractCategory',
    label: '合同分类',
  },
  {
    component: 'Input',
    fieldName: 'isAbnormal',
    label: '是否异常：1、是；0、否；',
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
    title: '客户ID',
    field: 'customerId',
  },
  {
    title: '合同名称',
    field: 'contractName',
  },
  {
    title: '订单编号',
    field: 'contractNo',
  },
  {
    title: '合同金额(元)',
    field: 'contractPrice',
  },
  {
    title: '回款金额',
    field: 'received',
  },
  {
    title: '尾款金额',
    field: 'surplus',
  },
  {
    title: '是否关注',
    field: 'contractFollowed',
  },
  {
    title: '合同状态',
    field: 'contractStatus',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CONTRACT_STATUS 便于维护
        return renderDict(row.contractStatus, 'contract_status');
      },
    },
  },
  {
    title: '开始时间',
    field: 'startDate',
  },
  {
    title: '结束时间',
    field: 'endDate',
  },
  {
    title: '签约状态',
    field: 'signingStatus',
  },
  {
    title: '合同分类',
    field: 'contractCategory',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CONTRACT_TYPE 便于维护
        return renderDict(row.contractCategory, 'contract_type');
      },
    },
  },
  {
    title: '是否异常：1、是；0、否；',
    field: 'isAbnormal',
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

