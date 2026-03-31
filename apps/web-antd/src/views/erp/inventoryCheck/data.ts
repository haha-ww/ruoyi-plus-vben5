import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'checkCode',
    label: '盘点单编码',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'startDate',
    label: '盘点开始日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endDate',
    label: '盘点结束日期',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'checkType',
    label: '盘点类型',
  },
  {
    component: 'Input',
    fieldName: 'warehouseId',
    label: '盘点仓库ID',
  },
  {
    component: 'Input',
    fieldName: 'includeToday',
    label: '是否包含当天的库存',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键id',
    field: 'id',
  },
  {
    title: '盘点单编码',
    field: 'checkCode',
  },
  {
    title: '盘点开始日期',
    field: 'startDate',
  },
  {
    title: '盘点结束日期',
    field: 'endDate',
  },
  {
    title: '盘点类型',
    field: 'checkType',
  },
  {
    title: '盘点仓库ID',
    field: 'warehouseId',
  },
  {
    title: '是否包含当天的库存',
    field: 'includeToday',
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

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '主键id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '盘点单编码',
    fieldName: 'checkCode',
    component: 'Input',
  },
  {
    label: '盘点开始日期',
    fieldName: 'startDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '盘点结束日期',
    fieldName: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '盘点类型',
    fieldName: 'checkType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '盘点仓库ID',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '是否包含当天的库存',
    fieldName: 'includeToday',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
