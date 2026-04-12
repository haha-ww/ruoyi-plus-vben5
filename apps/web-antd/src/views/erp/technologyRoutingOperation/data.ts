import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'routingId',
    label: '所属工艺路线ID',
  },
  {
    component: 'Input',
    fieldName: 'operationId',
    label: '工序id',
  },
  {
    component: 'Input',
    fieldName: 'operationCode',
    label: '工序编码',
  },
  {
    component: 'Input',
    fieldName: 'operationName',
    label: '工序名称',
  },
  {
    component: 'Input',
    fieldName: 'sequence',
    label: '工序顺序',
  },
  {
    component: 'Input',
    fieldName: 'deptId',
    label: '工作中心ID',
  },
  {
    component: 'Input',
    fieldName: 'wage',
    label: '标准工价',
  },
  {
    component: 'Input',
    fieldName: 'waste',
    label: '废品工价',
  },
  {
    component: 'Input',
    fieldName: 'setupTime',
    label: '准备时间',
  },
  {
    component: 'Input',
    fieldName: 'runTime',
    label: '单件加工时间(小时)',
  },
  {
    component: 'Textarea',
    fieldName: 'memo',
    label: '工序说明',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '工序ID',
    field: 'id',
  },
  {
    title: '所属工艺路线ID',
    field: 'routingId',
  },
  {
    title: '工序id',
    field: 'operationId',
  },
  {
    title: '工序编码',
    field: 'operationCode',
  },
  {
    title: '工序名称',
    field: 'operationName',
  },
  {
    title: '工序顺序',
    field: 'sequence',
  },
  {
    title: '工作中心ID',
    field: 'deptId',
  },
  {
    title: '标准工价',
    field: 'wage',
  },
  {
    title: '废品工价',
    field: 'waste',
  },
  {
    title: '准备时间',
    field: 'setupTime',
  },
  {
    title: '单件加工时间(小时)',
    field: 'runTime',
  },
  {
    title: '工序说明',
    field: 'memo',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

