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
import { crmInvoiceAdd, crmInvoiceInfo, crmInvoiceUpdate } from '#/api/crm/crmInvoice';
import type { CrmInvoiceForm } from '#/api/crm/crmInvoice/model';

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

type AntdFormRules<T> = Partial<Record<keyof T, RuleObject[]>> & {
  [key: string]: RuleObject[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<CrmInvoiceForm>>({
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
    drawerApi.drawerLoading(true);
    await validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? crmInvoiceUpdate(data) : crmInvoiceAdd(data));
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
      <FormItem label="发票流水号" v-bind="validateInfos.serialNumber">
        <Input v-model:value="formData.serialNumber" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="客户ID" v-bind="validateInfos.customerId">
        <Input v-model:value="formData.customerId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="合同ID" v-bind="validateInfos.contractId">
        <Input v-model:value="formData.contractId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票类目ID" v-bind="validateInfos.categoryId">
        <Input v-model:value="formData.categoryId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票名称" v-bind="validateInfos.name">
        <Input v-model:value="formData.name" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票编号" v-bind="validateInfos.num">
        <Input v-model:value="formData.num" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="合同金额" v-bind="validateInfos.price">
        <Input v-model:value="formData.price" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票金额" v-bind="validateInfos.amount">
        <Input v-model:value="formData.amount" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票类型" v-bind="validateInfos.types">
        <Select
          v-model:value="formData.types"
          :options="getDictOptions('invoice_type', true)"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="发票抬头" v-bind="validateInfos.title">
        <Input v-model:value="formData.title" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="纳税人识别号" v-bind="validateInfos.ident">
        <Input v-model:value="formData.ident" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开户行" v-bind="validateInfos.bank">
        <Input v-model:value="formData.bank" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开户账号" v-bind="validateInfos.account">
        <Input v-model:value="formData.account" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开票地址" v-bind="validateInfos.address">
        <Input v-model:value="formData.address" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="电话" v-bind="validateInfos.tel">
        <Input v-model:value="formData.tel" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄联系人" v-bind="validateInfos.collectName">
        <Input v-model:value="formData.collectName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄联系电话" v-bind="validateInfos.collectTel">
        <Input v-model:value="formData.collectTel" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄方式" v-bind="validateInfos.collectType">
        <Select
          v-model:value="formData.collectType"
          :options="[]"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="邮寄邮箱" v-bind="validateInfos.collectEmail">
        <Input v-model:value="formData.collectEmail" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="邮寄地址" v-bind="validateInfos.mailAddress">
        <Input v-model:value="formData.mailAddress" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开票方式" v-bind="validateInfos.invoiceType">
        <Select
          v-model:value="formData.invoiceType"
          :options="[]"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="开票地址" v-bind="validateInfos.invoiceAddress">
        <Input v-model:value="formData.invoiceAddress" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="发票状态 -1：开票撤回；0：待开票；1：已开票；2:已拒绝；3：申请作废；4:同意作废；5：拒绝作废；6：作废撤回；" v-bind="validateInfos.status">
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('invoice_status', true)"
          :getPopupContainer="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="作废状态: 0，默认；-1，撤回；1，待审核；2，审核通过；3，审核未通过" v-bind="validateInfos.invalid">
        <Input v-model:value="formData.invalid" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="开票日期" v-bind="validateInfos.billDate">
        <!-- 需要自行调整参数 -->
        <DatePicker 
          v-model:value="formData.billDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="实际开票日期" v-bind="validateInfos.realDate">
        <!-- 需要自行调整参数 -->
        <DatePicker 
          v-model:value="formData.realDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="备注内容" v-bind="validateInfos.mark">
        <Textarea 
          v-model:value="formData.mark" 
          :placeholder="$t('ui.formRules.required')" 
          :rows="4" 
        />
      </FormItem>
      <FormItem label="开票备注" v-bind="validateInfos.remark">
        <Input v-model:value="formData.remark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="业务员备注" v-bind="validateInfos.cardRemark">
        <Input v-model:value="formData.cardRemark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="财务备注" v-bind="validateInfos.financeRemark">
        <Input v-model:value="formData.financeRemark" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="关联审批ID" v-bind="validateInfos.linkId">
        <Input v-model:value="formData.linkId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="撤销申请ID" v-bind="validateInfos.revokeId">
        <Input v-model:value="formData.revokeId" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      <FormItem label="关联付款单ID" v-bind="validateInfos.linkBill">
        <Input v-model:value="formData.linkBill" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>

