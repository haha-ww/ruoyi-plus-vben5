<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { CrmInvoiceForm } from '#/api/crm/crmInvoice/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import { DatePicker, Form, FormItem, Input, Select, TextArea } from 'antdv-next';
import { pick } from 'lodash-es';

import { crmInvoiceAdd, crmInvoiceInfo, crmInvoiceUpdate } from '#/api/crm/crmInvoice';
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
const defaultValues: Partial<CrmInvoiceForm> = {
  id: undefined,
  serialNumber: undefined,
  customerId: undefined,
  contractId: undefined,
  categoryId: undefined,
  name: undefined,
  num: undefined,
  price: undefined,
  amount: undefined,
  types: undefined,
  title: undefined,
  ident: undefined,
  bank: undefined,
  account: undefined,
  address: undefined,
  tel: undefined,
  collectName: undefined,
  collectTel: undefined,
  collectType: undefined,
  collectEmail: undefined,
  mailAddress: undefined,
  invoiceType: undefined,
  invoiceAddress: undefined,
  status: undefined,
  invalid: undefined,
  billDate: undefined,
  realDate: undefined,
  mark: undefined,
  remark: undefined,
  cardRemark: undefined,
  financeRemark: undefined,
  linkId: undefined,
  revokeId: undefined,
  linkBill: undefined,
}

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
const formRules = ref<AntdFormRules<CrmInvoiceForm>>({});

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
  onBeforeClose,
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
      const record = await crmInvoiceInfo(id);
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
    await (isUpdate.value ? crmInvoiceUpdate(data) : crmInvoiceAdd(data));
    resetInitialized();
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
    <Form :label-col="{ span: 4 }" ref="formInstance" :model="formData">
      <FormItem label="发票流水号" name="serialNumber">
        <Input v-model:value="formData.serialNumber" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="客户ID" name="customerId">
        <Input v-model:value="formData.customerId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="合同ID" name="contractId">
        <Input v-model:value="formData.contractId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票类目ID" name="categoryId">
        <Input v-model:value="formData.categoryId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票名称" name="name">
        <Input v-model:value="formData.name" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票编号" name="num">
        <Input v-model:value="formData.num" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="合同金额" name="price">
        <Input v-model:value="formData.price" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票金额" name="amount">
        <Input v-model:value="formData.amount" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票类型" name="types">
        <Select
          v-model:value="formData.types"
          :options="getDictOptions('invoice_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="发票抬头" name="title">
        <Input v-model:value="formData.title" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="纳税人识别号" name="ident">
        <Input v-model:value="formData.ident" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开户行" name="bank">
        <Input v-model:value="formData.bank" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开户账号" name="account">
        <Input v-model:value="formData.account" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开票地址" name="address">
        <Input v-model:value="formData.address" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="电话" name="tel">
        <Input v-model:value="formData.tel" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄联系人" name="collectName">
        <Input v-model:value="formData.collectName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄联系电话" name="collectTel">
        <Input v-model:value="formData.collectTel" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄方式" name="collectType">
        <Select
          v-model:value="formData.collectType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="邮寄邮箱" name="collectEmail">
        <Input v-model:value="formData.collectEmail" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄地址" name="mailAddress">
        <Input v-model:value="formData.mailAddress" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开票方式" name="invoiceType">
        <Select
          v-model:value="formData.invoiceType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="开票地址" name="invoiceAddress">
        <Input v-model:value="formData.invoiceAddress" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票状态 -1：开票撤回；0：待开票；1：已开票；2:已拒绝；3：申请作废；4:同意作废；5：拒绝作废；6：作废撤回；" name="status">
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('invoice_status', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="作废状态: 0，默认；-1，撤回；1，待审核；2，审核通过；3，审核未通过" name="invalid">
        <Input v-model:value="formData.invalid" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开票日期" name="billDate">
        <!-- 需要自行调整参数 -->
        <DatePicker 
          v-model:value="formData.billDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="实际开票日期" name="realDate">
        <!-- 需要自行调整参数 -->
        <DatePicker 
          v-model:value="formData.realDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="备注内容" name="mark">
        <TextArea
          v-model:value="formData.mark" 
          :placeholder="$t('ui.formRules.required')" 
          :rows="4" 
        />
      </FormItem>
      <FormItem label="开票备注" name="remark">
        <Input v-model:value="formData.remark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="业务员备注" name="cardRemark">
        <Input v-model:value="formData.cardRemark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="财务备注" name="financeRemark">
        <Input v-model:value="formData.financeRemark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="关联审批ID" name="linkId">
        <Input v-model:value="formData.linkId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="撤销申请ID" name="revokeId">
        <Input v-model:value="formData.revokeId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="关联付款单ID" name="linkBill">
        <Input v-model:value="formData.linkBill" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>

