<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { ProductionOrderForm } from '#/api/erp/productionOrder/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import {
  DatePicker,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Select,
  TextArea,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { productionOrderAdd, productionOrderInfo, productionOrderUpdate } from '#/api/erp/productionOrder';
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
const defaultValues: Partial<ProductionOrderForm> = {
  id: undefined,
  orderCode: undefined,
  productionType: undefined,
  deptId: undefined,
  productionManager: undefined,
  orderStatus: undefined,
  materialId: undefined,
  bomVersion: undefined,
  planId: undefined,
  planCode: undefined,
  salesOrderId: undefined,
  salesOrderCode: undefined,
  orderQuantity: undefined,
  remainQuantity: undefined,
  salesOrderQuantity: undefined,
  requiredDeliveryDate: undefined,
  actualStartDate: undefined,
  plannedCompletionDate: undefined,
  isPick: undefined,
  progress: undefined,
  orderDate: undefined,
  cancelDate: undefined,
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
const formRules = ref<AntdFormRules<ProductionOrderForm>>({});

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
  class: 'w-[750px]',
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
      const record = await productionOrderInfo(id);
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
    await (isUpdate.value ? productionOrderUpdate(data) : productionOrderAdd(data));
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
      <FormItem label="生产订单编码" name="orderCode" :rules="formRules.orderCode">
        <Input v-model:value="formData.orderCode" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="生产类型(字典 production_type)" name="productionType" :rules="formRules.productionType">
        <Select
          v-model:value="formData.productionType"
          :options="getDictOptions('production_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="工厂/车间" name="deptId" :rules="formRules.deptId">
        <Input v-model:value="formData.deptId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="生产负责人" name="productionManager" :rules="formRules.productionManager">
        <Input v-model:value="formData.productionManager" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="订单状态" name="orderStatus" :rules="formRules.orderStatus">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.orderStatus"
          :options="[]"
        />
      </FormItem>
      <FormItem label="物料id" name="materialId" :rules="formRules.materialId">
        <Input v-model:value="formData.materialId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="bom版本号" name="bomVersion" :rules="formRules.bomVersion">
        <Input v-model:value="formData.bomVersion" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="生产计划id" name="planId" :rules="formRules.planId">
        <Input v-model:value="formData.planId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="生产计划单号" name="planCode" :rules="formRules.planCode">
        <Input v-model:value="formData.planCode" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="销售订单id" name="salesOrderId" :rules="formRules.salesOrderId">
        <Input v-model:value="formData.salesOrderId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="销售订单编码" name="salesOrderCode" :rules="formRules.salesOrderCode">
        <Input v-model:value="formData.salesOrderCode" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="生产数量" name="orderQuantity" :rules="formRules.orderQuantity">
        <Input v-model:value="formData.orderQuantity" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="剩余质检数量" name="remainQuantity" :rules="formRules.remainQuantity">
        <Input v-model:value="formData.remainQuantity" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="销售订单数量" name="salesOrderQuantity" :rules="formRules.salesOrderQuantity">
        <Input v-model:value="formData.salesOrderQuantity" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="要求交货日期" name="requiredDeliveryDate" :rules="formRules.requiredDeliveryDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.requiredDeliveryDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="实际开工日期" name="actualStartDate" :rules="formRules.actualStartDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.actualStartDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="计划完成日期" name="plannedCompletionDate" :rules="formRules.plannedCompletionDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.plannedCompletionDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="是否已领料" name="isPick" :rules="formRules.isPick">
        <Input v-model:value="formData.isPick" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="生产进度" name="progress" :rules="formRules.progress">
        <Input v-model:value="formData.progress" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="单据日期" name="orderDate" :rules="formRules.orderDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.orderDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="作废日期" name="cancelDate" :rules="formRules.cancelDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.cancelDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
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
