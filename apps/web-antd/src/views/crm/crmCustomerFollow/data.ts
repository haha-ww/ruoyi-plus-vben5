import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'content',
    label: '内容',
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '说明',
          value: 0,
        },
        {
          label: '提醒',
          value: 1,
        },
      ],
    },

    fieldName: 'types',
    label: '类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'time',
    label: '提醒时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键id',
    field: 'id',
  },
  {
    title: '客户ID',
    field: 'customerId',
  },
  {
    title: '用户ID',
    field: 'userId',
  },
  {
    title: '说明内容',
    field: 'content',
  },
  {
    title: '类型：0，说明；1，提醒；',
    field: 'types',
  },
  {
    title: '提醒时间',
    field: 'time',
  },
  {
    title: '定时任务唯一值',
    field: 'uniqued',
  },
  {
    title: '状态：0、待处理；1、放弃；2、已完成；',
    field: 'status',
  },
  {
    title: '跟进版本',
    field: 'followVersion',
  },
  {
    title: '备注',
    field: 'remark',
  },
];
