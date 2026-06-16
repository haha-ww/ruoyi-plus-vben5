<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { SalesOrderForm } from '#/api/erp/salesOrder/model';
import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';

import { computed, ref, watch } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  TextArea,
  TreeSelect
} from 'antdv-next';
import { pick } from 'lodash-es';

import { salesOrderAdd, salesOrderInfo, salesOrderUpdate } from '#/api/erp/salesOrder';
import { deptTreeSelect } from '#/api/system/user';
import { listCustomerSelect,liststaffSelect } from '#/api/wcommon';
import { DictTag } from '#/components/dict';
import SelectMaterial from '#/components/select-material/src/index.vue';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';
const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);
const title = computed(() => {
  if (!viewMode.value) {
    return '详情';
  }
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const defaultValues: Partial<SalesOrderForm> = {
  id: undefined,
  orderCode: undefined,
  customerId: undefined,
  orderStatus: '10',
  deptId: undefined,
  salesPersonId: undefined,
  orderSource: undefined,
  isInvoice: undefined,
  voucherType: undefined,
  taxRate: undefined,
  totalTaxAmount: undefined,
  discountRate: undefined,
  totalDiscountAmount: undefined,
  favourableAmount: undefined,
  netAmount: undefined,
  orderTotalAmount: undefined,
  deliveryAddress: undefined,
  orderRemark: undefined,
  deliveryDate: undefined,
  settlementMethod: undefined,
  bankAccountId: undefined,
  settlementAccountNumber: undefined,
  prepaymentAmount: undefined,
  finalPaymentAmount: undefined,
  shippingFeeAmount: undefined,
  shippingFeeBearer: undefined,
  isMrp: undefined,
  approver: undefined,
  approvalTime: undefined,
};

const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
const formRules = ref<AntdFormRules<SalesOrderForm>>({});

const formInstance = ref<FormInstance>();

const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const currentEditRow = ref<null | SalesOrderItemVO>(null);

const salesOrderItemList = ref<SalesOrderItemVO[]>([]);

// 下拉选项数据
const customerOptions = ref<Array<{ label: string; value: number | string; }>>([]);
const staffOptions = ref<Array<{ label: string; value: number | string; }>>([]);
const deptTreeData = ref<any[]>([]);

function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, salesOrderItemList: salesOrderItemList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

// 加载客户列表
async function loadCustomerOptions() {
  try {
    const response = await listCustomerSelect();
    customerOptions.value = response;
  } catch (error) {
    console.error('加载客户列表失败:', error);
  }
}

// 加载部门树
async function loadDeptTree() {
  try {
    const response = await deptTreeSelect();
    deptTreeData.value = response
  } catch (error) {
    console.error('加载部门树失败:', error);
  }
}

// 加载销售人员列表
async function loadStaffOptions(deptId?: number | string) {
  try {
    const response = await liststaffSelect({ deptId });
    staffOptions.value = response
  } catch (error) {
    console.error('加载销售人员列表失败:', error);
  }
}

function handleOpenSelectMaterial(row: SalesOrderItemVO) {
  currentEditRow.value = row;
  selectMaterialRef.value?.open();
}

function handleMaterialSelect(rows: MaterialInfoVO[]) {
  if (rows.length > 0 && currentEditRow.value) {
    const selected = rows[0];
    currentEditRow.value.materialId = selected.id;
    currentEditRow.value.materialName = selected.materialName;
    currentEditRow.value.materialCode = selected.materialCode;
    currentEditRow.value.model = selected.model;
    currentEditRow.value.unitName = selected.unitName;
    currentEditRow.value.taxRate = selected.taxRate;
    currentEditRow.value.taxPrice = selected.salesTaxPrice;
    calculateTaxAmount(currentEditRow.value);
  }
}

function calculateTaxAmount(row: SalesOrderItemVO) {
  row.actualTotalAmount = row.quantity && row.taxIncludedPrice ? Number((row.quantity * row.taxIncludedPrice).toFixed(2)) : undefined;
  calculateOrderAmounts();
}

function calculateOrderAmounts() {
  // 计算订单总金额（所有明细行含税金额之和）
  const totalTaxAmount = salesOrderItemList.value.reduce((sum, item) => {
    return sum + (item.actualTotalAmount || 0);
  }, 0);
  formData.value.totalTaxAmount = Number(totalTaxAmount.toFixed(2));

  // 计算折扣金额
  if (formData.value.discountRate && formData.value.totalTaxAmount) {
    const discountAmount = (formData.value.totalTaxAmount * formData.value.discountRate) / 100;
    formData.value.totalDiscountAmount = Number(discountAmount.toFixed(2));
  }

  // 计算最终结算金额
  if (formData.value.totalTaxAmount) {
    const finalAmount = formData.value.totalTaxAmount - (formData.value.totalDiscountAmount || 0) - (formData.value.favourableAmount || 0);
    formData.value.orderTotalAmount = Number(Math.max(0, finalAmount).toFixed(2));
  }
}

function handleAddRow() {
  const record: SalesOrderItemVO = {
    id: Date.now(),
    materialId: undefined,
    materialName: undefined,
    materialCode: undefined,
    model: undefined,
    unitName: undefined,
    quantity: undefined,
    taxIncludedPrice: undefined,
    taxRate: undefined,
    actualTotalAmount: undefined,
    requiredDeliveryDate: undefined,
    stockQuantity: undefined,
    remark: undefined,
  };
  salesOrderItemList.value.push(record);
}

function handleRemoveRow(row: SalesOrderItemVO) {
  const index = salesOrderItemList.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    salesOrderItemList.value.splice(index, 1);
    calculateOrderAmounts();
  }
}

// 监听折扣率和优惠金额变化
watch(
  () => [formData.value.discountRate, formData.value.favourableAmount],
  () => {
    calculateOrderAmounts();
  },
  { deep: true }
);

// 监听部门变化，更新销售人员列表
watch(
  () => formData.value.deptId,
  (newDeptId) => {
    loadStaffOptions(newDeptId);
  }
);

const columns: TableColumnsType<SalesOrderItemVO> = [
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
    render: (_: any, record: SalesOrderItemVO) => (
      <Button onClick={() => handleOpenSelectMaterial(record)} size="small" type="link">
        {record.materialName || '请选择'}
      </Button>
    ),
  },
  {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width: 120,
  },
  {
    title: '物料规格',
    dataIndex: 'model',
    key: 'model',
    width: 120,
  },
  {
    title: '物料单位',
    dataIndex: 'unitName',
    key: 'unitName',
    width: 80,
  },
  {
    title: '订单数量',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
    render: (_: any, record: SalesOrderItemVO) => (
      <InputNumber
        min={0}
        onChange={() => calculateTaxAmount(record)}
        placeholder="请输入"
        precision={2}
        style={{ width: '100%' }}
        v-model:value={record.quantity}
      />
    ),
  },
  {
    title: '含税单价',
    dataIndex: 'taxIncludedPrice',
    key: 'taxIncludedPrice',
    width: 100,
    render: (_: any, record: SalesOrderItemVO) => (
      <InputNumber
        min={0}
        onChange={() => calculateTaxAmount(record)}
        placeholder="请输入"
        precision={2}
        style={{ width: '100%' }}
        v-model:value={record.taxIncludedPrice}
      />
    ),
  },
  {
    title: '税率(%)',
    dataIndex: 'taxRate',
    key: 'taxRate',
    width: 120,
    render: (_: any, record: SalesOrderItemVO) => (
      <Select
        allowClear
        getPopupContainer={getPopupContainer}
        onChange={() => calculateTaxAmount(record)}
        options={getDictOptions('tax_rate', true)}
        placeholder="请选择"
        style={{ width: '100%' }}
        v-model:value={record.taxRate}
      />
    ),
  },
  {
    title: '含税金额',
    dataIndex: 'actualTotalAmount',
    key: 'actualTotalAmount',
    width: 100,
  },
  {
    title: '要求交货日期',
    dataIndex: 'requiredDeliveryDate',
    key: 'requiredDeliveryDate',
    width: 150,
    render: (_: any, record: SalesOrderItemVO) => (
      <DatePicker
        format="YYYY-MM-DD"
        style={{ width: '100%' }}
        v-model:value={record.requiredDeliveryDate}
        value-format="YYYY-MM-DD"
      />
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 80,
    fixed: 'right' as const,
    render: (_: any, record: SalesOrderItemVO) => (
      <Button danger onClick={() => handleRemoveRow(record)} size="small">
        删除
      </Button>
    ),
  },
];

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1100px]',
  fullscreen: true,
  fullscreenButton: false,
  onBeforeClose,
  showConfirmButton: false,
  onClosed: handleClosed,
  onConfirm: () => handleConfirm(20),
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    // 加载下拉数据
    await Promise.all([
      loadCustomerOptions(),
      loadDeptTree(),
      loadStaffOptions()
    ]);

    const { id, viewMode: isViewMode } = modalApi.getData() as { id?: number | string; viewMode?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!isViewMode;
// 动态更新 showConfirmButton
    modalApi.setState({ showConfirmButton: viewMode.value });
    if (isUpdate.value && id) {
      const record = await salesOrderInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      salesOrderItemList.value =
        record.orderItems && record.orderItems.length > 0
          ? record.orderItems
          : [];
      // 加载对应部门的销售人员
      if (formData.value.deptId) {
        await loadStaffOptions(formData.value.deptId);
      }
    } else {
      salesOrderItemList.value = [];
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm(orderStatus: number) {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if (salesOrderItemList.value.length === 0) {
      alert({
        content: '销售订单明细不能为空，请添加明细',
        icon: 'warning',
      });
      return;
    }
    for (let i = 0; i < salesOrderItemList.value.length; i++) {
      const row = salesOrderItemList.value[i];
      if (!row.materialName) {
        alert({
          content: `第${i + 1}行物料名称不能为空`,
          icon: 'warning',
        });
        return;
      }
      if (!row.quantity || row.quantity <= 0) {
        alert({
          content: `第${i + 1}行订单数量必须大于0`,
          icon: 'warning',
        });
        return;
      }
      if (!row.requiredDeliveryDate) {
        alert({
          content: `第${i + 1}行要求交货日期不能为空`,
          icon: 'warning',
        });
        return;
      }
    }
    formData.value.orderStatus = orderStatus;
    const data = cloneDeep(formData.value);
    data.orderItems = salesOrderItemList.value;
    await (isUpdate.value ? salesOrderUpdate(data) : salesOrderAdd(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  salesOrderItemList.value = [];
  viewMode.value = false;
  resetInitialized();
}

</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 6 }" ref="formInstance" :model="formData" :disabled="!viewMode">
      <Divider orientation="left">基本信息</Divider>
      <Row :gutter="24">
        <Col :span="8">
          <FormItem label="销售订单编码" name="orderCode" :rules="formRules.orderCode">
            <Input v-model:value="formData.orderCode" placeholder="系统自动生成" disabled />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="客户名称" name="customerId" :rules="formRules.customerId">
            <Select
              v-model:value="formData.customerId"
              :options="customerOptions"
              :field-names="{
            label: 'customerName',
            value: 'id',
          }"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              clearable
            />
          </FormItem>
        </Col>
        
        <Col :span="8">
          <FormItem label="部门" name="deptId" :rules="formRules.deptId">
            <TreeSelect
              v-model:value="formData.deptId"
              :tree-data="deptTreeData"
              :field-names="{ label: 'label', value: 'id' }"
              :placeholder="$t('ui.formRules.selectRequired')"
              style="width: 100%"
              tree-default-expand-all
              clearable
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="销售人员" name="salesPersonId" :rules="formRules.salesPersonId">
            <Select
              v-model:value="formData.salesPersonId"
              :options="staffOptions"
              :field-names="{
            label: 'name',
            value: 'id',
          }"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              clearable
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="订单来源" name="orderSource" :rules="formRules.orderSource">
            <Input
              v-model:value="formData.orderSource"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="交货地址" name="deliveryAddress" :rules="formRules.deliveryAddress">
            <Input
              v-model:value="formData.deliveryAddress"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        <Col :span="16">
          <FormItem label="订单备注" name="orderRemark" :rules="formRules.orderRemark">
            <TextArea
              v-model:value="formData.orderRemark"
              :placeholder="$t('ui.formRules.required')"
              :rows="2"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="订单状态" name="orderStatus" :rules="formRules.orderStatus">
            <div class="flex items-center">
              <DictTag :dicts="getDictOptions('sales_order_status')" :value="formData.orderStatus" />
            </div>
          </FormItem>
        </Col>
        <Divider orientation="left">销售订单明细</Divider>
        <div class="ml-10" v-if="viewMode">
          <a-button type="primary" @click="handleAddRow">新增行</a-button>
        </div>
        <Table
          :columns="columns"
          :data-source="salesOrderItemList"
          row-key="id"
          :pagination="false"
          :scroll="{ x: '100%' }"
          style="margin: 0 16px;"
        />
        <Col :span="8">
          <FormItem label="订单总金额" name="totalTaxAmount" :rules="formRules.totalTaxAmount">
            <InputNumber
              v-model:value="formData.totalTaxAmount"
              :min="0"
              :precision="2"
              style="width: 100%"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        
        <Col :span="8">
          <FormItem label="折扣率(%)" name="discountRate" :rules="formRules.discountRate">
            <InputNumber
              v-model:value="formData.discountRate"
              :min="0"
              :max="100"
              :precision="2"
              style="width: 100%"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="折扣金额" name="totalDiscountAmount" :rules="formRules.totalDiscountAmount">
            <InputNumber
              v-model:value="formData.totalDiscountAmount"
              :min="0"
              :precision="2"
              style="width: 100%"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        
        
        <Col :span="8">
          <FormItem label="优惠金额" name="favourableAmount" :rules="formRules.favourableAmount">
            <InputNumber
              v-model:value="formData.favourableAmount"
              :min="0"
              :precision="2"
              style="width: 100%"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="最终结算金额" name="orderTotalAmount" :rules="formRules.orderTotalAmount">
            <InputNumber
              v-model:value="formData.orderTotalAmount"
              :min="0"
              :precision="2"
              style="width: 100%"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <SelectMaterial
      ref="selectMaterialRef"
      @update:value="(rows: MaterialInfoVO[]) => handleMaterialSelect(rows)"
    />
    <template #center-footer v-if="viewMode">
      <a-button color="green" variant="solid" @click="handleConfirm(10)">暂存</a-button>
    </template>
  </BasicModal>
</template>
