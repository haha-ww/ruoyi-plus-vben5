import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listCustomerSelect } from '#/api/wcommon';
import { renderDict } from '#/utils/render';

const customerOptions = ref<any[]>([]);
listCustomerSelect().then((res) => {
  customerOptions.value = res || [];
});

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderCode',
    label: '销售订单号',
    labelWidth: 90,
  },
  {
    component: 'Select',
    componentProps: {
      options: customerOptions,
      fieldNames: {
        label: 'customerName',
        value: 'id',
      },
    },
    fieldName: 'customerId',
    label: '客户名称',
    labelWidth: 90,
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'radio', width: 60 },
  {
    title: '主键',
    field: 'id',
    visible: false,
  },
  {
    title: '销售订单号',
    field: 'orderCode',
  },
  {
    title: '客户名称',
    field: 'customerName',
  },
  {
    title: '订单总金额',
    field: 'orderTotalAmount',
  },
  {
    title: '交付日期',
    field: 'deliveryDate',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
    slots: {
      default: ({ row }) => {
        return renderDict(row.orderStatus, 'sales_order_status');
      },
    },
  },
];
