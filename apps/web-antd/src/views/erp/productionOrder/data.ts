import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import {ref} from 'vue'

import {listMaterialSelect} from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

/**
 * 查询物料下拉列表
 */
const materialOptions = ref<any[]>([]);
listMaterialSelect().then((res) => {
  materialOptions.value = res || [];
});

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'orderCode',
    label: '生产订单编码',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PRODUCTION_TYPE 便于维护
      options: getDictOptions('production_type'),
    },
    fieldName: 'productionType',
    label: '生产类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('production_order_status'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'orderStatus',
    label: '订单状态',
  },
  {
    component: 'Select',
    componentProps: {
      options: materialOptions,
      fieldNames: {
        label: 'materialName',
        value: 'id',
      },
    },
    fieldName: 'materialId',
    label: '物料名称',
  },
  {
    component: 'Input',
    fieldName: 'planCode',
    label: '生产计划单号',
  },
  {
    component: 'Input',
    fieldName: 'salesOrderCode',
    label: '销售订单编码',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '生产订单编码',
    field: 'orderCode',
  },
  
  {
    title: '物料名称',
    field: 'materialName',
  },
  {
    title: '生产计划单号',
    field: 'planCode',
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
    title: '是否已领料',
    field: 'isPick',
  },
  {
    title: '订单状态',
    field: 'orderStatus',
    slots: {
      default: ({ row }) => {
        return renderDict(row.orderStatus, 'production_order_status');
      },
    },
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

