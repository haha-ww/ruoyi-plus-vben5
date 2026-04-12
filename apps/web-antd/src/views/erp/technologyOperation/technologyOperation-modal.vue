<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { TechnologyOperationForm } from '#/api/erp/technologyOperation/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import {
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { technologyOperationAdd, technologyOperationInfo, technologyOperationUpdate } from '#/api/erp/technologyOperation';
import { deptTreeSelect } from '#/api/system/user';
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
const defaultValues: Partial<TechnologyOperationForm> = {
  id: undefined,
  operationCode: undefined,
  operationName: undefined,
  deptId: undefined,
  stdSetupTime: undefined,
  stdRunTime: undefined,
  status: undefined,
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
const formRules = ref<AntdFormRules<TechnologyOperationForm>>({});

const formInstance = ref<FormInstance>();
const deptOptions = ref<any[]>([]);

async function loadDeptOptions() {
  deptOptions.value = await deptTreeSelect();
}

function customFormValueGetter() {
  return JSON.stringify(formData.value);
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[550px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    await loadDeptOptions();
    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await technologyOperationInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? technologyOperationUpdate(data) : technologyOperationAdd(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 7 }" ref="formInstance" :model="formData">
      <FormItem label="工序编码" name="operationCode" :rules="formRules.operationCode">
        <Input v-model:value="formData.operationCode" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工序名称" name="operationName" :rules="formRules.operationName">
        <Input v-model:value="formData.operationName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="默认工作中心" name="deptId" :rules="formRules.deptId">
        <TreeSelect
          v-model:value="formData.deptId"
          :tree-data="deptOptions"
          :field-names="{ label: 'label', value: 'id', children: 'children' }"
          allow-clear
          tree-default-expand-all
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="默认准备时间(小时)" name="stdSetupTime" :rules="formRules.stdSetupTime">
        <InputNumber v-model:value="formData.stdSetupTime" :min="0" :precision="2" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="默认单件加工时间(小时)" name="stdRunTime" :rules="formRules.stdRunTime">
        <InputNumber v-model:value="formData.stdRunTime" :min="0" :precision="2" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="启用状态" name="status" :rules="formRules.status">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.status"
          :options="getDictOptions('sys_normal_disable', true)"
        />
      </FormItem>
      <FormItem label="备注/作业指导说明" name="remark" :rules="formRules.remark">
        <TextArea
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
