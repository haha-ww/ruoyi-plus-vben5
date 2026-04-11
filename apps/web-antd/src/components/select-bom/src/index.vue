<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MaterialBomVO } from '#/api/erp/materialBom/model';

import { useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { materialBomList } from '#/api/erp/materialBom';

import { columns, querySchema } from './data';

const emit = defineEmits(['update:value']);

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
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
    reserve: true,
    trigger: 'row',
  },
  columns,
  height: 400,
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await materialBomList({
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
  id: 'erp-materialBom-select-bom',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[900px]',
  fullscreenButton: false,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      await tableApi.grid.commitProxy('query');
    }
  },
});

function handleConfirm() {
  const records = (tableApi.grid.getCheckboxRecords?.() ?? []) as MaterialBomVO[];
  const reserveRecords = (tableApi.grid.getCheckboxReserveRecords?.() ??
    []) as MaterialBomVO[];

  const uniqMap = new Map<MaterialBomVO['id'], MaterialBomVO>();
  [...records, ...reserveRecords].forEach((row) => {
    uniqMap.set(row.id, row);
  });

  emit('update:value', Array.from(uniqMap.values()));
  modalApi.close();
}

defineExpose({
  open: () => modalApi.open(),
  close: () => modalApi.close(),
});
</script>

<template>
  <BasicModal title="BOM选择">
    <BasicTable table-title="物料bom选择列表">
      <template #toolbar-tools>
        <a-button type="primary" @click="handleConfirm">确定</a-button>
      </template>
    </BasicTable>
  </BasicModal>
</template>
