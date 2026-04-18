import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listSupplierSelect } from '#/api/wcommon';

const supplierOptions = ref<any[]>([]);
listSupplierSelect().then((res) => {
  supplierOptions.value = res || [];
});

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'purchaseCode',
    label: '采购订单编码',
  },
  {
    component: 'Select',
    fieldName: 'supplierId',
    label: '供应商名称',
    componentProps: {
      allowClear: true,
      options: supplierOptions,
      fieldNames: { label: 'supplierName', value: 'id' },
      showSearch: true,
      optionFilterProp: 'label',
    },
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50 },
  {
    title: '采购订单编码',
    field: 'orderCode',
  },
  {
    title: '供应商名称',
    field: 'supplierName',
  },
  {
    title: '物料名称',
    field: 'materialName',
  },
  {
    title: '物料编码',
    field: 'materialCode',
  },
  {
    title: '规格型号',
    field: 'model',
  },
  {
    title: '物料单位',
    field: 'unitName',
  },
  {
    title: '采购数量',
    field: 'quantity',
  },
];
