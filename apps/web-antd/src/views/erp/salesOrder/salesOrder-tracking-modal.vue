<script setup lang="ts">
import type { SalesOrderStepVo } from '#/api/erp/salesOrder/model';
import type { SalesOrderVO } from '#/api/erp/salesOrder/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Empty,
  Progress,
  Spin,
  Tag,
} from 'antdv-next';

import { productionInboundOrderItemList } from '#/api/erp/productionInboundOrderItem';
import { productionOrderList } from '#/api/erp/productionOrder';
import { productionPlanList } from '#/api/erp/productionPlan';
import { salesOrderInfo, salesOrderWorkflow } from '#/api/erp/salesOrder';
import { salesOutboundOrderItemList } from '#/api/erp/salesOutboundOrderItem';

// ---- 类型定义 ----
interface LineItemTracking {
  itemId: number | string;
  lineNo: number;
  materialId: number | string;
  materialName: string;
  materialCode: string;
  model: string;
  unitName: string;
  orderQuantity: number;
  stockQuantity: number;
  unitPrice: number;
  remark: string;
  requiredDeliveryDate: string;
}

interface StageInfo {
  key: string;
  label: string;
  code: string;
  status: 'blocked' | 'completed' | 'pending' | 'warning';
  statusText: string;
  percentage: number;
  docType: string;
}

// 工作流步骤映射：后端statusText → 前端stage status
const statusTextToStageStatus = (text: string): StageInfo['status'] => {
  if (text === '已完成') return 'completed';
  if (text === '待处理') return 'pending';
  // 进行中 等其他状态映射为 warning
  return 'warning';
};

// ---- 状态映射 ----
type BadgeStatus = 'default' | 'error' | 'processing' | 'success' | 'warning';

const salesOrderStatusMap: Record<number, { color: BadgeStatus; text: string }> = {
  10: { color: 'default', text: '草稿' },
  20: { color: 'processing', text: '已提交' },
  30: { color: 'success', text: '已审批' },
};

const productionPlanStatusMap: Record<number, { color: string; text: string }> = {
  10: { color: 'default', text: '草稿' },
  20: { color: 'processing', text: '已下达' },
  30: { color: 'warning', text: '生产中' },
  40: { color: 'success', text: '已完成' },
  50: { color: 'error', text: '已关闭' },
};

const productionOrderStatusMap: Record<number, { color: string; text: string }> = {
  10: { color: 'default', text: '草稿' },
  20: { color: 'processing', text: '已下达' },
  30: { color: 'warning', text: '生产中' },
  40: { color: 'success', text: '已完工' },
  50: { color: 'error', text: '已关闭' },
};

// ---- 响应式数据 ----
const loading = ref(false);
const salesOrder = ref<null | SalesOrderVO>(null);
const workflowSteps = ref<SalesOrderStepVo[]>([]);
const selectedLineIndex = ref(0);

// ---- 节点穿透加载状态 ----
const stageLoading = ref(false);

// ---- 文档穿透状态 ----
const currentStageTitle = ref('');
const currentDocs = ref<any[]>([]);
const currentDocFields = ref<Array<{ key: string; label: string; statusMap?: Record<number, { color: string; text: string }> }>>([]);
const activeStageKey = ref('');

// ---- 辅助函数 ----
function getStatusInfo(status: number, map: Record<number, { color: string; text: string }>) {
  return map[status] || { color: 'default', text: String(status) };
}

/** 判断日期是否已过期（当前日期 > 目标日期） */
function isOverdue(dateStr: null | string | undefined): boolean {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  if (Number.isNaN(target.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return today > target;
}

// ---- 计算属性 ----
const orderItems = computed<any[]>(() => {
  if (!salesOrder.value) return [];
  return (salesOrder.value as any).orderItems || salesOrder.value.salesOrderItemList || [];
});

const customerName = computed(() => (salesOrder.value as any)?.customerName || '-');
const salesPersonName = computed(() => (salesOrder.value as any)?.salesPersonName || '-');
const orderRemark = computed(() => (salesOrder.value as any)?.remark || '-');

const orderStatusBadge = computed(() => {
  if (!salesOrder.value) return { color: 'default' as BadgeStatus, text: '' };
  return salesOrderStatusMap[salesOrder.value.orderStatus] || { color: 'default' as BadgeStatus, text: String(salesOrder.value.orderStatus) };
});

// 每个行项目（仅基础字段，追踪数据点击节点时按需加载）
const lineItems = computed(() => {
  const items = orderItems.value;
  if (items.length === 0) return [];

  return items.map((item: any, index: number) => ({
    itemId: item.id,
    lineNo: (index + 1) * 10,
    materialId: item.materialId,
    materialName: item.materialName || '',
    materialCode: item.materialCode || '',
    model: item.model || '',
    unitName: item.unitName || '',
    orderQuantity: item.quantity || 0,
    stockQuantity: item.stockQuantity || 0,
    unitPrice: item.taxIncludedPrice || 0,
    remark: item.remark || '',
    requiredDeliveryDate: item.requiredDeliveryDate || '',
  }));
});

// 当前选中的行项目
const selectedLine = computed<LineItemTracking | null>(() => {
  return lineItems.value[selectedLineIndex.value] || null;
});

// 5阶段流程（使用 salesOrderWorkflow 接口数据）
const stages = computed<StageInfo[]>(() => {
  if (!salesOrder.value || workflowSteps.value.length === 0) return [];

  // 来自 salesOrderWorkflow 接口
  const result: StageInfo[] = [];
  workflowSteps.value.forEach((step, idx) => {
    result.push({
      key: step.docType,
      label: `${idx + 1}. ${step.docTypeName}`,
      code: step.docCode || '',
      status: statusTextToStageStatus(step.statusText),
      statusText: step.statusText,
      percentage: step.percentage || 0,
      docType: step.docType,
    });
  });

  return result;
});

// 点击阶段节点 - 根据销售订单编码和物料ID按需查询对应单据
async function handleStageClick(stage: StageInfo) {
  if (!selectedLine.value || !salesOrder.value) return;
  activeStageKey.value = stage.key;
  currentStageTitle.value = stage.label;
  stageLoading.value = true;

  const line = selectedLine.value;
  const so = salesOrder.value;

  try {
    switch (stage.docType) {
      case 'production_inbound': {
        currentDocFields.value = [
          { key: 'productionOrderCode', label: '入库单号' },
          { key: 'materialName', label: '物料名称' },
          { key: 'inboundQuantity', label: '入库数量' },
        ];
        const inboundResult = await productionInboundOrderItemList({
          materialId: line.materialId,
          salesOrderCode: so.orderCode,
          pageNum: 1,
          pageSize: 999,
        } as any);
        currentDocs.value = (inboundResult.rows || []).map((i: any) => ({
          productionOrderCode: i.productionOrderCode || '-',
          materialName: line.materialName,
          inboundQuantity: i.inboundQuantity || 0,
        }));
        break;
      }
      case 'production_order': {
        currentDocFields.value = [
          { key: 'orderCode', label: '工单编码' },
          { key: 'materialName', label: '物料名称' },
          { key: 'orderQuantity', label: '订单数量' },
          { key: 'progress', label: '进度(%)' },
          { key: 'orderStatus', label: '状态', statusMap: productionOrderStatusMap },
        ];
        const orderResult = await productionOrderList({
          salesOrderCode: so.orderCode,
          materialId: line.materialId,
          pageNum: 1,
          pageSize: 999,
        } as any);
        currentDocs.value = orderResult.rows || [];
        break;
      }
      case 'production_plan': {
        currentDocFields.value = [
          { key: 'planCode', label: '计划编码' },
          { key: 'materialName', label: '物料名称' },
          { key: 'planQty', label: '计划数量' },
          { key: 'actualQty', label: '完成数量' },
          { key: 'status', label: '状态', statusMap: productionPlanStatusMap },
        ];
        const planResult = await productionPlanList({
          salesOrderCode: so.orderCode,
          materialId: line.materialId,
          pageNum: 1,
          pageSize: 999,
        } as any);
        currentDocs.value = planResult.rows || [];
        break;
      }
      case 'sales_outbound': {
        currentDocFields.value = [
          { key: 'salesOrderNo', label: '出库单号' },
          { key: 'materialName', label: '物料名称' },
          { key: 'outboundQuantity', label: '出库数量' },
        ];
        const outboundResult = await salesOutboundOrderItemList({
          salesOrderId: so.id,
          materialId: line.materialId,
          pageNum: 1,
          pageSize: 999,
        } as any);
        currentDocs.value = (outboundResult.rows || []).map((o: any) => ({
          salesOrderNo: o.salesOrderNo || '-',
          materialName: line.materialName,
          outboundQuantity: o.outboundQuantity || 0,
        }));
        break;
      }
      default: {
        currentDocs.value = [];
        currentDocFields.value = [];
      }
    }
  } catch (error) {
    console.error('查询节点单据数据失败:', error);
    currentDocs.value = [];
  } finally {
    stageLoading.value = false;
  }
}

// 行状态（基于工作流阶段数据）
const lineStatus = computed(() => {
  if (stages.value.length === 0) return { text: '-', type: 'default' };
  const allCompleted = stages.value.every((s) => s.status === 'completed');
  if (allCompleted) return { text: '结案', type: 'success' };
  const hasBlocked = stages.value.some((s) => s.status === 'blocked');
  if (hasBlocked) return { text: '异常', type: 'error' };
  const hasActive = stages.value.some((s) => s.status === 'warning');
  if (hasActive) return { text: '进行中', type: 'processing' };
  return { text: '正常', type: 'default' };
});

function selectLine(index: number) {
  selectedLineIndex.value = index;
  activeStageKey.value = '';
  currentDocs.value = [];
  // 按行项目加载工作流数据
  loadWorkflow(index);
}

// 按行项目ID加载工作流数据
async function loadWorkflow(index: number) {
  const line = lineItems.value[index];
  if (!line) return;
  try {
    const result = await salesOrderWorkflow(Number(line.itemId));
    workflowSteps.value = result || [];
  } catch (error) {
    console.error('加载工作流数据失败:', error);
    workflowSteps.value = [];
  }
}

const [BasicModal, modalApi] = useVbenModal({
  fullscreen: true,
  fullscreenButton: false,
  showConfirmButton: false,
  showCancelButton: true,
  cancelText: '关闭',
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;
    modalApi.modalLoading(true);
    loading.value = true;
    selectedLineIndex.value = 0;

    try {
      const { id } = modalApi.getData() as { id: number | string };
      const orderData = await salesOrderInfo(id);
      salesOrder.value = orderData;

      // 初始加载默认选中行的工作流数据
      loadWorkflow(0);
    } catch (error) {
      console.error('加载流程追踪数据失败:', error);
    } finally {
      loading.value = false;
      modalApi.modalLoading(false);
    }
  },
  onClosed: () => {
    salesOrder.value = null;
    workflowSteps.value = [];
    selectedLineIndex.value = 0;
    activeStageKey.value = '';
    currentDocs.value = [];
    currentDocFields.value = [];
    currentStageTitle.value = '';
    stageLoading.value = false;
  },
});
</script>

<template>
  <BasicModal title="销售订单可视化生命周期追溯">
    <Spin :spinning="loading">
      <div v-if="salesOrder" class="tracking-page">
        <!-- ====== 顶部概览区 ====== -->
        <div class="overview-bar">
          <div class="overview-grid">
            <div class="overview-item">
              <span class="ov-label">订单号</span>
              <span class="ov-value font-medium">{{ salesOrder.orderCode }}</span>
            </div>
            <div class="overview-item">
              <span class="ov-label">客户名称</span>
              <span class="ov-value font-medium">{{ customerName }}</span>
            </div>
            <div class="overview-item">
              <span class="ov-label">销售人员</span>
              <span class="ov-value">{{ salesPersonName }}</span>
            </div>
            <div class="overview-item">
              <span class="ov-label">交付日期</span>
              <span class="ov-value">{{ salesOrder.deliveryDate || '-' }}</span>
            </div>
            <div class="overview-item">
              <span class="ov-label">订单状态</span>
              <Tag :color="orderStatusBadge.color">{{ orderStatusBadge.text }}</Tag>
            </div>
            <div class="overview-item">
              <span class="ov-label">订单备注</span>
              <span class="ov-value">{{ orderRemark }}</span>
            </div>
          </div>
        </div>

        <!-- ====== 主体区域 ====== -->
        <div class="tracking-body">
          <!-- 左侧：销单行物料项 -->
          <div class="lines-panel">
            <div class="panel-header">
              <span class="panel-title">销单行物料项 (SO LINES)</span>
              <span class="panel-count">{{ lineItems.length }} 行物料</span>
            </div>
            <div class="tip-bar">
              <span>提示：点击行项目切换查看各物料流程跟踪</span>
            </div>
            <div class="lines-list">
              <div
                v-for="(item, index) in lineItems"
                :key="item.itemId"
                class="line-card"
                :class="{ active: selectedLineIndex === index }"
                @click="selectLine(index)"
              >
                <div class="line-material-name">{{ item.materialName }}</div>
                <div class="line-material-code">{{ item.materialCode }}</div>
                <div class="line-field">
                  <span class="line-field-label">订单数量</span>
                  <span class="line-field-value">{{ item.orderQuantity }} {{ item.unitName }}</span>
                </div>
                <div class="line-field">
                  <span class="line-field-label">库存数量</span>
                  <span class="line-field-value">{{ item.stockQuantity }} {{ item.unitName }}</span>
                </div>
                <div class="line-field">
                  <span class="line-field-label">要求交货日期</span>
                  <span class="line-field-value" :class="{ 'overdue-date': isOverdue(item.requiredDeliveryDate) }">{{ item.requiredDeliveryDate || '-' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：流程跟踪主区域 -->
          <div class="tracking-main">
            <!-- 物料流程跟踪标题 -->
            <div v-if="selectedLine" class="flow-header">
              <div class="flow-title">
                物料流程跟踪：{{ selectedLine.materialName }}
              </div>
              <div class="flow-meta">
                <span>交付机制：按单设计制造 (Make-To-Order)</span>
                <Tag
                  :color="lineStatus.type === 'success' ? 'success' : lineStatus.type === 'error' ? 'error' : 'processing'"
                  class="ml-3"
                >
                  行状态：{{ lineStatus.text }}
                </Tag>
              </div>
            </div>

            <!-- 5阶段流程时间线 -->
            <div v-if="stages.length > 0" class="flow-timeline">
              <div
                v-for="(stage, idx) in stages"
                :key="stage.key"
                class="flow-stage"
              >
                <!-- 连接线 -->
                <div v-if="idx > 0" class="stage-connector" :class="{ active: stage.status !== 'pending' }"></div>
                <!-- 节点 -->
                <div
                  class="stage-node"
                  :class="[stage.status, { 'stage-selected': activeStageKey === stage.key }]"
                  @click="handleStageClick(stage)"
                >
                  <div class="stage-icon">
                    <span v-if="stage.status === 'completed'" class="icon-check">✓</span>
                    <span v-else-if="stage.status === 'blocked'" class="icon-warn">!</span>
                    <span v-else-if="stage.status === 'warning'" class="icon-warn">◐</span>
                    <span v-else class="icon-dot">○</span>
                  </div>
                  <div class="stage-info">
                    <div class="stage-label">{{ stage.label }}</div>
                    <div class="stage-code" v-if="stage.code">{{ stage.code }}</div>
                    <div class="stage-status-badge" :class="stage.status">
                      {{ stage.statusText }}
                    </div>
                    <div class="stage-progress">
                      <Progress
                        :percent="stage.percentage"
                        :show-info="false"
                        :stroke-color="stage.percentage >= 100 ? '#52c41a' : '#1677ff'"
                        size="small"
                      />
                      <span class="stage-progress-text">{{ stage.percentage }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 节点交易信息穿透 -->
            <div v-if="selectedLine" class="transaction-panel">
              <div class="trans-header">
                节点信息穿透
                <Spin v-if="stageLoading" size="small" class="ml-2" />
              </div>

              <!-- 未点击节点时的提示 -->
              <div v-if="!activeStageKey" class="trans-empty-hint">
                <span>点击上方流程节点查看关联单据详情</span>
              </div>

              <!-- 点击节点后的卡片展示 -->
              <template v-else>
                <div class="trans-stage-title">
                  <span>{{ currentStageTitle }}</span>
                  <Tag size="small" color="blue">{{ currentDocs.length }} 条记录</Tag>
                </div>

                <div v-if="currentDocs.length > 0" class="trans-card-list">
                  <div v-for="(doc, docIdx) in currentDocs" :key="docIdx" class="trans-doc-card">
                    <div class="doc-card-header">
                      <span class="doc-card-title">{{ currentDocFields[0] ? doc[currentDocFields[0].key] : '-' }}</span>
                      <Tag
                        v-if="currentDocFields.some(f => f.statusMap && doc[f.key] != null)"
                        :color="(() => {
                          const sf = currentDocFields.find(f => f.statusMap && doc[f.key] != null);
                          const s = sf?.statusMap?.[doc[sf.key]];
                          return s?.color || 'default';
                        })()"
                        size="small"
                      >
                        {{ (() => {
                          const sf = currentDocFields.find(f => f.statusMap && doc[f.key] != null);
                          const s = sf?.statusMap?.[doc[sf.key]];
                          return s?.text || doc[sf?.key ?? ''];
                        })() }}
                      </Tag>
                    </div>
                    <div class="doc-card-body">
                      <div
                        v-for="field in currentDocFields.slice(1).filter(f => !f.statusMap)"
                        :key="field.key"
                        class="doc-card-field"
                      >
                        <span class="doc-card-label">{{ field.label }}</span>
                        <span class="doc-card-value">{{ doc[field.key] ?? '-' }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="trans-no-docs">
                  <Empty description="暂无关联单据" :image-style="{ height: '40px' }" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <Empty v-else-if="!loading" description="暂无数据" />
    </Spin>
  </BasicModal>
</template>

<style scoped>
.tracking-page {
  padding: 0;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 55px);
}

/* ====== 顶部概览区 ====== */
.overview-bar {
  background: linear-gradient(135deg, #f8fafc 0%, #f0f5ff 100%);
  border: 1px solid #e8ecf0;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.overview-grid {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.overview-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.ov-label {
  font-size: 11px;
  color: #8c8c8c;
  font-weight: 500;
}

.ov-value {
  font-size: 13px;
  color: #262626;
}

/* ====== 主体区域 ====== */
.tracking-body {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

/* ====== 左侧面板 ====== */
.lines-panel {
  width: 280px;
  flex-shrink: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: #fafafa;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header {
  padding: 12px 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
}

.panel-count {
  font-size: 11px;
  color: #8c8c8c;
  background: #f0f0f0;
  padding: 1px 8px;
  border-radius: 10px;
}

.tip-bar {
  padding: 4px 16px 8px;
  font-size: 11px;
  color: #fa8c16;
}

.lines-list {
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.line-card {
  background: #fff;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.line-card:hover {
  border-color: #91caff;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.08);
}

.line-card.active {
  border-color: #1677ff;
  background: #f0f5ff;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.12);
}

.line-material-name {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 2px;
  line-height: 1.4;
}

.line-material-code {
  font-size: 11px;
  color: #8c8c8c;
  margin-bottom: 6px;
}

.line-field {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 12px;
  line-height: 1.8;
}

.line-field-label {
  color: #8c8c8c;
  flex-shrink: 0;
}

.line-field-value {
  color: #262626;
  font-weight: 500;
}

.line-field-value.overdue-date {
  color: #ff4d4f;
  font-weight: 600;
}

/* ====== 右侧主区域 ====== */
.tracking-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.flow-header {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
}

.flow-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.flow-meta {
  font-size: 12px;
  color: #8c8c8c;
  display: flex;
  align-items: center;
}

/* ====== 5阶段流程时间线 ====== */
.flow-timeline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 12px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  position: relative;
}

.flow-stage {
  display: flex;
  align-items: flex-start;
  flex: 1;
  position: relative;
}

.stage-connector {
  position: absolute;
  top: 18px;
  left: -50%;
  right: 50%;
  height: 3px;
  background: #e8e8e8;
  z-index: 0;
}

.stage-connector.active {
  background: #52c41a;
}

.stage-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
}

.stage-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  border: 3px solid #e8e8e8;
  background: #fff;
  transition: all 0.3s;
}

.stage-node.completed .stage-icon {
  background: #52c41a;
  border-color: #52c41a;
  color: #fff;
}

.stage-node.warning .stage-icon {
  background: #faad14;
  border-color: #faad14;
  color: #fff;
}

.stage-node.blocked .stage-icon {
  background: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}

.stage-node.pending .stage-icon {
  background: #f5f5f5;
  border-color: #d9d9d9;
  color: #bfbfbf;
}

/* 节点可点击交互 */
.stage-node {
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;
  padding: 8px 4px;
}

.stage-node:hover {
  background: #f0f5ff;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.1);
}

.stage-node.stage-selected {
  background: #e6f4ff;
  box-shadow: 0 0 0 2px #1677ff33;
}

.icon-check {
  font-size: 18px;
}

.icon-warn {
  font-size: 16px;
}

.icon-dot {
  font-size: 14px;
}

.stage-info {
  text-align: center;
}

.stage-label {
  font-size: 11px;
  color: #595959;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
}

.stage-code {
  font-size: 10px;
  color: #8c8c8c;
  margin-bottom: 4px;
  white-space: nowrap;
}

.stage-status-badge {
  display: inline-block;
  font-size: 10px;
  padding: 1px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.stage-status-badge.completed {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.stage-status-badge.warning {
  background: #fffbe6;
  color: #faad14;
  border: 1px solid #ffe58f;
}

.stage-status-badge.blocked {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.stage-status-badge.pending {
  background: #f5f5f5;
  color: #8c8c8c;
  border: 1px solid #d9d9d9;
}

/* 阶段进度条 */
.stage-progress {
  margin-top: 6px;
  width: 80px;
}

.stage-progress-text {
  display: block;
  font-size: 10px;
  color: #8c8c8c;
  text-align: center;
  margin-top: 1px;
}

/* ====== 节点交易信息穿透 ====== */
.transaction-panel {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.trans-header {
  background: #fafafa;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #262626;
  border-bottom: 1px solid #f0f0f0;
}

/* 穿透区域 - 空提示 */
.trans-empty-hint {
  padding: 24px 16px;
  text-align: center;
  font-size: 12px;
  color: #8c8c8c;
}

/* 穿透区域 - 阶段标题 */
.trans-stage-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 6px;
  font-size: 13px;
  font-weight: 600;
  color: #262626;
}

/* 穿透区域 - 卡片列表 */
.trans-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 16px 16px;
}

.trans-doc-card {
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 10px 14px;
  min-width: 200px;
  flex: 1;
  max-width: 340px;
  transition: box-shadow 0.2s;
}

.trans-doc-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.doc-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.doc-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #1677ff;
  word-break: break-all;
}

.doc-card-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doc-card-field {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 12px;
  line-height: 1.6;
}

.doc-card-label {
  color: #8c8c8c;
  flex-shrink: 0;
}

.doc-card-value {
  color: #262626;
  font-weight: 500;
}

.trans-no-docs {
  padding: 16px;
}
</style>
