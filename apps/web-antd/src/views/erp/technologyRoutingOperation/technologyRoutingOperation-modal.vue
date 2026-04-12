<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import { computed, ref } from 'vue';

import {
  CheckboxGroup,
  DatePicker,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Select,
  Textarea,
} from 'antdv-next';
import { ImageUpload, FileUpload } from '#/components/upload';
import { Tinymce } from '#/components/tinymce';
import { getPopupContainer } from '@vben/utils';
import { pick } from 'lodash-es';


import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { technologyRoutingOperationAdd, technologyRoutingOperationInfo, technologyRoutingOperationUpdate } from '#/api/erp/technologyRoutingOperation';
import type { TechnologyRoutingOperationForm } from '#/api/erp/technologyRoutingOperation/model';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<TechnologyRoutingOperationForm> = {
  id: undefined,
  routingId: undefined,
  operationId: undefined,
  operationCode: undefined,
  operationName: undefined,
  sequence: undefined,
  deptId: undefined,
  wage: undefined,
  waste: undefined,
  setupTime: undefined,
  runTime: undefined,
  memo: undefined,
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
const formRules = ref<AntdFormRules<TechnologyRoutingOperationForm>>({
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

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await technologyRoutingOperationInfo(id);
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
    await (isUpdate.value ? technologyRoutingOperationUpdate(data) : technologyRoutingOperationAdd(data));
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
    <Form :label-col="{ span: 4 }" ref="formInstance" :model="formData">
      <FormItem label="所属工艺路线ID" name="routingId" :rules="formRules.routingId">
        <Input v-model:value="formData.routingId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工序id" name="operationId" :rules="formRules.operationId">
        <Input v-model:value="formData.operationId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工序编码" name="operationCode" :rules="formRules.operationCode">
        <Input v-model:value="formData.operationCode" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工序名称" name="operationName" :rules="formRules.operationName">
        <Input v-model:value="formData.operationName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工序顺序" name="sequence" :rules="formRules.sequence">
        <Input v-model:value="formData.sequence" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工作中心ID" name="deptId" :rules="formRules.deptId">
        <Input v-model:value="formData.deptId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="标准工价" name="wage" :rules="formRules.wage">
        <Input v-model:value="formData.wage" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="废品工价" name="waste" :rules="formRules.waste">
        <Input v-model:value="formData.waste" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="准备时间" name="setupTime" :rules="formRules.setupTime">
        <Input v-model:value="formData.setupTime" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="单件加工时间(小时)" name="runTime" :rules="formRules.runTime">
        <Input v-model:value="formData.runTime" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="工序说明" name="memo" :rules="formRules.memo">
        <Textarea
          v-model:value="formData.memo"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
