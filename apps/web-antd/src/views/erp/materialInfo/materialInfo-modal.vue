<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoForm } from '#/api/erp/materialInfo/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import {listToTree } from '@vben/utils';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import {
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  Select,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { materialInfoAdd, materialInfoInfo, materialInfoUpdate } from '#/api/erp/materialInfo';
import { listMaterialCategorySelect, listMaterialUnitSelect } from '#/api/wcommon';
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
const defaultValues: Partial<MaterialInfoForm> = {
  id: undefined,
  categoryId: undefined,
  materialCode: undefined,
  materialName: undefined,
  materialShortName: undefined,
  model: undefined,
  unitId: undefined,
  supplierId: undefined,
  costPricingType: undefined,
  costPrice: undefined,
  supplyMode: undefined,
  salesTaxPrice: undefined,
  salesPrice: undefined,
  purchasePrice: undefined,
  taxRate: undefined,
  drawingNumber: undefined,
  drawingOssid: undefined,
  disabled: '0',
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
const formRules = ref<AntdFormRules<MaterialInfoForm>>({
  materialName: [
    { required: true, message: '请输入物料名称', trigger: 'blur' },
  ],
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
 // 分类和计量单位选项
const categoryOptions = ref<any[]>([]);
const unitOptions = ref<any[]>([]);
const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[850px]',
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

    // 获取分类和计量单位数据
    const [categoryResp, unitResp] = await Promise.all([
      listMaterialCategorySelect(),
      listMaterialUnitSelect()
    ]);
    // 转换为选项格式
    categoryOptions.value = listToTree(categoryResp || [], { id: 'id', pid: 'parentId' });
    unitOptions.value = unitResp || [];

    if (isUpdate.value && id) {
      const record = await materialInfoInfo(id);
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
    await (isUpdate.value ? materialInfoUpdate(data) : materialInfoAdd(data));
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
    <Form :label-col="{ span: 7 }" ref="formInstance" :model="formData" class="grid grid-cols-2 gap-4">
<FormItem label="物料编码" name="materialCode" :rules="formRules.materialCode" class="col-span-1">
        <Input v-model:value="formData.materialCode" placeholder="系统自动生成" disabled />
      </FormItem>
      <FormItem label="物料名称" name="materialName" :rules="formRules.materialName" class="col-span-1">
        <Input v-model:value="formData.materialName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="物料简称" name="materialShortName" :rules="formRules.materialShortName" class="col-span-1">
        <Input v-model:value="formData.materialShortName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="物料分类" name="categoryId" :rules="formRules.categoryId" class="col-span-1">
        <TreeSelect
          v-model:value="formData.categoryId"
          :tree-data="categoryOptions"
          :field-names="{
            label: 'categoryName',
            value: 'id',
          }"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="规格型号" name="model" :rules="formRules.model" class="col-span-1">
        <Input v-model:value="formData.model" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="计量单位" name="unitId" :rules="formRules.unitId" class="col-span-1">
        <Select
          v-model:value="formData.unitId"
          :options="unitOptions"
          :field-names="{
            label: 'unitName',
            value: 'id',
          }"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
       <FormItem label="供应方式" name="supplyMode" :rules="formRules.supplyMode" class="col-span-1">
        <Select
          v-model:value="formData.supplyMode"
          :options="getDictOptions('supply_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="供应商" name="supplierId" :rules="formRules.supplierId" class="col-span-1">
        <Select
          v-model:value="formData.supplierId"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="成本价格" name="costPrice" :rules="formRules.costPrice" class="col-span-1">
        <InputNumber v-model:value="formData.costPrice" :placeholder="$t('ui.formRules.required')" :min="0" :precision="2" style="width: 100%;" />
      </FormItem>
     
      <FormItem label="销售单价(含税)" name="salesTaxPrice" :rules="formRules.salesTaxPrice" class="col-span-1">
        <InputNumber v-model:value="formData.salesTaxPrice" :placeholder="$t('ui.formRules.required')" :min="0" :precision="2" style="width: 100%;" />
      </FormItem>
      <FormItem label="销售单价(不含税)" name="salesPrice" :rules="formRules.salesPrice" class="col-span-1">
        <InputNumber v-model:value="formData.salesPrice" :placeholder="$t('ui.formRules.required')" :min="0" :precision="2" style="width: 100%;" />
      </FormItem>
      <FormItem label="采购单价" name="purchasePrice" :rules="formRules.purchasePrice" class="col-span-1">
        <InputNumber v-model:value="formData.purchasePrice" :placeholder="$t('ui.formRules.required')" :min="0" :precision="2" style="width: 100%;" />
      </FormItem>
      <FormItem label="税率" name="taxRate" :rules="formRules.taxRate" class="col-span-1">
        <Select
          v-model:value="formData.taxRate"
          :options="getDictOptions('tax_rate', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="图纸号" name="drawingNumber" :rules="formRules.drawingNumber" class="col-span-1">
        <Input v-model:value="formData.drawingNumber" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="图纸" name="drawingOssid" :rules="formRules.drawingOssid" class="col-span-1">
        <!-- props参考apps/web-antd/src/components/upload/src/props.d.ts -->
        <!-- maxCount为1(默认)时只允许上传一个文件 会自动绑定为string而非string[] -->
        <FileUpload :max-count="1" v-model:value="formData.drawingOssid" />
      </FormItem>
      <FormItem label="启用状态" name="disabled" :rules="formRules.disabled" class="col-span-1">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.disabled"
          :options="getDictOptions('sys_normal_disable', true)"
        />
      </FormItem>
      <FormItem label="备注" name="remark" :rules="formRules.remark" class="col-span-2" :label-col="200">
        <TextArea
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
