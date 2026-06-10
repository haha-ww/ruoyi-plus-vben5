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
    label: '采购计划编码',
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
  { type: 'checkbox', width: 50 },
  {
    title: '采购计划编码',
    field: 'planCode',
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
    title: '计划采购数量',
    field: 'planQuantity',
  },
  {
    title: '剩余数量',
    field: 'remainQuantity',
  },
  {
    title: '备注',
    field: 'remark',
  },
];
