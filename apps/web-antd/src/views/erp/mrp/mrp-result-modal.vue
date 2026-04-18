<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import type { MrpResultItemVO, MrpResultVO } from '#/api/erp/mrp/model';

import { ref, computed } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { alert } from '@vben/common-ui';

import {
  Button,
  Space,
  Statistic,
  TabPane,
  Tabs,
} from 'antdv-next';

import { mrpGenerate, mrpResult } from '#/api/erp/mrp';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { resultColumns } from './data';

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1400px]',
  fullscreen: true,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;
    modalApi.modalLoading(true);
    const { batchNo } = modalApi.getData() as { batchNo: string };
    try {
      const res = await mrpResult(batchNo);
      resultData.value = res.data ?? ({} as MrpResultVO);
    } catch (error) {
      console.error('加载MRP结果失败:', error);
    } finally {
      modalApi.modalLoading(false);
    }
  },
});

const resultData = ref<MrpResultVO>({
  batchNo: '',
  calculateTime: '',
  totalMaterialCount: 0,
  purchaseSuggestCount: 0,
  productionSuggestCount: 0,
  purchaseItems: [],
  productionPlanItems: [],
});

const generating = ref(false);
const activeTab = ref('purchase');

const purchaseGridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
  },
  columns: resultColumns,
  data: computed(() => resultData.value.purchaseItems),
  height: 500,
  pagerConfig: { pageSize: 50 },
  rowConfig: { keyField: 'materialId' },
  id: 'mrp-result-purchase-grid',
};

const productionGridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
  },
  columns: resultColumns,
  data: computed(() => resultData.value.productionPlanItems),
  height: 500,
  pagerConfig: { pageSize: 50 },
  rowConfig: { keyField: 'materialId' },
  id: 'mrp-result-production-grid',
};

const [purchaseTable, purchaseTableApi] = useVbenVxeGrid({ gridOptions: purchaseGridOptions });
const [productionTable, productionTableApi] = useVbenVxeGrid({ gridOptions: productionGridOptions });

async function handleGeneratePurchaseOrder() {
  const grid = purchaseTableApi.grid;
  const selectedRows = (grid.getCheckboxRecords?.() ?? []) as MrpResultItemVO[];
  if (selectedRows.length === 0) {
    alert({ content: '请先选择要生成的采购建议', icon: 'warning' });
    return;
  }
  generating.value = true;
  try {
    await mrpGenerate({
      batchNo: resultData.value.batchNo,
      generateType: 'purchase',
      selectedPurchaseMaterialIds: selectedRows.map((r) => r.materialId),
    });
    alert({ content: '采购订单生成成功', icon: 'success' });
  } catch (error) {
    console.error(error);
  } finally {
    generating.value = false;
  }
}

async function handleGenerateProductionPlan() {
  const grid = productionTableApi.grid;
  const selectedRows = (grid.getCheckboxRecords?.() ?? []) as MrpResultItemVO[];
  if (selectedRows.length === 0) {
    alert({ content: '请先选择要生成的生产建议', icon: 'warning' });
    return;
  }
  generating.value = true;
  try {
    await mrpGenerate({
      batchNo: resultData.value.batchNo,
      generateType: 'production',
      selectedProductionMaterialIds: selectedRows.map((r) => r.materialId),
    });
    alert({ content: '生产计划生成成功', icon: 'success' });
  } catch (error) {
    console.error(error);
  } finally {
    generating.value = false;
  }
}

function handleClose() {
  resultData.value = {
    batchNo: '',
    calculateTime: '',
    totalMaterialCount: 0,
    purchaseSuggestCount: 0,
    productionSuggestCount: 0,
    purchaseItems: [],
    productionPlanItems: [],
  };
}
</script>

<template>
  <BasicModal title="MRP运算结果">
    <div class="result-header">
      <Space :size="24">
        <Statistic title="批次号" :value="resultData.batchNo" />
        <Statistic title="运算时间" :value="resultData.calculateTime" />
        <Statistic title="物料种类" :value="resultData.totalMaterialCount" />
        <Statistic title="采购建议数" :value="resultData.purchaseSuggestCount" />
        <Statistic title="生产建议数" :value="resultData.productionSuggestCount" />
      </Space>
    </div>

    <Tabs v-model:active-key="activeTab" class="result-tabs">
      <TabPane key="purchase" tab="采购建议">
        <div class="tab-toolbar">
          <Button type="primary" :loading="generating" @click="handleGeneratePurchaseOrder">
            生成采购订单
          </Button>
        </div>
        <purchaseTable />
      </TabPane>

      <TabPane key="production" tab="生产建议">
        <div class="tab-toolbar">
          <Button type="primary" :loading="generating" @click="handleGenerateProductionPlan">
            生成生产计划
          </Button>
        </div>
        <productionTable />
      </TabPane>
    </Tabs>
  </BasicModal>
</template>

<style scoped>
.result-header {
  padding: 12px 16px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin-bottom: 16px;
}

.result-tabs {
  height: calc(100vh - 280px);
  display: flex;
  flex-direction: column;
}

.result-tabs :deep(.ant-tabs-content-holder) {
  flex: 1;
  min-height: 0;
}

.tab-toolbar {
  margin-bottom: 12px;
}
</style>
