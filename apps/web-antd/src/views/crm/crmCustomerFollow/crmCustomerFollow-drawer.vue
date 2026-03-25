<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { CrmCustomerFollowForm } from '#/api/crm/crmCustomerFollow/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import {
  DatePicker,
  Form,
  FormItem,
  RadioButton,
  RadioGroup,
} from 'antdv-next';
import { pick } from 'lodash-es';

import {
  crmCustomerFollowAdd,
  crmCustomerFollowInfo,
  crmCustomerFollowUpdate,
} from '#/api/crm/crmCustomerFollow';
import { Tinymce } from '#/components/tinymce';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<CrmCustomerFollowForm> = {
  id: undefined,
  customerId: undefined,
  userId: undefined,
  content: undefined,
  types: undefined,
  time: undefined,
  uniqued: undefined,
  status: undefined,
  followVersion: undefined,
  remark: undefined,
};

/**
 * 表单数据ref
 */
const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<CrmCustomerFollowForm>>({});

const formInstance = ref<FormInstance>();

function customFormValueGetter() {
  return JSON.stringify(formData.value);
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

const [BasicDrawer, drawerApi] = useVbenDrawer({
  class: 'w-[550px]',
  fullscreenButton: false,
  closeOnClickModal: false,
  onClosed: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id, customerId } = drawerApi.getData() as {
      customerId?: string;
      id?: number | string;
    };
    isUpdate.value = !!id;
    formData.value.customerId = customerId;
    if (isUpdate.value && id) {
      const record = await crmCustomerFollowInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    await markInitialized();
    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value
      ? crmCustomerFollowUpdate(data)
      : crmCustomerFollowAdd(data));
      resetInitialized();
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleCancel() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title">
    <Form :label-col="{ span: 4 }" ref="formInstance" :model="formData">
      <FormItem label="内容" name="content" :rules="formRules.content">
        <Tinymce v-model="formData.content" />
      </FormItem>
      <FormItem label="类型" name="types" :rules="formRules.types">
        <RadioGroup v-model:value="formData.types">
          <RadioButton :value="0">说明</RadioButton>
          <RadioButton :value="1">提醒</RadioButton>
        </RadioGroup>
      </FormItem>
      <FormItem
        v-if="formData.types === 1"
        label="提醒时间"
        name="time"
        :rules="formRules.time"
      >
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.time"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="状态" name="status" :rules="formRules.status">
        <RadioGroup v-model:value="formData.status">
          <RadioButton :value="0">待处理</RadioButton>
          <RadioButton :value="1">放弃</RadioButton>
          <RadioButton :value="2">已完成</RadioButton>
        </RadioGroup>
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
