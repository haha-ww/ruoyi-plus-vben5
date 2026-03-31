import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderCode',
    label: '生产订单编码',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'productionType',
    label: '生产类型(字典 production_type)',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '工厂/车间',
  },
  {
    component: 'Input',
    fieldName: 'productionManager',
    label: '生产负责人',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'orderStatus',
    label: '订单状态',
  },
  {
    component: 'Input',
    fieldName: 'materialId',
    label: '物料id',
  },
  {
    component: 'Input',
    fieldName: 'bomVersion',
    label: 'bom版本号',
  },
  {
    component: 'Input',
    fieldName: 'planId',
    label: '生产计划id',
  },
  {
    component: 'Input',
    fieldName: 'planCode',
    label: '生产计划单号',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderId',
    label: '销售订单id',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderCode',
    label: '销售订单编码',
  },
  {
    component: 'Input',
    fieldName: 'orderQuantity',
    label: '生产数量',
  },
  {
    component: 'Input',
    fieldName: 'remainQuantity',
    label: '剩余质检数量',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderQuantity',
    label: '销售订单数量',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'requiredDeliveryDate',
    label: '要求交货日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'actualStartDate',
    label: '实际开工日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'plannedCompletionDate',
    label: '计划完成日期',
  },
  {
    component: 'Input',
    fieldName: 'isPick',
    label: '是否已领料',
  },
  {
    component: 'Input',
    fieldName: 'progress',
    label: '生产进度',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'orderDate',
    label: '单据日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'cancelDate',
    label: '作废日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键ID',
    field: 'id',
  },
  {
    title: '生产订单编码',
    field: 'orderCode',
  },
  {
    title: '生产类型(字典 production_type)',
    field: 'productionType',
  },
  {
    title: '工厂/车间',
    field: 'deptId',
  },
  {
    title: '生产负责人',
    field: 'productionManager',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
  },
  {
    title: '物料id',
    field: 'materialId',
  },
  {
    title: 'bom版本号',
    field: 'bomVersion',
  },
  {
    title: '生产计划id',
    field: 'planId',
  },
  {
    title: '生产计划单号',
    field: 'planCode',
  },
  {
    title: '销售订单id',
    field: 'salesOrderId',
  },
  {
    title: '销售订单编码',
    field: 'salesOrderCode',
  },
  {
    title: '生产数量',
    field: 'orderQuantity',
  },
  {
    title: '剩余质检数量',
    field: 'remainQuantity',
  },
  {
    title: '销售订单数量',
    field: 'salesOrderQuantity',
  },
  {
    title: '要求交货日期',
    field: 'requiredDeliveryDate',
  },
  {
    title: '实际开工日期',
    field: 'actualStartDate',
  },
  {
    title: '计划完成日期',
    field: 'plannedCompletionDate',
  },
  {
    title: '是否已领料',
    field: 'isPick',
  },
  {
    title: '生产进度',
    field: 'progress',
  },
  {
    title: '单据日期',
    field: 'orderDate',
  },
  {
    title: '作废日期',
    field: 'cancelDate',
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
    label: '主键ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '生产订单编码',
    fieldName: 'orderCode',
    component: 'Input',
  },
  {
    label: '生产类型(字典 production_type)',
    fieldName: 'productionType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '工厂/车间',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '生产负责人',
    fieldName: 'productionManager',
    component: 'Input',
  },
  {
    label: '订单状态',
    fieldName: 'orderStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '物料id',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: 'bom版本号',
    fieldName: 'bomVersion',
    component: 'Input',
  },
  {
    label: '生产计划id',
    fieldName: 'planId',
    component: 'Input',
  },
  {
    label: '生产计划单号',
    fieldName: 'planCode',
    component: 'Input',
  },
  {
    label: '销售订单id',
    fieldName: 'salesOrderId',
    component: 'Input',
  },
  {
    label: '销售订单编码',
    fieldName: 'salesOrderCode',
    component: 'Input',
  },
  {
    label: '生产数量',
    fieldName: 'orderQuantity',
    component: 'Input',
  },
  {
    label: '剩余质检数量',
    fieldName: 'remainQuantity',
    component: 'Input',
  },
  {
    label: '销售订单数量',
    fieldName: 'salesOrderQuantity',
    component: 'Input',
  },
  {
    label: '要求交货日期',
    fieldName: 'requiredDeliveryDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '实际开工日期',
    fieldName: 'actualStartDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '计划完成日期',
    fieldName: 'plannedCompletionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '是否已领料',
    fieldName: 'isPick',
    component: 'Input',
  },
  {
    label: '生产进度',
    fieldName: 'progress',
    component: 'Input',
  },
  {
    label: '单据日期',
    fieldName: 'orderDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '作废日期',
    fieldName: 'cancelDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
