<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { CrmCustomerRecordForm } from '#/api/crm/crmCustomerRecord/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import { Form, FormItem, Input, Select, TextArea } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  crmCustomerRecordAdd,
  crmCustomerRecordInfo,
  crmCustomerRecordUpdate,
} from '#/api/crm/crmCustomerRecord';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<CrmCustomerRecordForm> = {
  id: undefined,
  customerId: undefined,
  type: undefined,
  uid: undefined,
  recordVersion: undefined,
  reason: undefined,
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
const formRules = ref<AntdFormRules<ErpMaterialInfoForm>>({
  customerId: [{ required: true, message: '客户ID不能为空' }],
  type: [
    {
      required: true,
      message:
        '记录类型 1、退回公海；2、领取；3、流失；4、取消流失；5、移交同事；不能为空',
    },
  ],
  uid: [{ required: true, message: '业务员ID不能为空' }],
  recordVersion: [{ required: true, message: '记录版本不能为空' }],
  reason: [{ required: true, message: '原因不能为空' }],
});

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

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await crmCustomerRecordInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }

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
      ? crmCustomerRecordUpdate(data)
      : crmCustomerRecordAdd(data));
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
      <FormItem label="客户ID" :rules="formRules.customerId">
        <Input
          v-model:value="formData.customerId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem
        label="记录类型 1、退回公海；2、领取；3、流失；4、取消流失；5、移交同事；"
        :rules="formRules.type"
      >
        <Select
          v-model:value="formData.type"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="业务员ID" :rules="formRules.uid">
        <Input
          v-model:value="formData.uid"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="记录版本" :rules="formRules.recordVersion">
        <Input
          v-model:value="formData.recordVersion"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="原因" :rules="formRules.reason">
        <Input
          v-model:value="formData.reason"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="备注" :rules="formRules.remark">
        <TextArea
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
