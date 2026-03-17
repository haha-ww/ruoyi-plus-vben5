<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { CrmBillForm } from '#/api/crm/crmBill/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  DatePicker,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Select,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { crmBillAdd, crmBillInfo, crmBillUpdate } from '#/api/crm/crmBill';
import { crmContractSelectList } from '#/api/crm/crmContract';
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

    const { id, customerId } = drawerApi.getData() as {
      customerId?: number | string;
      id?: number | string;
    };
    isUpdate.value = !!id;
    formData.value.customerId = customerId;
    if (isUpdate.value && id) {
      const record = await crmBillInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    getContractList();
    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? crmBillUpdate(data) : crmBillAdd(data));
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

const contractList = ref([]);
async function getContractList() {
  contractList.value = await crmContractSelectList({
    customerId: formData.value.customerId,
  });
}
</script>

<template>
  <BasicDrawer :title="title">
    <Form :label-col="{ span: 4 }" ref="formInstance" :model="formData">
      <FormItem label="合同" :rules="formRules.contractId">
        <Select
          v-model:value="formData.contractId"
          :options="contractList"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
          :field-names="{ label: 'contractName', value: 'id' }"
        />
      </FormItem>
      <FormItem label="财务科目" :rules="formRules.billCateId">
        <Input
          v-model:value="formData.billCateId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="类型" :rules="formRules.billTypes">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.billTypes"
          :options="getDictOptions('bill_type', true)"
        />
      </FormItem>
      <FormItem label="金额" :rules="formRules.num">
        <Input
          v-model:value="formData.num"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>

      <FormItem label="支付方式" :rules="formRules.typeId">
        <Select
          v-model:value="formData.typeId"
          :options="getDictOptions('pay_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="收款日期" :rules="formRules.date">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="付款单号" :rules="formRules.billNo">
        <Input
          v-model:value="formData.billNo"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="备注" :rules="formRules.remark">
        <Input
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
