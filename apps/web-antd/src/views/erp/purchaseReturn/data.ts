import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'returnCode',
    label: '采购退货编码',
  },
  {
    component: 'Input',
    fieldName: 'supplierId',
    label: '供应商id',
  },
  {
    component: 'Select',
    componentProps: {
    },
    fieldName: 'returnType',
    label: '退货类型',
  },
  {
    component: 'Input',
    fieldName: 'responsiblePerson',
    label: '退货负责人id',
  },
  {
    component: 'Input',
    fieldName: 'deliveryAddress',
    label: '收货地址',
  },
  {
    component: 'Input',
    fieldName: 'logisticsCompany',
    label: '物流公司',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'documentDate',
    label: '单据日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'id',
    field: 'id',
  },
  {
    title: '采购退货编码',
    field: 'returnCode',
  },
  {
    title: '供应商id',
    field: 'supplierId',
  },
  {
    title: '退货类型',
    field: 'returnType',
  },
  {
    title: '退货负责人id',
    field: 'responsiblePerson',
  },
  {
    title: '收货地址',
    field: 'deliveryAddress',
  },
  {
    title: '物流公司',
    field: 'logisticsCompany',
  },
  {
    title: '单据日期',
    field: 'documentDate',
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
    label: 'id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '采购退货编码',
    fieldName: 'returnCode',
    component: 'Input',
  },
  {
    label: '供应商id',
    fieldName: 'supplierId',
    component: 'Input',
  },
  {
    label: '退货类型',
    fieldName: 'returnType',
    component: 'Select',
    componentProps: {
    },
  },
  {
    label: '退货负责人id',
    fieldName: 'responsiblePerson',
    component: 'Input',
  },
  {
    label: '收货地址',
    fieldName: 'deliveryAddress',
    component: 'Input',
  },
  {
    label: '物流公司',
    fieldName: 'logisticsCompany',
    component: 'Input',
  },
  {
    label: '单据日期',
    fieldName: 'documentDate',
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
    component: 'Input',
  },
];
