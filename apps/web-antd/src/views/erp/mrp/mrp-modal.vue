<script setup lang="ts">
import type { Rule } from 'antdv-next/dist/form/types';

import type { MrpCalculateForm } from '#/api/erp/mrp/model';
import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';

import { computed, ref } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';

import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  FormItem,
  InputNumber,
  Progress,
  Radio,
  Space,
  Tag,
} from 'antdv-next';

import { mrpCalculateAsync, mrpProgress } from '#/api/erp/mrp';
import SelectMaterial from '#/components/select-material/src/index.vue';
import SelectProductionPlan from '#/components/select-production-plan/src/index.vue';
import SelectSalesOrderItem from '#/components/select-sales-order-item/src/index.vue';

import { modeOptions } from './data';

const emit = defineEmits<{ reload: [] }>();

const formData = ref<Partial<MrpCalculateForm>>({
  mode: 'manual',
  deadlineDate: undefined,
  safetyStockDays: 7,
  considerOnWayStock: true,
  groupByOrder: true,
});

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & { [key: string]: Rule[] };
const formRules = ref<AntdFormRules<MrpCalculateForm>>({
  mode: [{ required: true, message: '请选择运算模式' }],
  deadlineDate: [{ required: true, message: '请选择运算截止日期' }],
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[680px]',
  onClosed: handleClosed,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;
    step.value = 0;
    progress.value = 0;
    progressMessage.value = '';
    taskId.value = '';
  },
});

// 运算步骤控制
const step = ref(0); // 0-配置 1-运算中 2-完成/失败
const progress = ref(0);
const progressMessage = ref('');
const calculating = ref(false);
const taskId = ref('');
const resultBatchNo = ref('');

const title = computed(() => {
  if (step.value === 0) return 'MRP运算配置';
  if (step.value === 1) return 'MRP运算中...';
  return 'MRP运算完成';
});

const isManualMode = computed(() => formData.value.mode === 'manual');
const isSalesOrderMode = computed(() => formData.value.mode === 'salesOrder');
const isProductionPlanMode = computed(() => formData.value.mode === 'productionPlan');

// 物料选择
const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const selectedMaterialNames = ref<string[]>([]);

function handleOpenSelectMaterial() {
  selectMaterialRef.value?.open();
}

function handleMaterialSelect(rows: any[]) {
  formData.value.materialIds = rows.map((r) => r.id);
  selectedMaterialNames.value = rows.map((r) => r.materialName);
}

// 销售订单选择
const selectSalesOrderItemRef = ref<InstanceType<typeof SelectSalesOrderItem>>();
const selectedSalesOrderCodes = ref<string[]>([]);

async function handleSalesOrderSelect(rows: SalesOrderItemVO[]) {
  if (rows.length === 0) return;
  formData.value.salesOrderItemIds = rows.map((r) => r.id);
  const uniqueCodes = [...new Set(rows.map((r) => (r as any).orderCode || ''))].filter(Boolean);
  selectedSalesOrderCodes.value = uniqueCodes;
}

// 生产计划选择
const selectProductionPlanRef = ref<InstanceType<typeof SelectProductionPlan>>();
const selectedPlanCodes = ref<string[]>([]);

function handleProductionPlanSelect(rows: any[]) {
  if (rows.length === 0) return;
  formData.value.productionPlanIds = rows.map((r) => r.id);
  selectedPlanCodes.value = rows.map((r) => r.planCode);
}

async function startCalculate() {
  calculating.value = true;
  step.value = 1;
  progress.value = 5;
  progressMessage.value = '开始MRP运算...';

  try {
    await modalApi.lock(true);

    // 启动异步运算
    const res = await mrpCalculateAsync({
      mode: formData.value.mode as MrpCalculateForm['mode'],
      deadlineDate: formData.value.deadlineDate!,
      safetyStockDays: formData.value.safetyStockDays,
      considerOnWayStock: formData.value.considerOnWayStock,
      groupByOrder: formData.value.groupByOrder,
      materialIds: formData.value.materialIds,
      salesOrderIds: formData.value.salesOrderIds,
      productionPlanIds: formData.value.productionPlanIds,
      salesOrderItemIds: formData.value.salesOrderItemIds,
    });

    taskId.value = res.data?.taskId ?? '';

    // 轮询进度
    let pollingCount = 0;
    const maxPolling = 120; // 最多轮询120次（2分钟）
    const pollInterval = 1000; // 每秒轮询

    await new Promise<void>((resolve, reject) => {
      const poll = async () => {
        if (pollingCount >= maxPolling) {
          reject(new Error('运算超时，请稍后查看结果'));
          return;
        }
        pollingCount++;

        try {
          const progRes = await mrpProgress(taskId.value);
          const progData = progRes.data;

          if (progData) {
            progress.value = progData.progress ?? progress.value;
            progressMessage.value = progData.message || `已运算 ${progress.value}%`;

            if (progData.status === 1) {
              resultBatchNo.value = progData.batchNo ?? '';
              step.value = 2;
              progress.value = 100;
              progressMessage.value = '运算完成';
              resolve();
              return;
            }
            if (progData.status === 2) {
              step.value = 2;
              progressMessage.value = progData.message || '运算失败';
              reject(new Error(progData.message || '运算失败'));
              return;
            }
          }

          // 未完成，继续轮询
          setTimeout(poll, pollInterval);
        } catch (err) {
          reject(err);
        }
      };

      setTimeout(poll, pollInterval);
    });
  } catch (error) {
    console.error('MRP运算失败:', error);
    alert({
      content: error instanceof Error ? error.message : 'MRP运算失败',
      icon: 'error',
    });
  } finally {
    calculating.value = false;
    await modalApi.lock(false);
  }
}

function handleViewResult() {
  modalApi.close();
  emit('reload');
}

function handleStartNew() {
  step.value = 0;
  progress.value = 0;
  progressMessage.value = '';
  formData.value = {
    mode: 'manual',
    deadlineDate: undefined,
    safetyStockDays: 7,
    considerOnWayStock: true,
    groupByOrder: true,
  };
  selectedMaterialNames.value = [];
  selectedSalesOrderCodes.value = [];
  selectedPlanCodes.value = [];
}

function handleClosed() {
  step.value = 0;
  progress.value = 0;
  progressMessage.value = '';
  calculating.value = false;
  taskId.value = '';
  resultBatchNo.value = '';
}
</script>

<template>
  <BasicModal :title="title" :show-confirm-button="step === 0" :confirm-loading="calculating" @confirm="startCalculate">
    <!-- Step 0: 配置参数 -->
    <div v-if="step === 0">
      <Form :label-col="{ span: 6 }" :model="formData" :rules="formRules">
        <FormItem label="运算模式" name="mode">
          <RadioGroup v-model:value="formData.mode">
            <Radio
              v-for="opt in modeOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="运算截止日期" name="deadlineDate" :rules="formRules.deadlineDate">
          <DatePicker
            v-model:value="formData.deadlineDate"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </FormItem>

        <FormItem label="安全库存天数" name="safetyStockDays">
          <InputNumber
            v-model:value="formData.safetyStockDays"
            :min="0"
            :max="365"
            style="width: 100%"
          />
        </FormItem>

        <FormItem label="考虑在途库存" name="considerOnWayStock">
          <Checkbox v-model:checked="formData.considerOnWayStock">
            运算时考虑采购在途和生产在制数量
          </Checkbox>
        </FormItem>

        <FormItem label="按订单汇总" name="groupByOrder">
          <Checkbox v-model:checked="formData.groupByOrder">
            将同一订单的需求汇总
          </Checkbox>
        </FormItem>

        <Divider v-if="isManualMode" orientation="left">选择物料</Divider>

        <FormItem v-if="isManualMode" label="选择物料" name="materialIds">
          <Space direction="vertical" style="width: 100%">
            <Button type="dashed" block @click="handleOpenSelectMaterial">
              + 选择物料
            </Button>
            <div v-if="selectedMaterialNames.length > 0" class="selected-tags">
              <Space wrap>
                <Tag
                  v-for="(name, idx) in selectedMaterialNames.slice(0, 10)"
                  :key="idx"
                  closable
                  @close="
                    () => {
                      selectedMaterialNames.splice(idx, 1);
                      formData.materialIds?.splice(idx, 1);
                    }
                  "
                >
                  {{ name }}
                </Tag>
                <Tag v-if="selectedMaterialNames.length > 10">
                  +{{ selectedMaterialNames.length - 10 }} 更多
                </Tag>
              </Space>
            </div>
          </Space>
        </FormItem>

        <Divider v-if="isSalesOrderMode" orientation="left">选择销售订单</Divider>

        <FormItem v-if="isSalesOrderMode" label="选择销售订单" name="salesOrderItemIds">
          <Space direction="vertical" style="width: 100%">
            <Button type="dashed" block @click="selectSalesOrderItemRef?.open()">
              + 选择销售订单明细
            </Button>
            <div v-if="selectedSalesOrderCodes.length > 0" class="selected-tags">
              <Space wrap>
                <Tag
                  v-for="(code, idx) in selectedSalesOrderCodes"
                  :key="idx"
                  closable
                  @close="
                    () => {
                      selectedSalesOrderCodes.splice(idx, 1);
                    }
                  "
                >
                  {{ code }}
                </Tag>
              </Space>
            </div>
          </Space>
        </FormItem>

        <Divider v-if="isProductionPlanMode" orientation="left">选择生产计划</Divider>

        <FormItem v-if="isProductionPlanMode" label="选择生产计划" name="productionPlanIds">
          <Space direction="vertical" style="width: 100%">
            <Button type="dashed" block @click="selectProductionPlanRef?.open()">
              + 选择生产计划
            </Button>
            <div v-if="selectedPlanCodes.length > 0" class="selected-tags">
              <Space wrap>
                <Tag
                  v-for="(code, idx) in selectedPlanCodes"
                  :key="idx"
                  closable
                  @close="
                    () => {
                      selectedPlanCodes.splice(idx, 1);
                    }
                  "
                >
                  {{ code }}
                </Tag>
              </Space>
            </div>
          </Space>
        </FormItem>
      </Form>

      <SelectMaterial
        ref="selectMaterialRef"
        multiple
        @update:value="handleMaterialSelect"
      />
      <SelectSalesOrderItem
        ref="selectSalesOrderItemRef"
        :default-params="{ isPlan: false }"
        @update:value="handleSalesOrderSelect"
      />
      <SelectProductionPlan
        ref="selectProductionPlanRef"
        multiple
        @update:value="handleProductionPlanSelect"
      />
    </div>

    <!-- Step 1: 运算中 -->
    <div v-else-if="step === 1" class="calculating-container">
      <div class="calculating-icon">
        <Spin size="large" />
      </div>
      <div class="calculating-title">{{ progressMessage }}</div>
      <Progress
        :percent="progress"
        :status="progress < 100 ? 'active' : 'success'"
        :stroke-color="progress < 100 ? '#1677ff' : '#52c41a'"
      />
      <div class="calculating-tip">
        <span v-if="progress < 30">正在解析BOM结构...</span>
        <span v-else-if="progress < 60">正在计算物料需求...</span>
        <span v-else-if="progress < 90">正在生成采购建议...</span>
        <span v-else>正在生成生产建议...</span>
      </div>
    </div>

    <!-- Step 2: 完成 -->
    <div v-else class="result-container">
      <div class="result-success">
        <div class="result-icon">✓</div>
        <div class="result-title">运算完成</div>
        <div class="result-batch">
          批次号：<strong>{{ resultBatchNo }}</strong>
        </div>
      </div>
      <Space style="margin-top: 24px; justify-content: center; width: 100%">
        <Button @click="handleStartNew">继续运算</Button>
        <Button type="primary" @click="handleViewResult">查看运算结果</Button>
      </Space>
    </div>
  </BasicModal>
</template>

<style scoped>
.calculating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.calculating-icon {
  margin-bottom: 24px;
}

.calculating-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #333;
}

.calculating-tip {
  margin-top: 12px;
  color: #999;
  font-size: 13px;
}

.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.result-success {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #f6ffed;
  border: 2px solid #52c41a;
  color: #52c41a;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.result-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.result-batch {
  color: #666;
  font-size: 14px;
}

.selected-tags {
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 8px;
  min-height: 36px;
}
</style>
