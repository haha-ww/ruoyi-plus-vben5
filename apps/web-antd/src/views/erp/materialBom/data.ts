import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { listMaterialSelect } from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

getMaterialOptions()
/**
 * 查询物料下拉列表
 */
const materialOptions = ref<any[]>([]);
/**
 * 查询物料下拉列表
 */
async function getMaterialOptions() {
  const res = await listMaterialSelect();
  res.forEach((item) => {
    item.disabled = null
  });
  materialOptions.value = res || [];
}
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'bomName',
    label: 'bom名称',
  },
  {
    component: 'Input',
    fieldName: 'bomCode',
    label: 'bom编码',
  },
  {
    component: 'Select',
    fieldName: 'materialId',
    label: '物料名称',
    componentProps:{
      options: materialOptions,
      fieldNames: { label: 'materialName', value: 'id' },
    }
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
      options: getDictOptions('sys_normal_disable'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.BOM_TYPE 便于维护
      options: getDictOptions('bom_type'),
    },
    fieldName: 'bomType',
    label: 'bom类型',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'bom名称',
    field: 'bomName',
  },
  {
    title: 'bom编码',
    field: 'bomCode',
  },
  {
    title: 'bom版本',
    field: 'version',
  },
  {
    title: '物料名称',
    field: 'materialName',
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_NORMAL_DISABLE 便于维护
        return renderDict(row.status, 'sys_normal_disable');
      },
    },
  },
  {
    title: 'bom类型',
    field: 'bomType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.BOM_TYPE 便于维护
        return renderDict(row.bomType, 'bom_type');
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
    width: 300,
  },
];

