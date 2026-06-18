import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'warehouseId',
    label: '所属仓库ID',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'parentId',
    label: '父位置ID',
  },
  {
    component: 'Input',
    fieldName: 'locationCode',
    label: '库位编码',
  },
  {
    component: 'Input',
    fieldName: 'locationName',
    label: '库位名称',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.LOCATION_TYPE 便于维护
      options: getDictOptions('location_type'),
    },
    fieldName: 'locationType',
    label: '类型',
  },
  {
    component: 'Input',
    fieldName: 'fullPath',
    label: '完整路径编码',
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
    title: '库位ID',
    field: 'id',
  },
  {
    title: '所属仓库ID',
    field: 'warehouseId',
  },
  {
    title: '父位置ID',
    field: 'parentId',
  },
  {
    title: '库位编码',
    field: 'locationCode',
  },
  {
    title: '库位名称',
    field: 'locationName',
  },
  {
    title: '类型',
    field: 'locationType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.LOCATION_TYPE 便于维护
        return renderDict(row.locationType, 'location_type');
      },
    },
  },
  {
    title: '完整路径编码',
    field: 'fullPath',
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
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

