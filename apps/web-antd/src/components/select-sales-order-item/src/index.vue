<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';

import { useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { salesOrderItemList } from '#/api/erp/salesOrderItem';

import { columns, querySchema } from './data';

const props = defineProps<{
  defaultParams?: Record<string, any>;
}>();
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
        return await salesOrderItemList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          isPlan: props.defaultParams?.isPlan,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'erp-salesOrderItem-select',
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
  const rows = tableApi.grid.getCheckboxRecords?.() as SalesOrderItemVO[];
  emit('update:value', rows ?? []);
  modalApi.close();
}

defineExpose({
  open: () => modalApi.open(),
  close: () => modalApi.close(),
});
</script>

<template>
  <BasicModal title="销售订单明细选择">
    <BasicTable table-title="销售订单明细列表">
      <template #toolbar-tools>
        <Space>
          <a-button type="primary" @click="handleConfirm">确定</a-button>
        </Space>
      </template>
    </BasicTable>
  </BasicModal>
</template>
