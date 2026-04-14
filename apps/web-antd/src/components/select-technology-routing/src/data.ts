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
    fieldName: 'routingCode',
    label: '工艺路线编码',
  },
  {
    component: 'Input',
    fieldName: 'routingName',
    label: '工艺路线名称',
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
  { type: 'radio', width: 40 },
  {
    title: '工艺路线编码',
    field: 'routingCode',
  },
  {
    title: '工艺路线名称',
    field: 'routingName',
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
    title: '工艺描述',
    field: 'routingDescribe',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 80,
  },
];
