import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { deptTreeSelect } from '#/api/system/user';
import { liststaffSelect } from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

const deptTreeData = ref<any[]>([]);
const staffOptions = ref<any[]>([]);

async function loadDeptTree() {
  try {
    deptTreeData.value = await deptTreeSelect();
    console.log('deptTreeData:', deptTreeData.value);
  } catch (error) {
    console.error('加载部门树失败:', error);
  }
}

async function loadStaffOptions(deptId?: number | string) {
  try {
    staffOptions.value = await liststaffSelect({ deptId });
  } catch (error) {
    console.error('加载员工列表失败:', error);
  }
}

// 初始化加载数据
loadDeptTree();
loadStaffOptions();
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'outboundOrderCode',
    label: '领料单号',
  },
  {
    component: 'TreeSelect',
    fieldName: 'deptId',
    label: '领料部门',
    componentProps: {
      treeData: deptTreeData,
      showSearch: true,
      placeholder: '请选择领料部门',
      fieldNames: {
        label: 'label',
        value: 'id',
      },
    },
  },
  {
    component: 'Select',
    fieldName: 'picker',
    label: '领料人',
    componentProps: {
      options: staffOptions,
      placeholder: '请选择领料人',
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
  },
  
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'outboundDate',
    label: '出库日期',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      options: getDictOptions('picking_status'),
    },
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '领料单号',
    field: 'outboundOrderCode',
  },
  {
    title: '领料人',
    field: 'pickerName',
  },
  {
    title: '领料部门',
    field: 'deptName',
  },
  {
    title: '出库日期',
    field: 'outboundDate',
  },
  {
    title: '状态',
    field: 'status',
    slots: {
          default: ({ row }) => {
            // 可选从DictEnum中获取 DictEnum.BOM_TYPE 便于维护
            return renderDict(row.status, 'picking_status');
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
    label: '主键id',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '领料出库单号',
    fieldName: 'outboundOrderCode',
    component: 'Input',
  },
  {
    label: '领料人',
    fieldName: 'picker',
    component: 'Input',
  },
  {
    label: '领料部门',
    fieldName: 'deptId',
    component: 'Input',
  },
  {
    label: '出库日期',
    fieldName: 'outboundDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '是否出库',
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
    component: 'Input',
  },
];
