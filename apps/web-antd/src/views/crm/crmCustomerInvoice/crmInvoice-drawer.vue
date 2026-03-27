<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { CrmInvoiceForm } from '#/api/crm/crmInvoice/model';

import { computed, nextTick, ref, watch } from 'vue';
// 在 nextTick 或者适当的时候更新 confirmText

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  Alert,
  DatePicker,
  Form,
  FormItem,
  Input,
  Select,
  Steps,
  Table,
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
const formRules = ref<AntdFormRules<CrmInvoiceForm>>({
  serialNumber: [{ required: true, message: '请输入发票流水号', trigger: 'blur' }],
  contractId: [{ required: true, message: '请选择合同', trigger: 'change' }],
  name: [{ required: true, message: '请输入发票名称', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入发票金额', trigger: 'blur' }],
  types: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择发票状态', trigger: 'change' }],
});

const formInstance = ref<FormInstance>();
const selectedBillKeys = ref<Array<number | string>>([]);
const selectedBillRecord = ref<any>(null);
const billSelectionError = ref('');

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
  onBeforeClose,
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
    await markInitialized();
    drawerApi.drawerLoading(false);
  },
});
// 监听 current 值变化并更新 confirmText
// 更新确认按钮文本
function updateConfirmText(newVal: number = 0) {
  const text = newVal === 0 ? '下一步' : '提交';
  drawerApi.setState({
    confirmText: text,
  });
}

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
    if (!selectedBillRecord.value) {
      billSelectionError.value = '请先选择一条付款单，再进入下一步';
      return;
    }
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
  selectedBillKeys.value = [];
  selectedBillRecord.value = null;
  billSelectionError.value = '';
  // 重置步骤
  current.value = 0;
  await nextTick();
  updateConfirmText();
}

const billList = ref<any[]>([]);
async function getBillList() {
  const res = await crmBillList({
    pageNum: 1,
    pageSize: 100,
    billTypes: 2,
    customerId: formData.value.customerId,
  });
  billList.value = res?.rows ?? [];
  if (formData.value.linkBill !== undefined && formData.value.linkBill !== null) {
    const selectedRow = billList.value.find((item) => {
      return (
        String(item?.id) === String(formData.value.linkBill) ||
        String(item?.billNo) === String(formData.value.linkBill)
      );
    });
    if (selectedRow) {
      handleBillSelect(selectedRow);
    }
  }
}
const contractList = ref<any[]>([]);
async function getContractList() {
  const res = await crmContractSelectList({
    customerId: formData.value.customerId,
  });
  contractList.value = res?.rows ?? [];
}
const columns = [
  {
    title: '付款单号',
    dataIndex: 'billNo',
    key: 'billNo',
  },
  {
    title: '合同ID',
    dataIndex: 'contractId',
    key: 'contractId',
  },
  {
    title: '金额',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '收款日期',
    dataIndex: 'date',
    key: 'date',
  },
];

function handleBillSelect(record: any) {
  selectedBillRecord.value = record;
  selectedBillKeys.value = [record?.id];
  billSelectionError.value = '';
  formData.value.linkBill = record?.id ?? record?.billNo;
  formData.value.contractId = record?.contractId;
  formData.value.amount = record?.num;
}

const rowSelection = computed(() => ({
  type: 'radio' as const,
  selectedRowKeys: selectedBillKeys.value,
  onChange: (_keys: Array<number | string>, rows: any[]) => {
    const record = rows?.[0];
    if (!record) {
      selectedBillKeys.value = [];
      selectedBillRecord.value = null;
      return;
    }
    handleBillSelect(record);
  },
}));

function getBillRowKey(record: { id?: number | string }) {
  return record?.id ?? '';
}

const stepItems = [
  { title: '选择付款订单' },
  { title: '填写发票信息' },
];
</script>

<template>
  <BasicDrawer :title="title">
    <Steps :current="current" :items="stepItems" />
    <Alert v-if="current === 0 && billSelectionError" :message="billSelectionError" type="error" show-icon />
    <Table
      v-if="current === 0"
      :columns="columns"
      :data-source="billList"
      :row-key="getBillRowKey"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'num'">{{ text ?? 0 }}</template>
      </template>
    </Table>
    <Form
      v-if="current === 1"
      ref="formInstance"
      :model="formData"
      :rules="formRules"
      :label-col="{ span: 4 }"
    >
      <FormItem name="serialNumber" label="发票流水号" :rules="formRules.serialNumber">
        <Input
          v-model:value="formData.serialNumber"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="customerId" label="客户ID" :rules="formRules.customerId">
        <Input
          v-model:value="formData.customerId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="contractId" label="合同ID" :rules="formRules.contractId">
        <Select
          v-model:value="formData.contractId"
          :options="contractList"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
          :field-names="{ label: 'contractName', value: 'id' }"
        />
      </FormItem>
      <FormItem name="categoryId" label="发票类目ID" :rules="formRules.categoryId">
        <Input
          v-model:value="formData.categoryId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="name" label="发票名称" :rules="formRules.name">
        <Input
          v-model:value="formData.name"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="num" label="发票编号" :rules="formRules.num">
        <Input
          v-model:value="formData.num"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="price" label="合同金额" :rules="formRules.price">
        <Input
          v-model:value="formData.price"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="amount" label="发票金额" :rules="formRules.amount">
        <Input
          v-model:value="formData.amount"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="types" label="发票类型" :rules="formRules.types">
        <Select
          v-model:value="formData.types"
          :options="getDictOptions('invoice_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem name="title" label="发票抬头" :rules="formRules.title">
        <Input
          v-model:value="formData.title"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="ident" label="纳税人识别号" :rules="formRules.ident">
        <Input
          v-model:value="formData.ident"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="bank" label="开户行" :rules="formRules.bank">
        <Input
          v-model:value="formData.bank"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="account" label="开户账号" :rules="formRules.account">
        <Input
          v-model:value="formData.account"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="address" label="开票地址" :rules="formRules.address">
        <Input
          v-model:value="formData.address"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="tel" label="电话" :rules="formRules.tel">
        <Input
          v-model:value="formData.tel"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="collectName" label="邮寄联系人" :rules="formRules.collectName">
        <Input
          v-model:value="formData.collectName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="collectTel" label="邮寄联系电话" :rules="formRules.collectTel">
        <Input
          v-model:value="formData.collectTel"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="collectType" label="邮寄方式" :rules="formRules.collectType">
        <Select
          v-model:value="formData.collectType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem name="collectEmail" label="邮寄邮箱" :rules="formRules.collectEmail">
        <Input
          v-model:value="formData.collectEmail"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="mailAddress" label="邮寄地址" :rules="formRules.mailAddress">
        <Input
          v-model:value="formData.mailAddress"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="invoiceType" label="开票方式" :rules="formRules.invoiceType">
        <Select
          v-model:value="formData.invoiceType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem name="invoiceAddress" label="开票地址" :rules="formRules.invoiceAddress">
        <Input
          v-model:value="formData.invoiceAddress"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="status" label="发票状态" :rules="formRules.status">
        <Select
          v-model:value="formData.status"
          :options="getDictOptions('invoice_status', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem name="invalid" label="作废状态" :rules="formRules.invalid">
        <Input
          v-model:value="formData.invalid"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="billDate" label="开票日期" :rules="formRules.billDate">
        <DatePicker
          v-model:value="formData.billDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem name="realDate" label="实际开票日期" :rules="formRules.realDate">
        <DatePicker
          v-model:value="formData.realDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem name="mark" label="备注内容" :rules="formRules.mark">
        <TextArea
          v-model:value="formData.mark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
      <FormItem name="remark" label="开票备注" :rules="formRules.remark">
        <Input
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="cardRemark" label="业务员备注" :rules="formRules.cardRemark">
        <Input
          v-model:value="formData.cardRemark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="financeRemark" label="财务备注" :rules="formRules.financeRemark">
        <Input
          v-model:value="formData.financeRemark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="linkId" label="关联审批ID" :rules="formRules.linkId">
        <Input
          v-model:value="formData.linkId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="revokeId" label="撤销申请ID" :rules="formRules.revokeId">
        <Input
          v-model:value="formData.revokeId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem name="linkBill" label="关联付款单ID" :rules="formRules.linkBill">
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
