/** @jsxRuntime automatic */
/** @jsxImportSource vue */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'customerName',
    label: '客户名称',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'customerLabel',
    label: '客户标签',
  },
  {
    component: 'Input',
    fieldName: 'customerNo',
    label: '客户编号',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CUSTOMER_WAY 便于维护
      options: getDictOptions('customer_way'),
    },
    fieldName: 'customerWay',
    label: '客户来源',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CUSTOMER_STATUS 便于维护
      options: getDictOptions('customer_status'),
    },
    fieldName: 'customerStatus',
    label: '客户状态',
  },
  {
    component: 'Input',
    fieldName: 'areaCascade',
    label: '省市区',
  },
  {
    component: 'Input',
    fieldName: 'customerPhone',
    label: '客户电话',
  },
  {
    component: 'Input',
    fieldName: 'address',
    label: '详细地址',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
    visible: false,
  },
  {
    title: '客户名称',
    field: 'customerName',
  },
  {
    title: '客户电话',
    field: 'customerPhone',
  },
  {
    title: '客户来源',
    field: 'customerWay',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CUSTOMER_WAY 便于维护
        return renderDict(row.customerWay, 'customer_way');
      },
    },
  },
  {
    title: '退回次数',
    field: 'returnNum',
  },
  {
    title: '客户状态',
    field: 'customerStatus',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CUSTOMER_STATUS 便于维护
        return renderDict(row.customerStatus, 'customer_status');
      },
    },
  },

  {
    title: '详细地址',
    field: 'address',
  },
  {
    title: '最后跟进时间',
    field: 'lastFollowUpTime',
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
