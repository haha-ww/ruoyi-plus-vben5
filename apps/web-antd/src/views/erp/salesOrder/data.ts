import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listCustomerSelect } from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';


/**获取客户下拉列表 */
const customerOptions = ref<any[]>([]);
listCustomerSelect().then((res) => {
  customerOptions.value = res || [];
});
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderCode',
    label: '销售订单编码',
    labelWidth: 100,
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
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SALES_ORDER_STATUS 便于维护
      options: getDictOptions('sales_order_status'),
    },
    fieldName: 'orderStatus',
    label: '订单状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '销售订单编码',
    field: 'orderCode',
    width: 150,
  },
  {
    title: '客户名称',
    field: 'customerName',
  },
 
  {
    title: '部门名称',
    field: 'deptName',
  },
  {
    title: '销售人员',
    field: 'salesPersonName',
    width: 80,
  },
  {
    title: '订单来源',
    field: 'orderSource',
  },
  {
    title: '订单总金额',
    field: 'orderTotalAmount',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SALES_ORDER_STATUS 便于维护
        return renderDict(row.orderStatus, 'sales_order_status');
      },
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 220,
  },
];

