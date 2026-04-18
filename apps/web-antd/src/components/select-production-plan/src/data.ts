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
    fieldName: 'planCode',
    label: '计划单号',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderCode',
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
      optionFilterProp: 'label',
    },
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'radio', width: 50 },
  {
    title: '计划单号',
    field: 'planCode',
  },
  {
    title: '销售订单号',
    field: 'salesOrderCode',
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
    title: '计划数量',
    field: 'planQty',
  },
  {
    title: 'BOM版本',
    field: 'bomVersion',
  },
  {
    title: '计划开始',
    field: 'planStartTime',
  },
  {
    title: '计划结束',
    field: 'planEndTime',
  },
];
