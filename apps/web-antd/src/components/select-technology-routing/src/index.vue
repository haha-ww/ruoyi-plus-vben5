<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { TechnologyRoutingVO } from '#/api/erp/technologyRouting/model';

import { useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { technologyRoutingList } from '#/api/erp/technologyRouting';
import TechnologyRoutingModalComponent from '#/views/erp/technologyRouting/technologyRouting-modal.vue';

import { columns, querySchema } from './data';

const props = defineProps<{
  /** 预设查询参数，父组件可传入 routingCode / routingName / materialId 等 */
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
        
        return await technologyRoutingList({
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
  id: 'erp-technologyRouting-select',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    ready: async () => {
      if (props.defaultParams?.materialId) {
        const vals = { materialId: props.defaultParams.materialId };
        await tableApi.formApi.setValues(vals);
        tableApi.formApi.setLatestSubmissionValues(vals);
        await tableApi.query(vals);
      } else {
        await tableApi.query();
      }
    },
  },
});
const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: TechnologyRoutingModalComponent,
});

function handleViewDetail(row: TechnologyRoutingVO) {
  detailModalApi.setData({ id: row.id, viewMode: false });
  detailModalApi.open();
}

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1100px]',
  fullscreenButton: false,
  onConfirm: handleConfirm,
});

// 父组件 defaultParams 变化时，若弹窗已打开则重新查询

function handleConfirm() {
  const record = tableApi.grid.getRadioRecord?.() as null | TechnologyRoutingVO;
  emit('update:value', record ? [record] : []);
  modalApi.close();
}

defineExpose({
  open: () => modalApi.open(),
  close: () => modalApi.close(),
});
</script>

<template>
  <div>
    <BasicModal title="工艺路线选择">
      <BasicTable table-title="工艺路线列表">
        <template #toolbar-tools>
          <Space>
            <a-button type="primary" @click="handleConfirm">确定</a-button>
          </Space>
        </template>
        <template #action="{ row }">
          <a-button size="small" type="link" @click="handleViewDetail(row)">查看</a-button>
        </template>
      </BasicTable>
    </BasicModal>
    <DetailModal />
  </div>
</template>
