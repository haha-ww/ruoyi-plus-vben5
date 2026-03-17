<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { CrmInvoiceForm } from '#/api/crm/crmInvoice/model';

import { computed, nextTick, ref, watch } from 'vue';
// 在 nextTick 或者适当的时候更新 confirmText

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  DatePicker,
  Form,
  FormItem,
  Input,
  Select,
  TextArea,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { crmBillList } from '#/api/crm/crmBill';
import { crmContractSelectList } from '#/api/crm/crmContract';
import {
  crmInvoiceAdd,
  crmInvoiceInfo,
  crmInvoiceUpdate,
} from '#/api/crm/crmInvoice';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();
const current = ref<number>(0);
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
  class: 'w-[850px]',
  fullscreenButton: false,
  closeOnClickModal: false,
  onClosed: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id, customerId } = drawerApi.getData() as {
      customerId?: number | string;
      id?: number | string;
    };
    isUpdate.value = !!id;
    formData.value.customerId = customerId;

    if (isUpdate.value && id) {
      const record = await crmInvoiceInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    getBillList();
    getContractList();
    drawerApi.drawerLoading(false);
  },
});
// 监听 current 值变化并更新 confirmText
// 更新确认按钮文本
function updateConfirmText(newVal) {
  const text = newVal === 0 ? '下一步' : '提交';
  drawerApi.setState({
    confirmText: text,
  });
  console.log('updateConfirmText', drawerApi.useStore().value);
}

// 监听 current 值变化并更新 confirmText
watch(current, () => {
  nextTick(() => {});
});
watch(
  current,
  (newVal) => {
    updateConfirmText(newVal);
  },
  { immediate: true },
);
/* watch(
  current,
  (newVal) => {
    drawerApi.setState({
      confirmText: current.value === 0 ? '下一步' : '完成',
    });
    console.log('current', drawerApi.useStore().value.confirmText);
  },
  { immediate: true },
); */
async function handleConfirm() {
  if (current.value === 0) {
    current.value = 1;
  } else {
    try {
      drawerApi.lock(true);
      await formInstance.value?.validate();
      // 可能会做数据处理 使用cloneDeep深拷贝
      const data = cloneDeep(formData.value);
      await (isUpdate.value ? crmInvoiceUpdate(data) : crmInvoiceAdd(data));
      emit('reload');
      drawerApi.close();
    } catch (error) {
      console.error(error);
    } finally {
      drawerApi.lock(false);
    }
  }
}

async function handleCancel() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
  // 重置步骤
  current.value = 0;
  await nextTick();
  updateConfirmText();
}

const billList = ref([]);
async function getBillList() {
  billList.value = await crmBillList({
    pageNum: 1,
    pageSize: 100,
    billTypes: 2,
    customerId: formData.value.customerId,
  });
}
const contractList = ref([]);
async function getContractList() {
  contractList.value = await crmContractSelectList({
    customerId: formData.value.customerId,
  });
}
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
</script>

<template>
  <BasicDrawer :title="title">
    <a-steps :current="current">
      <a-step title="选择付款订单" />
      <a-step title="填写发票信息" />
    </a-steps>
    <a-table
      v-if="current === 0"
      :columns="columns"
      :data-source="billList"
      style="width:"
    />
    <Form v-if="current === 1" :label-col="{ span: 4 }">
      <FormItem label="发票流水号" :rules="formRules.serialNumber">
        <Input
          v-model:value="formData.serialNumber"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="客户ID" :rules="formRules.customerId">
        <Input
          v-model:value="formData.customerId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="合同ID" :rules="formRules.contractId">
        <Select
          v-model:value="formData.contractId"
          :options="contractList"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
          :field-names="{ label: 'contractName', value: 'id' }"
        />
      </FormItem>
      <FormItem label="发票类目ID" :rules="formRules.categoryId">
        <Input
          v-model:value="formData.categoryId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="发票名称" :rules="formRules.name">
        <Input
          v-model:value="formData.name"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="发票编号" :rules="formRules.num">
        <Input
          v-model:value="formData.num"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="合同金额" :rules="formRules.price">
        <Input
          v-model:value="formData.price"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="发票金额" :rules="formRules.amount">
        <Input
          v-model:value="formData.amount"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="发票类型" :rules="formRules.types">
        <Select
          v-model:value="formData.types"
          :options="getDictOptions('invoice_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="发票抬头" :rules="formRules.title">
        <Input
          v-model:value="formData.title"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="纳税人识别号" :rules="formRules.ident">
        <Input
          v-model:value="formData.ident"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="开户行" :rules="formRules.bank">
        <Input
          v-model:value="formData.bank"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="开户账号" :rules="formRules.account">
        <Input
          v-model:value="formData.account"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="开票地址" :rules="formRules.address">
        <Input
          v-model:value="formData.address"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="电话" :rules="formRules.tel">
        <Input
          v-model:value="formData.tel"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="邮寄联系人" :rules="formRules.collectName">
        <Input
          v-model:value="formData.collectName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="邮寄联系电话" :rules="formRules.collectTel">
        <Input
          v-model:value="formData.collectTel"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="邮寄方式" :rules="formRules.collectType">
        <Select
          v-model:value="formData.collectType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="邮寄邮箱" :rules="formRules.collectEmail">
        <Input
          v-model:value="formData.collectEmail"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="邮寄地址" :rules="formRules.mailAddress">
        <Input
          v-model:value="formData.mailAddress"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="开票方式" :rules="formRules.invoiceType">
        <Select
          v-model:value="formData.invoiceType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="开票地址" :rules="formRules.invoiceAddress">
        <Input
          v-model:value="formData.invoiceAddress"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="发票状态" :rules="formRules.status">
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('invoice_status', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="作废状态" :rules="formRules.invalid">
        <Input
          v-model:value="formData.invalid"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="开票日期" :rules="formRules.billDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.billDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="实际开票日期" :rules="formRules.realDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.realDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="备注内容" :rules="formRules.mark">
        <TextArea
          v-model:value="formData.mark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
      <FormItem label="开票备注" :rules="formRules.remark">
        <Input
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="业务员备注" :rules="formRules.cardRemark">
        <Input
          v-model:value="formData.cardRemark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="财务备注" :rules="formRules.financeRemark">
        <Input
          v-model:value="formData.financeRemark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="关联审批ID" :rules="formRules.linkId">
        <Input
          v-model:value="formData.linkId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="撤销申请ID" :rules="formRules.revokeId">
        <Input
          v-model:value="formData.revokeId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="关联付款单ID" :rules="formRules.linkBill">
        <Input
          v-model:value="formData.linkBill"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
    </Form>
    <template #append-footer>
      <a-button v-if="current === 0" type="primary" @click="handleConfirm">
        下一步
      </a-button>
      <a-button v-if="current === 1" type="primary" @click="handleConfirm">
        提交
      </a-button>
    </template>
  </BasicDrawer>
</template>
