<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ProductionPlanForm, ProductionPlanVO } from '#/api/erp/productionPlan/model';
import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm, Progress, Space, TabPane, Tabs, Tag } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  productionPlanBuildFromSalesOrder,
  productionPlanExport,
  productionPlanList,
  productionPlanRemove,
} from '#/api/erp/productionPlan';
import { SelectSalesOrderItem } from '#/components/select-sales-order-item';
import { useBlobExport } from '#/utils/file/export';

import { columns, priorityOptions, querySchema, statusColorMap, statusOptions } from './data';
import productionPlanModal from './productionPlan-modal.vue';
import ProductionPlanGantt from './ProductionPlanGantt.vue';

// 当前激活的 tab
const activeTab = ref<'gantt' | 'list'>('list');

// 甘特图数据（全量，不分页）
const ganttData = ref<ProductionPlanVO[]>([]);
const ganttLoading = ref(false);

async function loadGanttData() {
  ganttLoading.value = true;
  try {
    const formValues = await tableApi.formApi.getValues();
    const res = await productionPlanList({ pageNum: 1, pageSize: 1000, ...formValues });
    ganttData.value = (res as any).rows ?? [];
  } finally {
    ganttLoading.value = false;
  }
}

function handleTabChange(key: string) {
  activeTab.value = key as 'gantt' | 'list';
  if (key === 'gantt') {
    loadGanttData();
  }
}

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: { allowClear: true },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  fieldMappingTime: [
    [
      'planTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await productionPlanList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'erp-productionPlan-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [ProductionPlanModal, modalApi] = useVbenModal({
  connectedComponent: productionPlanModal,
});

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
}

function handleView(row: Required<ProductionPlanVO>) {
  modalApi.setData({ id: row.id, view: true });
  modalApi.open();
}

async function handleEdit(row: Required<ProductionPlanVO>) {
  modalApi.setData({ id: row.id });
  modalApi.open();
}

async function handleDelete(row: Required<ProductionPlanForm>) {
  await productionPlanRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<ProductionPlanForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await productionPlanRemove(ids);
      await tableApi.query();
    },
  });
}

const { exportBlob, exportLoading, buildExportFileName } = useBlobExport(productionPlanExport);

async function handleExport() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('生产计划数据');
  exportBlob({ data: formValues, fileName });
}

// 甘特图双击打开编辑
function handleGanttEdit(id: number | string) {
  modalApi.setData({ id });
  modalApi.open();
}

function handleReload() {
  tableApi.query();
  if (activeTab.value === 'gantt') {
    loadGanttData();
  }
}

// 从销售订单构建
const selectSalesOrderItemRef = ref<InstanceType<typeof SelectSalesOrderItem>>();
const buildLoading = ref(false);

async function handleBuildFromSalesOrder(rows: SalesOrderItemVO[]) {
  if (rows.length === 0) return;
  buildLoading.value = true;
  try {
    const ids = rows.map((r) => r.id);
    await productionPlanBuildFromSalesOrder(ids);
    await tableApi.query();
  } finally {
    buildLoading.value = false;
  }
}
</script>

<template>
  <Page :auto-content-height="true">
    <Tabs :active-key="activeTab" class="production-plan-tabs" @change="handleTabChange">
<!-- 列表视图 -->
      <TabPane key="list" tab="列表视图">
        <BasicTable table-title="生产计划列表">
           <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['erp:productionPlan:export']"
            :loading="exportLoading"
            :disabled="exportLoading"
            @click="handleExport"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['erp:productionPlan:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['erp:productionPlan:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
          <a-button
            v-access:code="['erp:productionPlan:add']"
            :loading="buildLoading"
            @click="selectSalesOrderItemRef?.open()"
          >
            从销售订单构建
          </a-button>
          </Space>
      </template>
          <!-- 完成率插槽 -->
          <template #completionRate="{ row }">
            <Progress
              v-if="row.planQty > 0"
              :percent="Math.round(((row.actualQty || 0) / row.planQty) * 100)"
              size="small"
              :stroke-color="row.actualQty >= row.planQty ? '#52c41a' : '#1677ff'"
            />
            <span v-else>-</span>
          </template>
          <!-- 优先级插槽 -->
          <template #priority="{ row }">
            <span v-if="row.priority">
              <Tag
                :color="{ '1': 'red', '2': 'orange', '3': 'blue', '4': 'green' }[row.priority]"
              >
                {{ priorityOptions.find((o) => o.value === row.priority)?.label }}
              </Tag>
            </span>
          </template>
          <!-- 状态插槽 -->
          <template #status="{ row }">
            <Tag
              :color="statusColorMap[row.status]"
              :style="{ color: '#fff' }"
            >
              {{ statusOptions.find((o) => o.value === row.status)?.label }}
            </Tag>
          </template>
          <!-- 操作列 -->
          <template #action="{ row }">
            <Space>
              <action-button
                v-access:code="['erp:productionPlan:query']"
                @click.stop="handleView(row)"
              >
                查看
              </action-button>
              <action-button
                v-if="row.status == 1"
                v-access:code="['erp:productionPlan:edit']"
                @click.stop="handleEdit(row)"
              >
                {{ $t('pages.common.edit') }}
              </action-button>
              <Popconfirm
                v-if="row.status == 1"
                placement="left"
                title="确认删除？"
                @confirm="handleDelete(row)"
              >
                <action-button
                  danger
                  v-access:code="['erp:productionPlan:remove']"
                  @click.stop=""
                >
                  {{ $t('pages.common.delete') }}
                </action-button>
              </Popconfirm>
            </Space>
          </template>
        </BasicTable>
      </TabPane>

      <!-- 甘特图视图 -->
      <TabPane key="gantt" tab="甘特图" force-render>
        <div v-if="ganttLoading" class="gantt-loading">
          <a-spin tip="加载中..." />
        </div>
        <ProductionPlanGantt
          v-else
          :data="ganttData"
          class="gantt-view"
          @edit="handleGanttEdit"
          @refresh="handleReload"
        />
      </TabPane>
    </Tabs>

    <ProductionPlanModal @reload="handleReload" />
    <SelectSalesOrderItem ref="selectSalesOrderItemRef" :default-params="{ isPlan: false }" @update:value="handleBuildFromSalesOrder" />
  </Page>
</template>

<style scoped>
.production-plan-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.production-plan-tabs :deep(.ant-tabs-content-holder) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.production-plan-tabs :deep(.ant-tabs-content) {
  height: 100%;
}

.production-plan-tabs :deep(.ant-tabs-tabpane) {
  height: 100%;
  /* overflow: hidden; */
}

.gantt-view {
  height: 100%;
}

.gantt-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
}
</style>
