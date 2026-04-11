<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { WarehouseInfoForm } from '#/api/erp/warehouseInfo/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import {
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  Select,
  TextArea
} from 'antdv-next';
import { pick } from 'lodash-es';

import { warehouseInfoAdd, warehouseInfoInfo, warehouseInfoUpdate } from '#/api/erp/warehouseInfo';
import { liststaffSelect } from '#/api/wcommon';
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
const defaultValues: Partial<WarehouseInfoForm> = {
  id: undefined,
  warehouseCode: undefined,
  warehouseName: undefined,
  warehouseType: undefined,
  location: undefined,
  userId: undefined,
  orderNum: undefined,
  status: '0',
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
const formRules = ref<AntdFormRules<WarehouseInfoForm>>({
  warehouseName: [{ required: true, message: '请输入仓库名称' }],
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
      const record = await warehouseInfoInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    await markInitialized();
    await initStaffSelect();
    modalApi.modalLoading(false);
  },
});

/**
 * 初始化员工下拉列表
 */
const staffOptions = ref([]);
async function initStaffSelect() {
  const staffList = await liststaffSelect();
  staffOptions.value = staffList
}

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? warehouseInfoUpdate(data) : warehouseInfoAdd(data));
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
      <FormItem label="仓库编码" name="warehouseCode" :rules="formRules.warehouseCode">
        <Input v-model:value="formData.warehouseCode" placeholder="系统自动生成" disabled />
      </FormItem>
      <FormItem label="仓库名称" name="warehouseName" :rules="formRules.warehouseName">
        <Input v-model:value="formData.warehouseName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="仓库类型" name="warehouseType" :rules="formRules.warehouseType">
        <Select
          v-model:value="formData.warehouseType"
          :options="getDictOptions('warehouse_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="仓库地址" name="location" :rules="formRules.location">
        <Input v-model:value="formData.location" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="负责人" name="userId" :rules="formRules.userId">
        <Select
          v-model:value="formData.userId"
          :options="staffOptions"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
          :field-names="{
            label: 'name',
            value: 'id',
          }"
        />
      </FormItem>
      <FormItem label="显示顺序" name="orderNum" :rules="formRules.orderNum">
        <InputNumber v-model:value="formData.orderNum" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="启用状态" name="status" :rules="formRules.status">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.status"
          :options="getDictOptions('sys_normal_disable', true)"
        />
      </FormItem>
      <FormItem label="备注" name="remark" :rules="formRules.remark">
        <TextArea
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
