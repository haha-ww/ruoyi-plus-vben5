import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import {
  listCustomerSelect,
  listMaterialSelect,
  listSupplierSelect,
  listWarehouseSelect,
} from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'transactionNo',
    label: '业务单据号',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'transactionDate',
    label: '单据日期',
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        { label: '入库单', value: 1 },
        { label: '出库单', value: 2 },
      ],
    },
    fieldName: 'type',
    label: '单据类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('transaction_type'),
    },
    fieldName: 'subType',
    label: '事务类型',
  },
  {
    component: 'ApiSelect',
    componentProps: {
      api: listWarehouseSelect,
      fieldNames: {
        label: 'warehouseName',
        value: 'id',
      },
      showSearch: true,
      optionFilterProp: 'warehouseName',
    },
    fieldName: 'warehouseId',
    label: '仓库',
  },
  {
    component: 'ApiSelect',
    componentProps: {
      api: listCustomerSelect,
      fieldNames: {
        label: 'customerName',
        value: 'id',
      },
      showSearch: true,
      optionFilterProp: 'customerName',
    },
    fieldName: 'customerId',
    label: '客户',
  },
  {
    component: 'ApiSelect',
    componentProps: {
      api: listSupplierSelect,
      fieldNames: {
        label: 'supplierName',
        value: 'id',
      },
      showSearch: true,
      optionFilterProp: 'supplierName',
    },
    fieldName: 'supplierId',
    label: '供应商',
  },
  {
    component: 'ApiSelect',
    componentProps: {
      api: listMaterialSelect,
      fieldNames: {
        label: 'materialName',
        value: 'id',
      },
      showSearch: true,
      optionFilterProp: 'materialName',
    },
    fieldName: 'materialId',
    label: '物料',
  },
  {
    component: 'Input',
    fieldName: 'batchNo',
    label: '批次号',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  {
    title: '业务单据号',
    field: 'transactionNo',
  },
  {
    title: '单据日期',
    field: 'transactionDate',
  },
  {
    title: '单据类型',
    field: 'type',
  },
  {
    title: '事务类型',
    field: 'subType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SALES_ORDER_STATUS 便于维护
        return renderDict(row.subType, 'transaction_type');
      },
    },
  },
  {
    title: '仓库',
    field: 'warehouseName',
  },
  {
    title: '客户',
    field: 'customerName',
  },
  {
    title: '供应商',
    field: 'supplierName',
  },
  {
    title: '物料名称',
    field: 'materialName',
  },
  {
    title: '批次号',
    field: 'batchNo',
  },
  {
    title: '变动数量',
    field: 'quantity',
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
    label: '事务ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '事务单号(业务单据号)',
    fieldName: 'transactionNo',
    component: 'Input',
  },
  {
    label: '单据日期',
    fieldName: 'transactionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '单据类型：1-入库单，2-出库单',
    fieldName: 'type',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '事务类型(字典 transaction_type)',
    fieldName: 'subType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '关联仓库ID',
    fieldName: 'warehouseId',
    component: 'Input',
  },
  {
    label: '业务伙伴ID',
    fieldName: 'businessPartnerId',
    component: 'Input',
  },
  {
    label: '物料ID',
    fieldName: 'materialId',
    component: 'Input',
  },
  {
    label: '批次号',
    fieldName: 'batchNo',
    component: 'Input',
  },
  {
    label: '变动数量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
