import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listMaterialSelect } from '#/api/wcommon';

const materialOptions = ref<any[]>([]);
listMaterialSelect().then((res) => {
  materialOptions.value = res || [];
});

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderCode',
    label: '销售订单号',
  },
  {
    component: 'Select',
    fieldName: 'materialId',
    label: '物料名称',
    componentProps: {
      allowClear: true,
      options: materialOptions,
      fieldNames: { label: 'materialName', value: 'id' },
      showSearch: true,
      optionFilterProp: 'materialName',
    },
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50 },
  {
    title: '销售订单号',
    field: 'orderCode',
  },
  {
    title: '客户名称',
    field: 'customerName',
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
    title: '订单数量',
    field: 'quantity',
  },
  {
    title: '要求交货日期',
    field: 'requiredDeliveryDate',
  },
  {
    title: '备注',
    field: 'remark',
  },
];
