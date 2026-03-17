<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { CrmContractForm } from '#/api/crm/crmContract/model';

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
  Textarea,
} from 'antdv-next';
import { pick } from 'lodash-es';

import {
  crmContractAdd,
  crmContractInfo,
  crmContractUpdate,
} from '#/api/crm/crmContract';
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
const defaultValues: Partial<CrmContractForm> = {
  id: undefined,
  customerId: undefined,
  contractName: undefined,
  contractNo: undefined,
  contractPrice: undefined,
  received: undefined,
  surplus: undefined,
  contractFollowed: undefined,
  contractStatus: undefined,
  startDate: undefined,
  endDate: undefined,
  signingStatus: undefined,
  contractCategory: undefined,
  isAbnormal: undefined,
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

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await crmContractInfo(id);
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
    await (isUpdate.value ? crmContractUpdate(data) : crmContractAdd(data));
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
      <FormItem label="客户ID" :rules="formRules.customerId">
        <Input
          v-model:value="formData.customerId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="合同名称" :rules="formRules.contractName">
        <Input
          v-model:value="formData.contractName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="订单编号" :rules="formRules.contractNo">
        <Input
          v-model:value="formData.contractNo"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="合同金额(元)" :rules="formRules.contractPrice">
        <Input
          v-model:value="formData.contractPrice"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="回款金额" :rules="formRules.received">
        <Input
          v-model:value="formData.received"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="尾款金额" :rules="formRules.surplus">
        <Input
          v-model:value="formData.surplus"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="是否关注" :rules="formRules.contractFollowed">
        <Input
          v-model:value="formData.contractFollowed"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="合同状态" :rules="formRules.contractStatus">
        <Select
          v-model:value="formData.contractStatus"
          :options="getDictOptions('contract_status')"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="开始时间" :rules="formRules.startDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.startDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="结束时间" :rules="formRules.endDate">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.endDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="签约状态" :rules="formRules.signingStatus">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.signingStatus"
          :options="[]"
        />
      </FormItem>
      <FormItem label="合同分类" :rules="formRules.contractCategory">
        <Select
          v-model:value="formData.contractCategory"
          :options="getDictOptions('contract_type', true)"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="是否异常：1、是；0、否；" :rules="formRules.isAbnormal">
        <Input
          v-model:value="formData.isAbnormal"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="备注" :rules="formRules.remark">
        <Textarea
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
