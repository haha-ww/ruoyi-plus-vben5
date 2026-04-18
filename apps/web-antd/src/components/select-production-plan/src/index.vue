<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ProductionPlanVO } from '#/api/erp/productionPlan/model';

import { useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { productionPlanList } from '#/api/erp/productionPlan';

import { columns, querySchema } from './data';

const props = defineProps<{
  defaultParams?: Record<string, any>;
}>();

const emit = defineEmits(['update:value']);

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gridOptions: VxeGridProps = {
  radioConfig: {
    highlight: true,
    trigger: 'row',
  },
  columns,
  height: 400,
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await productionPlanList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          status: 1,
          ...props.defaultParams,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'erp-productionPlan-select',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1100px]',
  fullscreenButton: false,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      await tableApi.grid.commitProxy('query');
    }
  },
});

function handleConfirm() {
  const row = tableApi.grid.getRadioRecord?.() as null | ProductionPlanVO;
  emit('update:value', row);
  modalApi.close();
}

defineExpose({
  open: () => modalApi.open(),
  close: () => modalApi.close(),
});
</script>

<template>
  <BasicModal title="生产计划选择">
    <BasicTable table-title="生产计划列表">
      <template #toolbar-tools>
        <Space>
          <a-button type="primary" @click="handleConfirm">确定</a-button>
        </Space>
      </template>
    </BasicTable>
  </BasicModal>
</template>
