<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PurchasePlanItemVO } from '#/api/erp/purchasePlanItem/model';

import { useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { purchasePlanItemList } from '#/api/erp/purchasePlanItem';

import { columns, querySchema } from './data';

const props = defineProps<{
  defaultParams?: Record<string, any>;
}>();

const emit = defineEmits(['update:value']);

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 110,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
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
        return await purchasePlanItemList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          remainQuantity: 0,
          ...props.defaultParams,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'erp-purchasePlan-select',
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
  const rows = tableApi.grid.getCheckboxRecords?.() as PurchasePlanItemVO[];
  emit('update:value', rows ?? []);
  modalApi.close();
}

defineExpose({
  open: () => modalApi.open(),
  close: () => modalApi.close(),
});
</script>

<template>
  <BasicModal title="采购计划选择">
    <BasicTable table-title="采购计划明细列表">
      <template #toolbar-tools>
        <Space>
          <a-button type="primary" @click="handleConfirm">确定</a-button>
        </Space>
      </template>
    </BasicTable>
  </BasicModal>
</template>
