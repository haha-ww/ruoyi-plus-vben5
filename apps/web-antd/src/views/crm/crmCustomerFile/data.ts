import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户id',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
    visible: false,
  },
  {
    title: '文件名',
    field: 'fileName',
  },
  {
    title: '文件地址',
    field: 'ossUrl',
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
    label: '',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '客户id',
    fieldName: 'customerId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '上传文件',
    fieldName: 'ossId',
    component: 'FileUpload',
    /**
     * 注意这里获取为数组 需要自行定义回显/提交
     * 文件上传还在demo阶段 可能有重大改动!
     */
    componentProps: {
      accept: 'xlsx,xls,doc,docx,jpg,png,pdf,ppt,zip', // 不支持type/*的写法 建议使用拓展名(不带.)
      maxCount: 1, // 最大上传文件数
      maxSize: 500,
      // resultField: 'url', // 上传成功后返回的字段名 默认url 可选['ossId', 'url', 'fileName']
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
  },
];
