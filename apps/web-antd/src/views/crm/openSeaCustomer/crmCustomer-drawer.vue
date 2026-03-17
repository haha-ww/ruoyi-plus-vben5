<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form';

import type { CrmCustomerForm } from '#/api/crm/crmCustomer/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer, listToTree } from '@vben/utils';

import {
  Form,
  FormItem,
  Input,
  Select,
  Textarea,
  TreeSelect,
} from 'ant-design-vue';
import { pick } from 'lodash-es';

import {
  crmCustomerAdd,
  crmCustomerInfo,
  crmCustomerUpdate,
} from '#/api/crm/crmCustomer';
import { labelSelectList } from '#/api/crm/crmCustomerLabel';
import { regionList } from '#/api/system/region';
import { getDictOptions } from '#/utils/dict';

import bill from '../crmCustomerBill/index.vue';
import contract from '../crmCustomerContract/index.vue';
import customerFollow from '../crmCustomerFollow/index.vue';
import invoice from '../crmCustomerInvoice/index.vue';
import customerLiaison from '../crmCustomerLiaison/index.vue';
import customerRecord from '../crmCustomerRecord/index.vue';
import customerTeam from '../crmCustomerTeam/index.vue';

const emit = defineEmits<{ reload: [] }>();
const visible = ref(false);
const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<CrmCustomerForm> = {
  id: undefined,
  uid: undefined,
  beforeUid: undefined,
  customerName: undefined,
  customerLabel: undefined,
  customerNo: undefined,
  customerWay: undefined,
  unFollowedDays: undefined,
  amountRecorded: undefined,
  amountExpend: undefined,
  invoicedAmount: undefined,
  contractNum: undefined,
  invoiceNum: undefined,
  attachmentNum: undefined,
  returnNum: undefined,
  customerFollowed: undefined,
  customerStatus: undefined,
  areaCascade: undefined,
  customerPhone: undefined,
  address: undefined,
  file: undefined,
  lastFollowUpTime: undefined,
  collectTime: undefined,
  remark: undefined,
};

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
const formRules = ref<AntdFormRules<CrmCustomerForm>>({
  customerName: [{ required: true, message: '客户名称不能为空' }],
});

/**
 * useForm解构出表单方法
 */
const { validate, validateInfos, resetFields } = Form.useForm(
  formData,
  formRules,
);

const [BasicDrawer, drawerApi] = useVbenDrawer({
  class: 'w-[950px]',
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
      const record = await crmCustomerInfo(id);
      record.customerLabel = record.customerLabel?.split(',');
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    visible.value = true;
    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.drawerLoading(true);
    await validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    data.customerLabel = data.customerLabel?.join(',');
    await (isUpdate.value ? crmCustomerUpdate(data) : crmCustomerAdd(data));
    emit('reload');
    await handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.drawerLoading(false);
  }
}

async function handleCancel() {
  visible.value = false;
  drawerApi.close();
  formData.value = defaultValues;
  resetFields();
}
const labelList = ref([]);
getLabelList();
function getLabelList() {
  labelSelectList().then((res) => {
    labelList.value = listToTree(res, { id: 'id', pid: 'pid' });
  });
}
const treeData = ref<any[]>([]);
setupRegionSelect();
async function setupRegionSelect() {
  const listData = await regionList();
  treeData.value = listToTree(listData, { id: 'id', pid: 'parentId' });
}
</script>

<template>
  <BasicDrawer :title="title">
    <a-tabs>
      <a-tab-pane key="1" tab="基本信息">
        <Form :label-col="{ span: 4 }">
          <a-row>
            <a-col span="12">
              <FormItem label="客户名称" v-bind="validateInfos.customerName">
                <Input
                  v-model:value="formData.customerName"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </a-col>
            <a-col span="12">
              <FormItem label="客户电话" v-bind="validateInfos.customerPhone">
                <Input
                  v-model:value="formData.customerPhone"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <FormItem label="客户标签" v-bind="validateInfos.customerLabel">
                <TreeSelect
                  v-model:value="formData.customerLabel"
                  :tree-data="labelList"
                  :tree-line="{ showLeafIcon: false }"
                  :get-popup-container="getPopupContainer"
                  multiple
                  :field-names="{ label: 'name', value: 'id' }"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </a-col>
            <a-col span="12">
              <FormItem label="客户编号" v-bind="validateInfos.customerNo">
                <Input
                  v-model:value="formData.customerNo"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <FormItem label="客户来源" v-bind="validateInfos.customerWay">
                <Select
                  v-model:value="formData.customerWay"
                  :options="getDictOptions('customer_way')"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                  :allow-clear="true"
                />
              </FormItem>
            </a-col>
            <a-col span="12">
              <FormItem label="省市区" v-bind="validateInfos.areaCascade">
                <TreeSelect
                  :tree-data="treeData"
                  :tree-line="{ showLeafIcon: false }"
                  :field-names="{ label: 'name', value: 'id' }"
                  :placeholder="$t('ui.formRules.selectRequired')"
                  :get-popup-container="getPopupContainer"
                  :allow-clear="true"
                  :show-search="true"
                  tree-node-filter-prop="name"
                  v-model:value="formData.areaCascade"
                />
              </FormItem>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <FormItem label="详细地址" v-bind="validateInfos.address">
                <Input
                  v-model:value="formData.address"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </a-col>
            <a-col span="12">
              <FormItem label="客户状态" v-bind="validateInfos.customerStatus">
                <Select
                  v-model:value="formData.customerStatus"
                  :options="getDictOptions('customer_status')"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                  :allow-clear="true"
                />
              </FormItem>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="24">
              <FormItem label="备注" v-bind="validateInfos.remark">
                <Textarea
                  v-model:value="formData.remark"
                  :placeholder="$t('ui.formRules.required')"
                  :rows="4"
                />
              </FormItem>
            </a-col>
          </a-row>
        </Form>
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="2" tab="跟进记录">
        <customerFollow v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="3" tab="联系人">
        <customerLiaison v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="4" tab="合同">
        <contract v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="5" tab="账目记录">
        <bill v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="6" tab="发票">
        <invoice v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="7" tab="团队成员">
        <customerTeam v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
      <a-tab-pane v-if="title === '编辑'" key="8" tab="动态记录">
        <customerRecord v-if="visible" :customerid="formData.id" />
      </a-tab-pane>
    </a-tabs>
  </BasicDrawer>
</template>
