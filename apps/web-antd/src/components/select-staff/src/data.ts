import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { getDeptTree } from '#/api/system/user';
import { renderDict } from '#/utils/render';
/**
 * 初始化部门选择
 */
setupDeptSelect();
const deptData = ref<DeptTree[]>([]);
async function setupDeptSelect() {
  // updateSchema
  const deptTree = await getDeptTree();
  deptData.value = deptTree;
}
export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '姓名',
  },
  {
    component: 'Input',
    fieldName: 'jobNumber',
    label: '工号',
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: '手机号',
  },
  {
    component: 'TreeSelect',
    componentProps: {
      treeData: deptData,
      showSearch: true,
      treeNodeFilterProp: 'label',
      treeLine: { showLeafIcon: false },
      fieldNames: {
        label: 'label',
        key: 'id',
        value: 'id',
      },
    },
    fieldName: 'deptId',
    label: '部门',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键',
    field: 'id',
    visible: false,
  },
  {
    title: '姓名',
    field: 'name',
  },
  {
    title: '工号',
    field: 'jobNumber',
  },
  {
    title: '手机号',
    field: 'phone',
  },
  {
    title: '用户性别',
    field: 'sex',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SEX_TYPE 便于维护
        if (!row.sex) {
          return '';
        }
        return renderDict(row.sex, 'sys_user_sex');
      },
    },
  },
  {
    title: '部门',
    field: 'deptName',
  },
];
