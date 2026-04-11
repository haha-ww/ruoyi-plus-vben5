import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { renderDict } from '#/utils/render';
/**
 * 物料选择-查询表单
 * 搜索条件：物料名称、物料编码
 */
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'materialName',
    label: '物料名称',
  },
  {
    component: 'Input',
    fieldName: 'materialCode',
    label: '物料编码',
  },
];

/**
 * 物料选择-表格列
 */
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键',
    field: 'id',
    visible: false,
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
    title: '物料简称',
    field: 'materialShortName',
  },
  {
    title: '规格型号',
    field: 'model',
  },
  {
    title: '计量单位',
    field: 'unitName',
    slots: {
      default: ({ row }) => {
        return row.unitName || row.unitId;
      },
    },
  },
  {
    title: '供应方式',
    field: 'supplyMode',
    slots: {
      default: ({ row }) => {
        return renderDict(row.supplyMode, 'supply_type');
      },
    },
  },
];

