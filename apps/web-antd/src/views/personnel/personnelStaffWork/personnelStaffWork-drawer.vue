<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { PersonnelStaffWorkForm } from '#/api/personnel/personnelStaffWork/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import { DatePicker, Form, FormItem, Input, TextArea } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  personnelStaffWorkAdd,
  personnelStaffWorkInfo,
  personnelStaffWorkUpdate,
} from '#/api/personnel/personnelStaffWork';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelStaffWorkForm> = {
  id: undefined,
  company: undefined,
  dept: undefined,
  job: undefined,
  startDate: undefined,
  endDate: undefined,
  jobDescription: undefined,
  jobNumber: undefined,
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
const formRules = ref<AntdFormRules<ErpMaterialInfoForm>>({});

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

    const { id, jobNumber } = drawerApi.getData() as {
      id?: number | string;
      jobNumber?: string;
    };
    isUpdate.value = !!id;
    formData.value.jobNumber = jobNumber;
    if (isUpdate.value && id) {
      const record = await personnelStaffWorkInfo(id);
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
      ? personnelStaffWorkUpdate(data)
      : personnelStaffWorkAdd(data));
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
      <FormItem label="公司" name="company" :rules="formRules.company">
        <Input
          v-model:value="formData.company"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="部门" name="dept" :rules="formRules.dept">
        <Input
          v-model:value="formData.dept"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="职务" name="job" :rules="formRules.job">
        <Input
          v-model:value="formData.job"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="开始日期" name="startDate" :rules="formRules.startDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.startDate"
          :get-popup-container="getPopupContainer"
          placeholder="请选择"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="结束日期" name="endDate" :rules="formRules.endDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.endDate"
          :get-popup-container="getPopupContainer"
          placeholder="请选择"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem
        label="工作描述"
        name="jobDescription"
        :rules="formRules.jobDescription"
      >
        <TextArea
          v-model:value="formData.jobDescription"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
