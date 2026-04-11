import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import {listToTree } from '@vben/utils';

import { listMaterialCategorySelect, listMaterialUnitSelect } from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';
/** 初始化分类下拉列表 */
categorySelect()
const categoryList = ref<any[]>([]);
 async function categorySelect () {
  const res = await listMaterialCategorySelect();
  const treeData = listToTree(res || [], { id: 'id', pid: 'parentId' });
 
  categoryList.value = treeData;
   console.log('treeData', categoryList.value);
};
/** 初始化计量单位下拉列表 */
unitSelect()
const unitList = ref<any[]>([]);
 async function unitSelect () {
  const res = await listMaterialUnitSelect();
  unitList.value = res || [];
};
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'TreeSelect',
    fieldName: 'categoryId',
    label: '物料分类',
    componentProps: {
      treeData: categoryList,
      showSearch: true,
      treeNodeFilterProp: 'label',
      treeLine: { showLeafIcon: false },
      fieldNames: {
        label: 'categoryName',
        key: 'id',
        value: 'id',
      },
    },
  },
  {
    component: 'Input',
    fieldName: 'materialCode',
    label: '物料编码',
  },
  {
    component: 'Input',
    fieldName: 'materialName',
    label: '物料名称',
  },
  {
    component: 'Select',
    componentProps: {
      options: unitList,
      fieldNames: { label: 'unitName', value: 'id' },
    },
    fieldName: 'unitId',
    label: '计量单位',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SUPPLY_TYPE 便于维护
      options: getDictOptions('supply_type'),
    },
    fieldName: 'supplyMode',
    label: '供应方式',
  },
  {
    component: 'Input',
    fieldName: 'drawingNumber',
    label: '图纸号',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
      options: getDictOptions('sys_normal_disable'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'disabled',
    label: '启用状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  
  {
    title: '物料名称',
    field: 'materialName',
  },
  {
    title: '物料编码',
    field: 'materialCode',
  },
  {
    title: '物料简称',
    field: 'materialShortName',
  },
  {
    title: '分类',
    field: 'categoryId',
    slots: {
      default: ({ row }) => {
        return row.categoryName || row.categoryId;
      },
    },
  },
  {
    title: '规格型号',
    field: 'model',
  },
  {
    title: '计量单位',
    field: 'unitName',
    slots: {
      default: ({ row }) => {
        return row.unitName || row.unitId;
      },
    },
  },
  {
    title: '图纸号',
    field: 'drawingNumber',
  },
  {
    title: '启用状态',
    field: 'disabled',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
        return renderDict(row.disabled, 'sys_normal_disable');
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

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '主键',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '分类',
    fieldName: 'categoryId',
    component: 'Select',
    componentProps: {
      options: async () => {
        const res = await listMaterialCategorySelect();
        return res.data || [];
      },
      fieldNames: { label: 'categoryName', value: 'id' },
    },
  },
  {
    label: '物料编码',
    fieldName: 'materialCode',
    component: 'Input',
  },
  {
    label: '物料名称',
    fieldName: 'materialName',
    component: 'Input',
  },
  {
    label: '物料简称',
    fieldName: 'materialShortName',
    component: 'Input',
  },
  {
    label: '规格型号',
    fieldName: 'model',
    component: 'Input',
  },
  {
    label: '计量单位',
    fieldName: 'unitId',
    component: 'Select',
    componentProps: {
      options: async () => {
        const res = await listMaterialUnitSelect();
        return res.data || [];
      },
      fieldNames: { label: 'unitName', value: 'id' },
    },
  },
  {
    label: '供应商id',
    fieldName: 'supplierId',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '成本计价方式',
    fieldName: 'costPricingType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '成本价格',
    fieldName: 'costPrice',
    component: 'Input',
  },
  {
    label: '供应方式(字典 supply_type)',
    fieldName: 'supplyMode',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SUPPLY_TYPE 便于维护
      options: getDictOptions('supply_type'),
    },
  },
  {
    label: '销售单价',
    fieldName: 'salesTaxPrice',
    component: 'Input',
  },
  {
    label: '销售单价',
    fieldName: 'salesPrice',
    component: 'Input',
  },
  {
    label: '采购单价',
    fieldName: 'purchasePrice',
    component: 'Input',
  },
  {
    label: '税率(字典 tax_rate)',
    fieldName: 'taxRate',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.TAX_RATE 便于维护
      options: getDictOptions('tax_rate'),
    },
  },
  {
    label: '图纸号',
    fieldName: 'drawingNumber',
    component: 'Input',
  },
  {
    label: '图纸ossid',
    fieldName: 'drawingOssid',
    component: 'FileUpload',
    /**
    * 注意这里获取为数组 需要自行定义回显/提交
    * 文件上传还在demo阶段 可能有重大改动!
    */
    componentProps: {
      // accept: 'application/pdf', // 可选拓展名或者mime类型 ,拼接
      // maxCount: 1, // 最大上传文件数 默认为1 为1会绑定为string而非string[]类型
    },
  },
  {
    label: '启用状态',
    fieldName: 'disabled',
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
      options: getDictOptions('sys_normal_disable'),
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
