<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SalesOrderVO } from '#/api/erp/salesOrder/model';

import { useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { salesOrderList } from '#/api/erp/salesOrder';

import { columns, querySchema } from './data';

const emit = defineEmits(['update:value']);

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 90,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
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
        return await salesOrderList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'erp-salesOrder-select-sales-order',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1000px]',
  fullscreenButton: false,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      await tableApi.grid.commitProxy('query');
    }
  },
});

function handleConfirm() {
  const row = tableApi.grid.getRadioRecord?.() as SalesOrderVO | null;
  if (row) {
    emit('update:value', row);
  }
  modalApi.close();
}

defineExpose({
  open: () => modalApi.open(),
  close: () => modalApi.close(),
});
</script>

<template>
  <BasicModal title="销售订单选择">
    <BasicTable table-title="销售订单列表">
      <template #toolbar-tools>
        <Space>
          <a-button type="primary" @click="handleConfirm">确定</a-button>
        </Space>
      </template>
    </BasicTable>
  </BasicModal>
</template>
