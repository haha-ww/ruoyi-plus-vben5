import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import {ref} from 'vue'

import {listMaterialSelect} from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';
// 来源类型选项
export const sourceTypeOptions = [
  { label: '手动创建', value: '手动创建' },
  { label: '销售订单', value: '销售订单' },
];

// 优先级选项
export const priorityOptions = [
  { label: '紧急', value: '1' },
  { label: '高', value: '2' },
  { label: '中', value: '3' },
  { label: '低', value: '4' },
];

// 状态选项
export const statusOptions = [
  { label: '草稿', value: 10 },
  { label: '已下达', value: 20 },
  { label: '生产中', value: 30 },
  { label: '已完成', value: 40 },
  { label: '已关闭', value: 50 },
];

// 优先级颜色映射（甘特图用）
export const priorityColorMap: Record<string, string> = {
  '1': '#ff4d4f',
  '2': '#fa8c16',
  '3': '#1677ff',
  '4': '#52c41a',
};

// 状态颜色映射（甘特图用）
export const statusColorMap: Record<number, string> = {
  10: '#d9d9d9',
  20: '#1677ff',
  30: '#fa8c16',
  40: '#52c41a',
  50: '#f31313ff',
};
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
    fieldName: 'planCode',
    label: '计划单号',
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
    label: '产品名称',
  },
  {
    component: 'Select',
    componentProps: {
      options: sourceTypeOptions,
    },
    fieldName: 'sourceType',
    label: '来源类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: priorityOptions,
    },
    fieldName: 'priority',
    label: '优先级',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('production_plan_type'),
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'planTime',
    label: '计划时间',
  },
];

const priorityRender = (priority: string) => {
  const map: Record<string, { color: string; text: string }> = {
    '1': { color: 'red', text: '紧急' },
    '2': { color: 'orange', text: '高' },
    '3': { color: 'blue', text: '中' },
    '4': { color: 'green', text: '低' },
  };
  const item = map[priority];
  if (!item) return priority;
  return `<span style="color:${item.color};font-weight:500">${item.text}</span>`;
};

const statusRender = (status: number) => {
  const map: Record<number, { color: string; text: string }> = {
    10: { color: '#8c8c8c', text: '草稿' },
    20: { color: '#1677ff', text: '已下达' },
    30: { color: '#fa8c16', text: '生产中' },
    40: { color: '#52c41a', text: '已完成' },
    50: { color: '#8c8c8c', text: '已关闭' },
  };
  const item = map[status];
  if (!item) return String(status);
  return `<span style="display:inline-block;padding:0 8px;border-radius:10px;background:${item.color}20;color:${item.color};border:1px solid ${item.color}40">${item.text}</span>`;
};

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 50 },
  { title: '计划单号', field: 'planCode', minWidth: 160 },
  { title: '产品名称', field: 'materialName', minWidth: 150 },
  { title: '计划数量', field: 'planQty', width: 100, align: 'right' },
  { title: '完成数量', field: 'actualQty', width: 100, align: 'right' },
  {
    title: '完成率',
    field: 'actualQty1',
    width: 120,
    slots: { default: 'completionRate' },
  },
  { title: '计划开始', field: 'planStartTime', width: 160 },
  { title: '计划结束', field: 'planEndTime', width: 160 },
  {
    title: '来源类型',
    field: 'sourceType',
    width: 100,
    formatter: ({ cellValue }) => {
      return sourceTypeOptions.find((o) => o.value === cellValue)?.label ?? cellValue;
    },
  },
  {
    title: '优先级',
    field: 'priority',
    width: 80,
    slots: { default: 'priority' },
  },
  {
    title: '状态',
    field: 'status',
    width: 100,
    slots: { default: ({ row }) => {
            return renderDict(row.status, 'production_plan_type');
          }, },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 200,
  },
];
