<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { WarehouseLocationForm } from '#/api/erp/warehouseLocation/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import {
  Form,
  FormItem,
  Input,
  Select,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { warehouseLocationAdd, warehouseLocationInfo, warehouseLocationUpdate } from '#/api/erp/warehouseLocation';
import { listWarehouseSelect, listWarehouseLocationSelect } from '#/api/wcommon';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const warehouseOptions = ref<any[]>([]);
const locationOptions = ref<any[]>([]);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<WarehouseLocationForm> = {
  id: undefined,
  warehouseId: undefined,
  parentId: undefined,
  locationCode: undefined,
  locationName: undefined,
  locationType: undefined,
  fullPath: undefined,
  status: undefined,
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
const formRules = ref<AntdFormRules<WarehouseLocationForm>>({});

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

    // 加载仓库和库位下拉数据
    const [warehouseRes, locationRes] = await Promise.all([
      listWarehouseSelect(),
      listWarehouseLocationSelect(),
    ]);
    warehouseOptions.value = (warehouseRes || []).map((item: any) => ({
      label: item.warehouseName || item.name,
      value: item.warehouseId || item.id,
    }));
    locationOptions.value = (locationRes || []).map((item: any) => ({
      label: item.locationName || item.name,
      value: item.locationId || item.id,
    }));

    if (isUpdate.value && id) {
      const record = await warehouseLocationInfo(id);
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
    await (isUpdate.value ? warehouseLocationUpdate(data) : warehouseLocationAdd(data));
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
      <FormItem label="所属仓库" name="warehouseId" :rules="formRules.warehouseId">
        <Select
          v-model:value="formData.warehouseId"
          :options="warehouseOptions"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
          show-search
          :filter-option="(input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase())"
        />
      </FormItem>
      <FormItem label="上级位置" name="parentId" :rules="formRules.parentId">
        <Select
          v-model:value="formData.parentId"
          :options="locationOptions"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
          show-search
          allow-clear
          :filter-option="(input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase())"
        />
      </FormItem>
      <FormItem label="库位编码" name="locationCode" :rules="formRules.locationCode">
        <Input v-model:value="formData.locationCode" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="库位名称" name="locationName" :rules="formRules.locationName">
        <Input v-model:value="formData.locationName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="类型" name="locationType" :rules="formRules.locationType">
        <Select
          v-model:value="formData.locationType"
          :options="getDictOptions('location_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="启用状态" name="status" :rules="formRules.status">
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('sys_normal_disable', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
