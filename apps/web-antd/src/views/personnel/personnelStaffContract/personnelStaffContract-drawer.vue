<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { PersonnelStaffContractForm } from '#/api/personnel/personnelStaffContract/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import { DatePicker, Form, FormItem, Input, Select } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  personnelStaffContractAdd,
  personnelStaffContractInfo,
  personnelStaffContractUpdate,
} from '#/api/personnel/personnelStaffContract';
import { FileUpload } from '#/components/upload';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelStaffContractForm> = {
  id: undefined,
  fileName: undefined,
  ossId: undefined,
  jobNumber: undefined,
  status: undefined,
  startDate: undefined,
  endDate: undefined,
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
const formRules = ref<AntdFormRules<PersonnelStaffForm>>({
  fileName: [{ required: true, message: '合同名称不能为空' }],
  ossId: [{ required: true, message: 'ossId不能为空' }],
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
      const record = await personnelStaffContractInfo(id);
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
      ? personnelStaffContractUpdate(data)
      : personnelStaffContractAdd(data));
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
    <Form :label-col="{ span: 4 }" :model="formData" ref="formInstance">
      <FormItem label="合同名称" name="fileName" :rules="formRules.fileName">
        <Input
          v-model:value="formData.fileName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="ossId" name="ossId" :rules="formRules.ossId">
        <!-- props参考apps/web-antd/src/components/upload/src/file-upload.vue 25行 -->
        <!-- resultField默认为url 可选ossId -->
        <FileUpload
          result-field="ossId"
          :max-number="1"
          v-model:value="formData.ossId"
        />
      </FormItem>
      <FormItem label="工号" name="jobNumber" :rules="formRules.jobNumber">
        <Input
          v-model:value="formData.jobNumber"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem
        label="合同状态(字典contract_status)"
        name="status"
        :rules="formRules.status"
      >
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('contract_status', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="开始日期" :rules="formRules.startDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.startDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="结束日期" :rules="formRules.endDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.endDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
