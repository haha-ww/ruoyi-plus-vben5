<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { PurchaseOrderForm } from '#/api/erp/purchaseOrder/model';
import type { PurchaseOrderItemVO } from '#/api/erp/purchaseOrderItem/model';
import type { PurchasePlanItemVO } from '#/api/erp/purchasePlanItem/model';
import {SelectPurchasePlan} from '#/components/select-purchase-plan';
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
  Space,
  Table,
  TextArea,
  TreeSelect
} from 'antdv-next';
import { pick } from 'lodash-es';

import { purchaseOrderAdd, purchaseOrderInfo, purchaseOrderUpdate } from '#/api/erp/purchaseOrder';
import { deptTreeSelect } from '#/api/system/user';
import { liststaffSelect, listSupplierSelect } from '#/api/wcommon';
import { DictTag } from '#/components/dict';
import SelectMaterial from '#/components/select-material/src/index.vue';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

/**
 * 采购订单明细行（包含后端字段 + 前端展示字段）
 */
interface PurchaseOrderItemRow {
  // PurchaseOrderItemVO 字段
  id?: number | string;
  orderId?: number | string;
  materialId?: number | string;
  quantity?: number;
  remainQuantity?: number;
  planItemId?: number | string;
  taxIncludedPrice?: number;
  taxRate?: number;
  taxExcludedPrice?: number;
  taxTotalAmount?: number;
  actualTotalAmount?: number;
  remark?: string;
  // 前端展示字段（从物料选择器填充）
  materialName?: string;
  materialCode?: string;
  model?: string;
}

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);
const title = computed(() => {
  if (!viewMode.value) {
    return '详情';
  }
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PurchaseOrderForm> = {
  id: undefined,
  purchaseCode: undefined,
  supplierId: undefined,
  purchaseType: undefined,
  deptId: undefined,
  salesperson: undefined,
  orderStatus: '10',
  isInvoice: undefined,
  requiredDeliveryDate: undefined,
  remark: undefined,
  settlementMethod: undefined,
  prepaymentAmount: undefined,
  currency: undefined,
  bankAccountId: undefined,
  orderTotalAmount: undefined,
  totalTaxAmount: undefined,
  discountAmount: 0,
  settlementAccountNumber: undefined,
  approver: undefined,
  approvalTime: undefined,
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
const formRules = ref<AntdFormRules<PurchaseOrderForm>>({});

const formInstance = ref<FormInstance>();

const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const selectPurchasePlanRef = ref<InstanceType<typeof SelectPurchasePlan>>();
const currentEditRow = ref<null | PurchaseOrderItemRow>(null);

const purchaseOrderItemList = ref<PurchaseOrderItemRow[]>([]);

// 下拉选项数据
const supplierOptions = ref<Array<{ label: string; value: number | string; }>>([]);
const staffOptions = ref<Array<{ label: string; value: number | string; }>>([]);
const deptTreeData = ref<any[]>([]);

// 加载供应商列表
async function loadSupplierOptions() {
  try {
    const response = await listSupplierSelect();
    supplierOptions.value = response;
  } catch (error) {
    console.error('加载供应商列表失败:', error);
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

// 加载采购人员列表
async function loadStaffOptions(deptId?: number | string) {
  try {
    const response = await liststaffSelect({ deptId });
    staffOptions.value = response
  } catch (error) {
    console.error('加载采购人员列表失败:', error);
  }
}


function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, purchaseOrderItemList: purchaseOrderItemList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

function handleOpenSelectMaterial(row: PurchaseOrderItemRow) {
  currentEditRow.value = row;
  selectMaterialRef.value?.open();
}

function handleMaterialSelect(rows: MaterialInfoVO[]) {
  if (rows.length > 0 && currentEditRow.value) {
    const selected = rows[0]!;
    currentEditRow.value.materialId = selected.id;
    currentEditRow.value.materialName = selected.materialName;
    currentEditRow.value.materialCode = selected.materialCode;
    currentEditRow.value.model = selected.model;
    currentEditRow.value.taxRate = selected.taxRate;
    currentEditRow.value.taxIncludedPrice = selected.purchasePrice;
    calculateAmounts(currentEditRow.value);
  }
}

function calculateAmounts(row: PurchaseOrderItemRow) {
  if (row.quantity && row.taxIncludedPrice) {
    row.taxTotalAmount = Number((row.quantity * row.taxIncludedPrice).toFixed(2));
    if (row.taxRate) {
      const exclusivePrice = row.taxIncludedPrice / (1 + row.taxRate / 100);
      row.taxExcludedPrice = Number(exclusivePrice.toFixed(2));
      row.actualTotalAmount = Number((row.quantity * exclusivePrice).toFixed(2));
    }
  } else {
    row.taxTotalAmount = undefined;
    row.taxExcludedPrice = undefined;
    row.actualTotalAmount = undefined;
  }
  calculateOrderAmounts();
}

function calculateOrderAmounts() {
  
  
  // 计算订单总金额（所有明细行未税金额之和）
  const totalAmount = purchaseOrderItemList.value.reduce((sum, item) => {
    return sum + (item.taxTotalAmount || 0);
  }, 0);
  formData.value.totalTaxAmount = Number(totalAmount.toFixed(2));

  // 计算最终结算金额（订单总金额 - 优惠金额）
  formData.value.orderTotalAmount = Number((totalAmount - formData.value.discountAmount || 0).toFixed(2));
}

function handleOpenSelectPurchasePlan() {
  selectPurchasePlanRef.value?.open();
}

function handlePurchasePlanSelect(rows: PurchasePlanItemVO[]) {
  if (rows.length > 0) {
    rows.forEach((planItem) => {
      const record: PurchaseOrderItemRow = {
        id: Date.now() + Math.random(),
        orderId: undefined,
        materialId: planItem.materialId,
        materialName: (planItem as any).materialName,
        materialCode: (planItem as any).materialCode,
        model: (planItem as any).model,
        quantity: planItem.remainQuantity,
        taxIncludedPrice: undefined,
        taxRate: 0,
        taxExcludedPrice: undefined,
        taxTotalAmount: undefined,
        actualTotalAmount: undefined,
        remainQuantity: undefined,
        planItemId: planItem.id,
        remark: planItem.remark,
      };
      purchaseOrderItemList.value.push(record);
    });
    calculateOrderAmounts();
  }
}

function handleAddRow() {
  const record: PurchaseOrderItemRow = {
    id: Date.now(),
    orderId: undefined,
    materialId: undefined,
    materialName: undefined,
    materialCode: undefined,
    model: undefined,
    quantity: undefined,
    taxIncludedPrice: undefined,
    taxRate: 0,
    taxExcludedPrice: undefined,
    taxTotalAmount: undefined,
    actualTotalAmount: undefined,
    remainQuantity: undefined,
    planItemId: undefined,
    remark: undefined,
  };
  purchaseOrderItemList.value.push(record);
}

function handleRemoveRow(row: PurchaseOrderItemRow) {
  const index = purchaseOrderItemList.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    purchaseOrderItemList.value.splice(index, 1);
    calculateOrderAmounts();
  }
}

// 监听部门变化，更新采购人员列表
watch(
  () => formData.value.deptId,
  (newDeptId) => {
    loadStaffOptions(newDeptId);
  }
);

// 监听优惠金额变化，重新计算订单总金额
watch(
  () => formData.value.discountAmount,
  () => {
    calculateOrderAmounts();
  }
);

const columns: TableColumnsType<PurchaseOrderItemRow> = [
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
    render: (_: any, record: PurchaseOrderItemRow) => (
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
    title: '规格型号',
    dataIndex: 'model',
    key: 'model',
    width: 120,
  },
  {
    title: '采购数量',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 110,
    render: (_: any, record: PurchaseOrderItemRow) => (
      <InputNumber
        min={0}
        onChange={() => calculateAmounts(record)}
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
    width: 110,
    render: (_: any, record: PurchaseOrderItemRow) => (
      <InputNumber
        min={0}
        onChange={() => calculateAmounts(record)}
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
    width: 90,
    render: (_: any, record: PurchaseOrderItemRow) => (
      <Select
        get-popup-container={getPopupContainer}
        options={getDictOptions('tax_rate', true)}
        placeholder="请选择"
        style={{ width: '100%' }}
        v-model:value={record.taxRate}
      />
    ),
  },
  {
    title: '含税金额',
    dataIndex: 'taxTotalAmount',
    key: 'taxTotalAmount',
    width: 110,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 120,
    render: (_: any, record: PurchaseOrderItemRow) => (
      <Input placeholder="请输入" v-model:value={record.remark} />
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 80,
    fixed: 'right' as const,
    render: (_: any, record: PurchaseOrderItemRow) => (
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
      loadSupplierOptions(),
      loadDeptTree(),
      loadStaffOptions(),
    ]);

    const { id, viewMode: isViewMode } = modalApi.getData() as { id?: number | string; viewMode?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!isViewMode;
    console.log('isUpdate', viewMode.value);
    // 动态更新 showConfirmButton
    modalApi.setState({ showConfirmButton: viewMode.value });

    if (isUpdate.value && id) {
      const record = await purchaseOrderInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      purchaseOrderItemList.value =
        record.orderItems && record.orderItems.length > 0
          ? (record.orderItems as PurchaseOrderItemRow[])
          : [];
      // 加载对应部门的采购人员
      if (formData.value.deptId) {
        await loadStaffOptions(formData.value.deptId);
      }
    } else {
      purchaseOrderItemList.value = [];
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm(orderStatus: number) {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if (purchaseOrderItemList.value.length === 0) {
      alert({
        content: '采购订单明细不能为空，请添加明细',
        icon: 'warning',
      });
      return;
    }
    for (let i = 0; i < purchaseOrderItemList.value.length; i++) {
      const row = purchaseOrderItemList.value[i]!;
      if (!row.materialId) {
        alert({
          content: `第${i + 1}行物料名称不能为空`,
          icon: 'warning',
        });
        return;
      }
      if (!row.quantity || row.quantity <= 0) {
        alert({
          content: `第${i + 1}行采购数量必须大于0`,
          icon: 'warning',
        });
        return;
      }
    }

    formData.value.orderStatus = orderStatus;
    const data = cloneDeep(formData.value);
    data.orderItems = purchaseOrderItemList.value as PurchaseOrderItemVO[];
    await (isUpdate.value ? purchaseOrderUpdate(data) : purchaseOrderAdd(data));
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
  purchaseOrderItemList.value = [];
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
          <FormItem label="采购订单编码" name="purchaseCode" :rules="formRules.purchaseCode">
            <Input v-model:value="formData.purchaseCode" placeholder="系统自动生成" disabled />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="供应商名称" name="supplierId" :rules="formRules.supplierId">
            <Select
              v-model:value="formData.supplierId"
              :options="supplierOptions"
              :field-names="{
            label: 'supplierName',
            value: 'id',
          }"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              clearable
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="采购类型" name="purchaseType" :rules="formRules.purchaseType">
            <Select
              v-model:value="formData.purchaseType"
              :options="getDictOptions('purchase_type', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              clearable
            />
          </FormItem>
        </Col>
        
        <Col :span="8">
          <FormItem label="采购部门" name="deptId" :rules="formRules.deptId">
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
          <FormItem label="采购人员" name="salesperson" :rules="formRules.salesperson">
            <Select
              v-model:value="formData.salesperson"
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
          <FormItem label="要求到货日期" name="requiredDeliveryDate" :rules="formRules.requiredDeliveryDate">
            <DatePicker
              v-model:value="formData.requiredDeliveryDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="16">
          <FormItem label="备注" name="remark" :rules="formRules.remark">
            <TextArea
              v-model:value="formData.remark"
              :placeholder="$t('ui.formRules.required')"
              :rows="2"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="订单状态" name="orderStatus" :rules="formRules.orderStatus">
            <div class="flex items-center">
              <DictTag :dicts="getDictOptions('purchase_order_status')" :value="formData.orderStatus" />
            </div>
          </FormItem>
        </Col>
      </Row>
<Divider orientation="left">采购订单明细</Divider>
      <div class="mb-3 ml-10" v-if="viewMode">
        <Space>
          <Button type="primary" @click="handleAddRow">新增行</Button>
          <Button @click="handleOpenSelectPurchasePlan">从采购计划引入</Button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="purchaseOrderItemList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 1500 }"
        style="margin: 0 16px;"
      />
      <Divider orientation="left">金额信息</Divider>
      <Row :gutter="24">
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
          <FormItem label="优惠金额" name="discountAmount" :rules="formRules.discountAmount">
            <InputNumber
              v-model:value="formData.discountAmount"
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
        <Col :span="8">
          <FormItem label="币种" name="currency" :rules="formRules.currency">
            <Select
              v-model:value="formData.currency"
              :options="getDictOptions('currency_type', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </Col>
      </Row>
</Form>

    <SelectMaterial
      ref="selectMaterialRef"
      @update:value="(rows: MaterialInfoVO[]) => handleMaterialSelect(rows)"
    />
    <SelectPurchasePlan
      ref="selectPurchasePlanRef"
      @update:value="(rows: PurchasePlanItemVO[]) => handlePurchasePlanSelect(rows)"
    />
    <template #center-footer v-if="viewMode">
      <a-button color="green" variant="solid" @click="handleConfirm(10)">暂存</a-button>
    </template>
  </BasicModal>
</template>
