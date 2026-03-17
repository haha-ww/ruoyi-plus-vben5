<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form';
import { computed, ref } from 'vue';

import { Input, Textarea, Select, RadioGroup, CheckboxGroup, DatePicker, Form, FormItem } from 'ant-design-vue';
import { ImageUpload, FileUpload } from '#/components/upload';
import { Tinymce } from '#/components/tinymce';
import { getPopupContainer } from '@vben/utils';
import { pick } from 'lodash-es';

import { getDictOptions } from '#/utils/dict';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { crmBillAdd, crmBillInfo, crmBillUpdate } from '#/api/crm/crmBill';
import type { CrmBillForm } from '#/api/crm/crmBill/model';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<CrmBillForm> = {
  id: undefined,
  customerId: undefined,
  contractId: undefined,
  billCateId: undefined,
  billTypes: undefined,
  invoiceId: undefined,
  num: undefined,
  remark: undefined,
  typeId: undefined,
  payType: undefined,
  date: undefined,
  endDate: undefined,
  billNo: undefined,
  applyId: undefined,
  status: undefined,
  failMsg: undefined,
}

/**
 * 表单数据ref
 */
const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, RuleObject[]>> & {
  [key: string]: RuleObject[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<CrmBillForm>>({
});

/**
 * useForm解构出表单方法
 */
const { validate, validateInfos, resetFields } = Form.useForm(
  formData,
  formRules,
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
      const record = await crmBillInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }

    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.drawerLoading(true);
    await validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? crmBillUpdate(data) : crmBillAdd(data));
    emit('reload');
    await handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.drawerLoading(false);
  }
}

async function handleCancel() {
  drawerApi.close();
  formData.value = defaultValues;
  resetFields();
}
</script>

<template>
  <BasicDrawer :title="title">
    <Form :label-col="{ span: 4 }">
      <FormItem label="客户ID" v-bind="validateInfos.customerId">
        <Input v-model:value="formData.customerId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="合同ID" v-bind="validateInfos.contractId">
        <Input v-model:value="formData.contractId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="财务科目" v-bind="validateInfos.billCateId">
        <Input v-model:value="formData.billCateId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="类型:1,支出;2,收入" v-bind="validateInfos.billTypes">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.billTypes"
          :options="getDictOptions('bill_type', true)"
        />
      </FormItem>
      <FormItem label="发票ID" v-bind="validateInfos.invoiceId">
        <Input v-model:value="formData.invoiceId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="金额" v-bind="validateInfos.num">
        <Input v-model:value="formData.num" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="备注" v-bind="validateInfos.remark">
        <Input v-model:value="formData.remark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="支付方式ID" v-bind="validateInfos.typeId">
        <Select
          v-model:value="formData.typeId"
          :options="getDictOptions('pay_type', true)"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="支付方式名称" v-bind="validateInfos.payType">
        <Select
          v-model:value="formData.payType"
          :options="[]"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="收款日期" v-bind="validateInfos.date">
        <!-- 需要自行调整参数 -->
        <DatePicker 
          v-model:value="formData.date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="续费结束日期" v-bind="validateInfos.endDate">
        <!-- 需要自行调整参数 -->
        <DatePicker 
          v-model:value="formData.endDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="付款单号" v-bind="validateInfos.billNo">
        <Input v-model:value="formData.billNo" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="关联申请审批ID" v-bind="validateInfos.applyId">
        <Input v-model:value="formData.applyId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="类型：1，待审核；2，已通过；3，未通过" v-bind="validateInfos.status">
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('audit_status', true)"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="失败原因" v-bind="validateInfos.failMsg">
        <Input v-model:value="formData.failMsg" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>

