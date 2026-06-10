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
    label: '生产订单号',
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
      optionFilterProp: 'label',
    },
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'radio', width: 50 },
  {
    title: '生产订单号',
    field: 'orderCode',
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
    title: '生产数量',
    field: 'orderQuantity',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
  },
  {
    title: '计划完成日期',
    field: 'plannedCompletionDate',
  },
  {
    title: '生产计划单号',
    field: 'planCode',
  },
  {
    title: '销售订单号',
    field: 'salesOrderCode',
  },
];
