import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listMaterialSelect } from '#/api/wcommon';
import { renderDict } from '#/utils/render';


const materialOptions = ref<any[]>([]);
listMaterialSelect().then((res) => {
  materialOptions.value = res || [];
});
/**
 * bom选择-查询表单
 * 搜索条件：bom名称、bom编码、物料名称（下拉 -> materialId）
 */
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'bomName',
    label: 'bom名称',
  },
  {
    component: 'Input',
    fieldName: 'bomCode',
    label: 'bom编码',
  },
  {
    component: 'Select',
    fieldName: 'materialId',
    label: '物料名称',
    componentProps: {
      allowClear: true,
      options: materialOptions,
      fieldNames: {
        label: 'materialName',
        value: 'id',
      },
    },
  },
];

/**
 * bom选择-表格列
 */
export const columns: VxeGridProps['columns'] = [
  { type: 'radio', width: 60 },
  {
    title: '主键',
    field: 'id',
    visible: false,
  },
  {
    title: 'bom名称',
    field: 'bomName',
  },
  {
    title: 'bom编码',
    field: 'bomCode',
  },
  {
    title: 'bom版本',
    field: 'version',
  },
  {
    title: '物料名称',
    field: 'materialName',
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        if (row.status === undefined || row.status === null) {
          return '';
        }
        return renderDict(row.status, 'sys_normal_disable');
      },
    },
  },
  {
    title: 'bom类型',
    field: 'bomType',
    slots: {
      default: ({ row }) => {
        if (!row.bomType) {
          return '';
        }
        return renderDict(row.bomType, 'bom_type');
      },
    },
  },
  {
    title: '生效日期',
    field: 'effectiveDate',
  },
  {
    title: '失效日期',
    field: 'expiryDate',
  },
];

