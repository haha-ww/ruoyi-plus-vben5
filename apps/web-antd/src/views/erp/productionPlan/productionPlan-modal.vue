<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { ProductionPlanForm } from '#/api/erp/productionPlan/model';
import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';
import type { TechnologyRoutingVO } from '#/api/erp/technologyRouting/model';

import { computed, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  Col,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  Row,
  Select,
  TextArea,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { productionPlanAdd, productionPlanInfo, productionPlanUpdate } from '#/api/erp/productionPlan';
import { deptTreeSelect } from '#/api/system/user';
import { liststaffSelect } from '#/api/wcommon';
import { DictTag } from '#/components/dict';
import SelectBom from '#/components/select-bom/src/index.vue'
import SelectMaterial from '#/components/select-material/src/index.vue';
import SelectSalesOrderItem from '#/components/select-sales-order-item/src/index.vue';
import SelectTechnologyRouting from '#/components/select-technology-routing/src/index.vue';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

import { priorityOptions, sourceTypeOptions } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);

const title = computed(() => {
  if (viewMode.value) return '查看生产计划';
  return isUpdate.value ? '编辑生产计划' : '新增生产计划';
});

const defaultValues: Partial<ProductionPlanForm> = {
  id: undefined,
  planCode: undefined,
  materialId: undefined,
  materialName: undefined,
  materialCode: undefined,
  planQty: undefined,
  actualQty: undefined,
  planStartTime: undefined,
  planEndTime: undefined,
  sourceType: '手动创建',
  salesOrderId: undefined,
  deptId: undefined,
  principalId: undefined,
  priority: '3',
  status: 1,
  routingId: undefined,
  routingName: undefined,
  bomId: undefined,
  bomName: undefined,
  remark: undefined,
  salesOrderCode: undefined,
  bomId: undefined,
  routingName: undefined,
  bomVersion: undefined,
};

const formData = ref<Partial<ProductionPlanForm>>({ ...defaultValues });

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & { [key: string]: Rule[] };
const formRules = ref<AntdFormRules<ProductionPlanForm>>({
  materialId: [{ required: true, message: '请选择产品' }],
  planQty: [{ required: true, message: '计划数量不能为空' }],
  planStartTime: [{ required: true, message: '请选择计划开始时间' }],
  planEndTime: [{ required: true, message: '请选择计划结束时间' }],
});

const formInstance = ref<FormInstance>();
const deptOptions = ref<any[]>([]);
const staffOptions = ref<any[]>([]);

async function loadDeptOptions() {
  const res = await deptTreeSelect();
  deptOptions.value = res;
}

async function loadStaffOptions(deptId?: number | string) {
  const res = await liststaffSelect({ deptId });
  staffOptions.value = res;
}

watch(
  () => formData.value.deptId,
  (deptId) => {
    formData.value.principalId = undefined;
    loadStaffOptions(deptId);
  },
);

// 物料选择回调
function handleMaterialSelect(rows: MaterialInfoVO[]) {
  if (rows.length > 0) {
    const material = rows[0];
    formData.value.materialId = material.id;
  formData.value.materialName = material.materialName;
  formData.value.materialCode = material.materialCode;
  }
  
}

function customFormValueGetter() {
  return JSON.stringify(formData.value);
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff({
  initializedGetter: customFormValueGetter,
  currentGetter: customFormValueGetter,
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[800px]',
  fullscreenButton: true,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;
    modalApi.modalLoading(true);

    const { id, view } = modalApi.getData() as { id?: number | string; view?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!view;

    await Promise.all([loadDeptOptions(), loadStaffOptions()]);

    if (isUpdate.value && id) {
      const record = await productionPlanInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      if (record.deptId) {
        await loadStaffOptions(record.deptId);
      }
    }

    await markInitialized();
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? productionPlanUpdate(data) : productionPlanAdd(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  formData.value = { ...defaultValues };
  formInstance.value?.resetFields();
  resetInitialized();
}
const selectBaseMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
function handleOpenSelectMaterial() {
  selectBaseMaterialRef.value?.open();
}

// 销售订单明细选择
const selectSalesOrderItemRef = ref<InstanceType<typeof SelectSalesOrderItem>>();
function handleSalesOrderItemSelect(rows: SalesOrderItemVO[]) {
  if (rows.length === 0) return;
  const item = rows[0] as SalesOrderItemVO & { materialCode?: string; materialId?: any; materialName?: string; };
  formData.value.salesOrderItemId = item.id;
  formData.value.salesOrderId = item.orderId;
  formData.value.salesOrderCode = item.orderCode;
  formData.value.planEndTime = item.requiredDeliveryDate;
  if (!formData.value.planQty && item.quantity) {
    formData.value.planQty = item.quantity;
  }
  if (!formData.value.materialId && item.materialId) {
    formData.value.materialId = item.materialId;
    formData.value.materialName = (item as any).materialName;
    formData.value.materialCode = (item as any).materialCode;
  }
}

// 工艺路线选择
const selectTechnologyRoutingRef = ref<InstanceType<typeof SelectTechnologyRouting>>();
function handleTechnologyRoutingSelect(rows: TechnologyRoutingVO[]) {
  const routing = rows[0];
  if (!routing) return;
  formData.value.routingId = routing.id;
  formData.value.routingName = routing.routingName;
}

// BOM选择
const selectBomRef = ref<InstanceType<typeof SelectBom>>();
function handleBomSelect(bom: any) {
  if (!bom) return;
  formData.value.bomId = bom.id;
  formData.value.bomVersion = bom.version;
}
</script>

<template>
  <BasicModal :title="title">
    <Form
      ref="formInstance"
      :model="formData"
      :disabled="viewMode"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <Row :gutter="16">
        <!-- 计划单号 -->
        <Col :span="12">
          <FormItem label="计划单号" name="planCode">
            <Input v-model:value="formData.planCode" disabled placeholder="保存后自动生成" />
          </FormItem>
        </Col>
        <!-- 来源类型 -->
        <Col :span="12">
          <FormItem label="来源类型" name="sourceType">
            <Select
              v-model:value="formData.sourceType"
              :options="sourceTypeOptions"
              :get-popup-container="getPopupContainer"
              placeholder="请选择来源类型"
            />
          </FormItem>
        </Col>
        <!-- 关联销售单（来源=销售订单时显示） -->
        <Col v-if="formData.sourceType === '销售订单'" :span="12">
          <FormItem label="关联销售单" name="salesOrderCode">
            <a-button type="link" @click="selectSalesOrderItemRef?.open()">
              {{ formData.salesOrderCode || '选择销售订单明细' }}
            </a-button>
          </FormItem>
        </Col>
        
        <!-- 产品 -->
        <Col :span="12">
          <FormItem label="产品" name="materialId" :rules="formRules.materialId">
            <a-button @click="handleOpenSelectMaterial" type="link">
          {{ formData.materialName || '选择产品' }}
        </a-button>
          </FormItem>
        </Col>
        <!-- 产品编码 -->
        <Col :span="12">
          <FormItem label="产品编码">
            <Input v-model:value="formData.materialCode" disabled />
          </FormItem>
        </Col>
         <!-- BOM版本 -->
        <Col :span="12">
          <FormItem label="BOM版本" name="bomVersion">
            <a-button type="link" @click="selectBomRef?.open()">
              {{ formData.bomVersion || '选择BOM版本' }}
            </a-button>
          </FormItem>
        </Col>
        <!-- 计划数量 -->
        <Col :span="12">
          <FormItem label="计划数量" name="planQty" :rules="formRules.planQty">
            <InputNumber
              v-model:value="formData.planQty"
              :min="1"
              :precision="0"
              style="width: 100%"
              placeholder="请输入计划数量"
            />
          </FormItem>
        </Col>
        <!-- 实际数量 -->
        <Col :span="12">
          <FormItem label="实际数量" name="actualQty">
            <InputNumber
              v-model:value="formData.actualQty"
              :min="0"
              :precision="0"
              style="width: 100%"
              placeholder="实际完成数量"
            />
          </FormItem>
        </Col>
        <!-- 计划开始时间 -->
        <Col :span="12">
          <FormItem label="计划开始" name="planStartTime" :rules="formRules.planStartTime">
            <DatePicker
              v-model:value="formData.planStartTime"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <!-- 计划结束时间 -->
        <Col :span="12">
          <FormItem label="计划结束" name="planEndTime" :rules="formRules.planEndTime">
            <DatePicker
              v-model:value="formData.planEndTime"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        
       
        
        <!-- 工艺路线 -->
        <Col :span="12">
          <FormItem label="工艺路线" name="routingId">
            <a-button type="link" @click="selectTechnologyRoutingRef?.open()">
              {{ formData.routingName || '选择工艺路线' }}
            </a-button>
          </FormItem>
        </Col>
        <!-- 优先级 -->
        <Col :span="12">
          <FormItem label="优先级" name="priority">
            <Select
              v-model:value="formData.priority"
              :options="priorityOptions"
              :get-popup-container="getPopupContainer"
              placeholder="请选择优先级"
            />
          </FormItem>
        </Col>
        <!-- 状态 -->
        <Col :span="12">
          <FormItem label="状态">
             <DictTag :dicts="getDictOptions('production_plan_type')" :value="formData.status" />
          </FormItem>
        </Col>
        <!-- 备注 -->
        <Col :span="24">
          <FormItem label="备注" name="remark" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <TextArea
              v-model:value="formData.remark"
              :rows="3"
              placeholder="请输入备注"
            />
          </FormItem>
        </Col>
      </Row>
      <SelectMaterial
       ref="selectBaseMaterialRef"
              @update:value="(rows: MaterialInfoVO[]) => handleMaterialSelect(rows)"
            />
      <SelectSalesOrderItem
        ref="selectSalesOrderItemRef"
        :default-params="{ isPlan: false }"
        @update:value="handleSalesOrderItemSelect"
      />
      <SelectTechnologyRouting
        ref="selectTechnologyRoutingRef"
        :default-params="{ materialId: formData.materialId }"
        @update:value="handleTechnologyRoutingSelect"
      />
      <SelectBom
        ref="selectBomRef"
        :default-params="{ materialId: formData.materialId }"
        @update:value="handleBomSelect"
      />
    </Form>
  </BasicModal>
</template>
