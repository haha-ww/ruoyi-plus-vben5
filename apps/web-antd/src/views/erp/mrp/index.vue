<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { MrpVO } from '#/api/erp/mrp/model';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { Space, Tag } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { mrpExport, mrpList } from '#/api/erp/mrp';
import { useBlobExport } from '#/utils/file/export';

import { columns, querySchema } from './data';
import MrpCalculateModal from './mrp-modal.vue';
import MrpResultModal from './mrp-result-modal.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: { allowClear: true },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns,
  height: 'auto',
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await mrpList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'erp-mrp-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [MrpCalculateModalComp, mrpModalApi] = useVbenModal({
  connectedComponent: MrpCalculateModal,
});

const [MrpResultModalComp, resultModalApi] = useVbenModal({
  connectedComponent: MrpResultModal,
  connectedComponentProps: {},
});

function handleAdd() {
  mrpModalApi.setData({});
  mrpModalApi.open();
}

async function handleViewResult(row: MrpVO) {
  resultModalApi.setData({ batchNo: row.batchNo });
  resultModalApi.open();
}

const { exportBlob, exportLoading, buildExportFileName } = useBlobExport(mrpExport);

async function handleExport() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('MRP运算记录');
  exportBlob({ data: formValues, fileName });
}

function handleReload() {
  tableApi.query();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="MRP运算记录">
      <template #toolbar-tools>
        <Space>
          <a-button
            :loading="exportLoading"
            :disabled="exportLoading"
            @click="handleExport"
          >
            导出
          </a-button>
          <a-button type="primary" @click="handleAdd">
            MRP运算
          </a-button>
        </Space>
      </template>

      <!-- 状态插槽 -->
      <template #status="{ row }">
        <Tag
          :color="
            row.status === 1
              ? 'green'
              : row.status === 2
                ? 'red'
                : 'blue'
          "
        >
          {{
            row.status === 0
              ? '进行中'
              : row.status === 1
                ? '已完成'
                : '失败'
          }}
        </Tag>
      </template>

      <!-- 操作列 -->
      <template #action="{ row }">
        <Space>
          <a-button
            type="link"
            size="small"
            :disabled="row.status === 0"
            @click.stop="handleViewResult(row)"
          >
            查看结果
          </a-button>
        </Space>
      </template>
    </BasicTable>

    <MrpCalculateModalComp @reload="handleReload" />
    <MrpResultModalComp />
  </Page>
</template>
