<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { Rule } from 'antdv-next/dist/form/types';

import type { CrmCustomerForm } from '#/api/crm/crmCustomer/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer, listToTree } from '@vben/utils';

import {
  Col,
  Form,
  FormItem,
  Input,
  Row,
  Select,
  TabPane,
  Tabs,
  TextArea,
  TreeSelect
} from 'antdv-next';
import { pick } from 'lodash-es';

import {
  crmCustomerAdd,
  crmCustomerInfo,
  crmCustomerUpdate,
} from '#/api/crm/crmCustomer';
import { labelSelectList } from '#/api/crm/crmCustomerLabel';
import { regionList } from '#/api/system/region';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

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

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<CrmCustomerForm>>({});

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
  class: 'w-[950px]',
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
      const record = await crmCustomerInfo(id);
      record.customerLabel = record?.customerLabel =='' ? [] : record.customerLabel?.split(',');
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    await markInitialized();
    visible.value = true;
    setupRegionSelect();
    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    await formInstance.value?.validate();
    const data = cloneDeep(formData.value);
    data.customerLabel = data.customerLabel?.join(',');
    await (isUpdate.value ? crmCustomerUpdate(data) : crmCustomerAdd(data));
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
const labelList = ref([]);
getLabelList();
function getLabelList() {
  labelSelectList().then((res) => {
    labelList.value = listToTree(res, { id: 'id', pid: 'pid' });
  });
}
const treeData = ref<any[]>([]);
async function setupRegionSelect() {
  const listData = await regionList();
  treeData.value = listToTree(listData, { id: 'id', pid: 'parentId' });
}
</script>

<template>
  <BasicDrawer :title="title">
    <Tabs>
      <TabPane key="1" tab="基本信息">
        <Form :label-col="{ span: 4 }" ref="formInstance" :model="formData">
          <Row>
            <Col span="12">
              <FormItem label="客户编号" :rules="formRules.customerNo">
                <Input
                  v-model:value="formData.customerNo"
                  placeholder="系统自动生成"
                  disabled
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户名称" :rules="formRules.customerName">
                <Input
                  v-model:value="formData.customerName"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="客户电话" :rules="formRules.customerPhone">
                <Input
                  v-model:value="formData.customerPhone"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户标签" :rules="formRules.customerLabel">
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
            </Col>
</Row>
          <Row>
            <Col span="12">
              <FormItem label="客户来源" :rules="formRules.customerWay">
                <Select
                  v-model:value="formData.customerWay"
                  :options="getDictOptions('customer_way')"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="省市区" :rules="formRules.areaCascade">
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
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="详细地址" :rules="formRules.address">
                <Input
                  v-model:value="formData.address"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户状态" :rules="formRules.customerStatus">
                <Select
                  v-model:value="formData.customerStatus"
                  :options="getDictOptions('customer_status')"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                  :allow-clear="true"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="备注" :rules="formRules.remark">
                <TextArea
                  v-model:value="formData.remark"
                  :placeholder="$t('ui.formRules.required')"
                  :rows="4"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane v-if="title === '编辑'" key="2" tab="跟进记录">
        <customerFollow v-if="visible" :customerid="formData.id" />
      </TabPane>
      <TabPane v-if="title === '编辑'" key="3" tab="联系人">
        <customerLiaison v-if="visible" :customerid="formData.id" />
      </TabPane>
      <TabPane v-if="title === '编辑'" key="4" tab="合同">
        <contract v-if="visible" :customerid="formData.id" />
      </TabPane>
      <TabPane v-if="title === '编辑'" key="5" tab="账目记录">
        <bill v-if="visible" :customerid="formData.id" />
      </TabPane>
      <TabPane v-if="title === '编辑'" key="6" tab="发票">
        <invoice v-if="visible" :customerid="formData.id" />
      </TabPane>
      <TabPane v-if="title === '编辑'" key="7" tab="团队成员">
        <customerTeam v-if="visible" :customerid="formData.id" />
      </TabPane>
      <TabPane v-if="title === '编辑'" key="8" tab="动态记录">
        <customerRecord v-if="visible" :customerid="formData.id" />
      </TabPane>
    </Tabs>
  </BasicDrawer>
</template>
