import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '所属仓库ID',
  },
  {
    component: 'Input',
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
    },
    fieldName: 'locationType',
    label: '类型：1-区域 2-货架 3-货位 4-暂存区',
  },
  {
    component: 'Input',
    fieldName: 'fullPath',
    label: '完整路径编码',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
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
    title: '类型：1-区域 2-货架 3-货位 4-暂存区',
    field: 'locationType',
  },
  {
    title: '完整路径编码',
    field: 'fullPath',
  },
  {
    title: '启用状态',
    field: 'status',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '库位ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '所属仓库ID',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '父位置ID',
    fieldName: 'parentId',
    component: 'Input',
  },
  {
    label: '库位编码',
    fieldName: 'locationCode',
    component: 'Input',
  },
  {
    label: '库位名称',
    fieldName: 'locationName',
    component: 'Input',
  },
  {
    label: '类型：1-区域 2-货架 3-货位 4-暂存区',
    fieldName: 'locationType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '完整路径编码',
    fieldName: 'fullPath',
    component: 'Input',
  },
  {
    label: '启用状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
];
