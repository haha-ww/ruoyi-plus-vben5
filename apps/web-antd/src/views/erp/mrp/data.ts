import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const modeOptions = [
  { label: '手动输入', value: 'manual' },
  { label: '销售订单', value: 'salesOrder' },
  { label: '生产计划', value: 'productionPlan' },
];

export const generateTypeOptions = [
  { label: '采购订单', value: 'purchase' },
  { label: '生产计划', value: 'production' },
  { label: '全部生成', value: 'all' },
];

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'batchNo',
    label: '批次号',
  },
  {
    component: 'Select',
    componentProps: {
      options: modeOptions,
    },
    fieldName: 'mode',
    label: '运算模式',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('common_status'),
    },
    fieldName: 'status',
    label: '状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50 },
  { title: '批次号', field: 'batchNo', minWidth: 180 },
  {
    title: '运算模式',
    field: 'mode',
    width: 100,
    formatter: ({ cellValue }) => {
      return modeOptions.find((o) => o.value === cellValue)?.label ?? cellValue;
    },
  },
  {
    title: '状态',
    field: 'status',
    width: 90,
    slots: { default: 'status' },
  },
  {
    title: '运算时间',
    field: 'calculateTime',
    width: 170,
  },
  {
    title: '物料种类',
    field: 'totalMaterialCount',
    width: 100,
    align: 'center',
  },
  {
    title: '采购建议',
    field: 'purchaseSuggestCount',
    width: 100,
    align: 'center',
  },
  {
    title: '生产建议',
    field: 'productionSuggestCount',
    width: 100,
    align: 'center',
  },
  {
    title: '采购订单',
    field: 'purchaseOrderCount',
    width: 100,
    align: 'center',
  },
  {
    title: '生产计划',
    field: 'productionPlanCount',
    width: 100,
    align: 'center',
  },
  { title: '操作人', field: 'operator', width: 100 },
  { title: '备注', field: 'remark', minWidth: 150 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 220,
  },
];

export const resultColumns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50 },
  { title: '物料编码', field: 'materialCode', width: 130 },
  { title: '物料名称', field: 'materialName', minWidth: 150 },
  { title: '规格型号', field: 'model', width: 120 },
  { title: '单位', field: 'unitName', width: 70, align: 'center' },
  {
    title: '物料类型',
    field: 'materialType',
    width: 90,
    formatter: ({ cellValue }) => {
      const map: Record<string, string> = {
        finished: '成品',
        raw: '原料',
        accessory: '辅料',
      };
      return map[cellValue] ?? cellValue;
    },
  },
  { title: '需求数量', field: 'requiredQty', width: 100, align: 'right' },
  { title: '当前库存', field: 'currentStock', width: 100, align: 'right' },
  { title: '可用库存', field: 'availableStock', width: 100, align: 'right' },
  { title: '采购在途', field: 'purchaseOnWay', width: 100, align: 'right' },
  { title: '生产在制', field: 'productionOnWay', width: 100, align: 'right' },
  { title: '净需求', field: 'netDemand', width: 100, align: 'right' },
  {
    title: '建议采购数量',
    field: 'suggestPurchaseQty',
    width: 120,
    align: 'right',
    slots: { default: 'suggestPurchaseQty' },
  },
  {
    title: '建议生产数量',
    field: 'suggestProductionQty',
    width: 120,
    align: 'right',
    slots: { default: 'suggestProductionQty' },
  },
  { title: '建议采购日期', field: 'suggestPurchaseDate', width: 120 },
  { title: '建议生产日期', field: 'suggestProductionDate', width: 120 },
  {
    title: '供应方式',
    field: 'supplyMode',
    width: 90,
    formatter: ({ cellValue }) => {
      const map: Record<string, string> = {
        purchase: '采购',
        production: '生产',
        inventory: '库存',
      };
      return map[cellValue] ?? cellValue;
    },
  },
  { title: '供应商', field: 'supplierName', width: 130 },
  { title: '需求来源', field: 'demandSource', width: 100 },
  { title: '来源单号', field: 'demandSourceCode', width: 160 },
];
