<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { ProductionPlanVO } from '#/api/erp/productionPlan/model';
import type { PurchasePlanForm } from '#/api/erp/purchasePlan/model';

import { computed, ref } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
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
  Space,
  Table,
  TextArea
} from 'antdv-next';
import dayjs from 'dayjs';
import { pick } from 'lodash-es';

import { purchasePlanAdd, purchasePlanInfo, purchasePlanUpdate } from '#/api/erp/purchasePlan';
import { DictTag } from '#/components/dict';
import SelectMaterial from '#/components/select-material/src/index.vue';
import SelectProductionPlan from '#/components/select-production-plan/src/index.vue';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

/**
 * 采购计划明细行（包含后端字段 + 前端展示字段）
 */
interface PurchasePlanItemRow {
  id?: number | string;
  planId?: number | string;
  materialId?: number | string;
  quantity?: number;
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
const defaultValues: Partial<PurchasePlanForm> = {
  id: undefined,
  planCode: undefined,
  productionPlanId: undefined,
  productionPlanCode: undefined,
  planDate: dayjs().format('YYYY-MM-DD'),
  status: '1',
  remark: undefined,
  orderTotalAmount: undefined,
  totalTaxAmount: undefined,
  discountAmount: 0,
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
const formRules = ref<AntdFormRules<PurchasePlanForm>>({});

const formInstance = ref<FormInstance>();

const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const selectProductionPlanRef = ref<InstanceType<typeof SelectProductionPlan>>();
const currentEditRow = ref<null | PurchasePlanItemRow>(null);

function handleProductionPlanSelect(row: ProductionPlanVO) {
  formData.value.productionPlanId = row.id;
  formData.value.productionPlanCode = row.planCode;
  formData.value.salesOrderCode = row.salesOrderCode;
}

const purchasePlanItemList = ref<PurchasePlanItemRow[]>([]);


function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, purchasePlanItemList: purchasePlanItemList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

function handleOpenSelectMaterial(row: PurchasePlanItemRow) {
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
    currentEditRow.value.taxRate = selected.taxRate;
    currentEditRow.value.taxIncludedPrice = selected.purchasePrice;
  }
}


function handleAddRow() {
  const record: PurchasePlanItemRow = {
    id: Date.now(),
    planId: undefined,
    materialId: undefined,
    materialName: undefined,
    materialCode: undefined,
    model: undefined,
    quantity: undefined,
    remark: undefined,
  };
  purchasePlanItemList.value.push(record);
}

function handleRemoveRow(row: PurchasePlanItemRow) {
  const index = purchasePlanItemList.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    purchasePlanItemList.value.splice(index, 1);
  }
}

function calculateAmounts(record: PurchasePlanItemRow) {
  if (record.quantity && record.taxIncludedPrice) {
    record.actualTotalAmount = record.quantity * record.taxIncludedPrice;
  }
}



const columns: TableColumnsType<PurchasePlanItemRow> = [
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
    render: (_: any, record: PurchasePlanItemRow) => (
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
    dataIndex: 'planQuantity',
    key: 'planQuantity',
    width: 70,
    render: (_: any, record: PurchasePlanItemRow) => (
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
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 120,
    render: (_: any, record: PurchasePlanItemRow) => (
      <Input placeholder="请输入" v-model:value={record.remark} />
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 60,
    render: (_: any, record: PurchasePlanItemRow) => (
      <DictTag dictName="purchasePlanStatus" value={record.status} />
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 50,
    fixed: 'right' as const,
    render: (_: any, record: PurchasePlanItemRow) => (
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
  onConfirm: () => handleConfirm(),
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);


    const { id, viewMode: isViewMode } = modalApi.getData() as { id?: number | string; viewMode?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!isViewMode;
    // 动态更新 showConfirmButton
    modalApi.setState({ showConfirmButton: viewMode.value });

    if (isUpdate.value && id) {
      const record = await purchasePlanInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      purchasePlanItemList.value =
        record.planItems && record.planItems.length > 0
          ? (record.planItems as PurchasePlanItemRow[])
          : [];
    } else {
      purchasePlanItemList.value = [];
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if (purchasePlanItemList.value.length === 0) {
      alert({
        content: '采购计划明细不能为空，请添加明细',
        icon: 'warning',
      });
      return;
    }
    for (let i = 0; i < purchasePlanItemList.value.length; i++) {
      const row = purchasePlanItemList.value[i];
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

    const data = cloneDeep(formData.value);
    data.planItems = purchasePlanItemList.value;
    await (isUpdate.value ? purchasePlanUpdate(data) : purchasePlanAdd(data));
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
  purchasePlanItemList.value = [];
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
          <FormItem label="采购计划编码" name="planCode" :rules="formRules.planCode">
            <Input v-model:value="formData.planCode" placeholder="系统自动生成" disabled />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="生产计划" name="productionPlanId" :rules="formRules.productionPlanId">
            <a-input-group compact style="display:flex">
              <Input :value="formData.productionPlanCode" placeholder="请选择生产计划" readonly style="flex:1" />
              <a-button v-if="viewMode" @click="selectProductionPlanRef?.open()">选择</a-button>
            </a-input-group>
          </FormItem>
        </Col>
        
        <Col :span="8">
          <FormItem label="单据日期" name="planDate" :rules="formRules.planDate">
            <DatePicker
              v-model:value="formData.planDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="备注" name="remark" :rules="formRules.remark">
            <TextArea
              v-model:value="formData.remark"
              :placeholder="$t('ui.formRules.required')"
              :rows="2"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="采购计划状态" name="status" :rules="formRules.status">
            <div class="flex items-center">
              <DictTag :dicts="getDictOptions('purchase_plan_status')" :value="formData.status" />
            </div>
          </FormItem>
        </Col>
</Row>
      <Divider orientation="left">采购计划明细</Divider>
      <div class="mb-3 ml-10" v-if="viewMode">
        <Space>
          <Button type="primary" @click="handleAddRow">新增行</Button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="purchasePlanItemList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 1500 }"
        style="margin: 0 16px;"
      />
    </Form>

    <SelectMaterial
      ref="selectMaterialRef"
      @update:value="(rows: MaterialInfoVO[]) => handleMaterialSelect(rows)"
    />
    <SelectProductionPlan
      ref="selectProductionPlanRef"
      @update:value="handleProductionPlanSelect"
    />
  </BasicModal>
</template>
