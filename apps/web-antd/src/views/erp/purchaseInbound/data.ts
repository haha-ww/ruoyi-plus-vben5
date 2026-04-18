import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { liststaffSelect } from '#/api/wcommon';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'inboundCode',
    label: '采购入库单编码',
  },
  {
    component: 'ApiSelect',
    fieldName: 'warehouseManager',
    label: '库管员',
    componentProps: {
      api: liststaffSelect,
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      showSearch: true,
      optionFilterProp: 'name',
    },
  },
  {
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'inboundDateRange',
    label: '入库日期',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '采购入库单编码',
    field: 'inboundCode',
  },
  {
    title: '库管员',
    field: 'warehouseManagerName',
  },
  {
    title: '入库日期',
    field: 'inboundDate',
  },
  {
    title: '备注',
    field: 'remark',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
