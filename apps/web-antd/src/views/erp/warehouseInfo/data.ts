import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'warehouseCode',
    label: '仓库编码',
  },
  {
    component: 'Input',
    fieldName: 'warehouseName',
    label: '仓库名称',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.WAREHOUSE_TYPE 便于维护
      options: getDictOptions('warehouse_type'),
    },
    fieldName: 'warehouseType',
    label: '仓库类型',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
      options: getDictOptions('sys_normal_disable'),
    },
    fieldName: 'status',
    label: '启用状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '仓库编码',
    field: 'warehouseCode',
  },
  {
    title: '仓库名称',
    field: 'warehouseName',
  },
  {
    title: '仓库类型',
    field: 'warehouseType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.WAREHOUSE_TYPE 便于维护
        return renderDict(row.warehouseType, 'warehouse_type');
      },
    },
  },
  {
    title: '仓库地址',
    field: 'location',
  },
  {
    title: '显示顺序',
    field: 'orderNum',
  },
  {
    title: '启用状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
        return renderDict(row.status, 'sys_normal_disable');
      },
    },
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

