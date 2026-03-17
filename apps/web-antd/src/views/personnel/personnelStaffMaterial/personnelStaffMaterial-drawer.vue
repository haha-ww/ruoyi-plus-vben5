<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { PersonnelStaffMaterialForm } from '#/api/personnel/personnelStaffMaterial/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Form, FormItem, Input } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  personnelStaffMaterialAdd,
  personnelStaffMaterialInfo,
  personnelStaffMaterialUpdate,
} from '#/api/personnel/personnelStaffMaterial';
import { FileUpload } from '#/components/upload';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelStaffMaterialForm> = {
  id: undefined,
  fileName: undefined,
  ossId: undefined,
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
      const record = await personnelStaffMaterialInfo(id);
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
    // data.ossId = data.ossId.join(',');
    await (isUpdate.value
      ? personnelStaffMaterialUpdate(data)
      : personnelStaffMaterialAdd(data));
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
      <FormItem label="文件名称" name="fileName" :rules="formRules.fileName">
        <Input
          v-model:value="formData.fileName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="文件上传" name="ossId" :rules="formRules.ossId">
        <!-- props参考apps/web-antd/src/components/upload/src/file-upload.vue 25行 -->
        <!-- resultField默认为url 可选ossId -->
        <FileUpload v-model:value="formData.ossId" />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
