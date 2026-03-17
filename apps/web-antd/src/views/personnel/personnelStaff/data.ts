import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { getDeptTree } from '#/api/system/user';
import { getDictOptions } from '#/utils/dict';
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
    component: 'Input',
    fieldName: 'idCard',
    label: '身份证号',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PERSON_STATUS 便于维护
      options: getDictOptions('sys_user_sex'),
    },
    fieldName: 'sex',
    label: '用户性别',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.DEGREE_TYPE 便于维护
      options: getDictOptions('degree_type'),
    },
    fieldName: 'degree',
    label: '学历',
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
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PERSON_TYPE 便于维护
      options: getDictOptions('person_type'),
    },
    fieldName: 'personType',
    label: '人员类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'entryDate',
    label: '入职日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'conversionDate',
    label: '转正日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'departureDate',
    label: '离职日期',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PERSON_STATUS 便于维护
      options: getDictOptions('person_status'),
    },
    fieldName: 'personStatus',
    label: '人员状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '姓名',
    field: 'name',
    width: 120,
  },
  {
    title: '工号',
    field: 'jobNumber',
    width: 120,
  },
  {
    title: '岗位',
    field: 'postName',
    width: 120,
  },
  {
    title: '部门',
    field: 'deptName',
    width: 120,
  },
  {
    title: '手机号',
    field: 'phone',
    width: 120,
  },
  {
    title: '出生日期',
    field: 'birthday',
    width: 120,
  },
  {
    title: '年龄',
    field: 'age',
    width: 80,
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
    title: '籍贯',
    field: 'nativePlace',
    width: 120,
  },
  {
    title: '现居住地址',
    field: 'address',
    width: 120,
  },
  {
    title: '学历',
    field: 'degree',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.DEGREE_TYPE 便于维护
        if (!row.degree) {
          return '';
        }
        return renderDict(row.degree, 'degree_type');
      },
    },
  },
  {
    title: '民族',
    field: 'nation',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.NATION_TYPE 便于维护
        if (!row.nation) {
          return '';
        }
        return renderDict(row.nation, 'nation_type');
      },
    },
  },
  {
    title: '政治面貌',
    field: 'politicalStatus',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.POLITICAL_STATUS 便于维护
        if (!row.politicalStatus) {
          return '';
        }
        return renderDict(row.politicalStatus, 'political_status');
      },
    },
  },
  {
    title: '婚姻状况',
    field: 'maritalStatus',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.MARITAL_STATUS 便于维护
        if (!row.maritalStatus) {
          return '';
        }
        return renderDict(row.maritalStatus, 'marital_status');
      },
    },
  },
  {
    title: '职称',
    field: 'title',
    width: 80,
  },
  {
    title: '人员类型',
    field: 'personType',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.PERSON_TYPE 便于维护
        return renderDict(row.personType, 'person_type');
      },
    },
  },
  {
    title: '人员状态',
    field: 'personStatus',
    width: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.PERSON_STATUS 便于维护
        return renderDict(row.personStatus, 'person_status');
      },
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
