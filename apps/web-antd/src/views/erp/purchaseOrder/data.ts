import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listSupplierSelect } from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

/**获取供应商下拉列表 */
const supplierOptions = ref<any[]>([]);
listSupplierSelect().then((res) => {
  supplierOptions.value = res || [];
});

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'purchaseCode',
    label: '采购订单编码',
    labelWidth: 100,
  },
  {
    component: 'Select',
    componentProps: {
      options: supplierOptions,
      fieldNames: {
        label: 'supplierName',
        value: 'id',
      },
    },
    fieldName: 'supplierId',
    label: '供应商名称',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('purchase_type'),
    },
    fieldName: 'purchaseType',
    label: '采购类型',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PURCHASE_ORDER_STATUS 便于维护
      options: getDictOptions('purchase_order_status'),
    },
    fieldName: 'orderStatus',
    label: '订单状态',
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
];


// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '采购订单编码',
    field: 'purchaseCode',
  },
  {
    title: '供应商名称',
    field: 'supplierName',
  },
  {
    title: '采购类型',
    field: 'purchaseType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.purchaseType, 'purchase_type');
      },
    },
  },
  {
    title: '部门名称',
    field: 'deptName',
  },
  {
    title: '采购人员',
    field: 'salespersonName',
  },
  {
    title: '订单总金额',
    field: 'orderTotalAmount',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.PURCHASE_ORDER_STATUS 便于维护
        return renderDict(row.orderStatus, 'purchase_order_status');
      },
    },
  },
  {
    title: '要求到货日期',
    field: 'requiredDeliveryDate',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];


