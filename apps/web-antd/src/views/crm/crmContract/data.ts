import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
  },
  {
    title: '合同名称',
    field: 'contractName',
  },
  {
    title: '合同金额(元)',
    field: 'contractPrice',
  },
  {
    title: '合同状态',
    field: 'contractStatus',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CONTRACT_STATUS 便于维护
        return renderDict(row.contractStatus, 'contract_status');
      },
    },
  },
  {
    title: '合同分类',
    field: 'contractCategory',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CONTRACT_TYPE 便于维护
        return renderDict(row.contractCategory, 'contract_type');
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
