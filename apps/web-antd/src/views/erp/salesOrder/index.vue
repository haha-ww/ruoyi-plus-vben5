<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SalesOrderForm } from '#/api/erp/salesOrder/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  salesOrderApprove,
  salesOrderExport,
  salesOrderList,
  salesOrderRemove, salesOrderUnApprove
} from '#/api/erp/salesOrder';
import { useBlobExport } from '#/utils/file/export';

import { columns, querySchema } from './data';
import salesOrderModal from './salesOrder-modal.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 处理区间选择器RangePicker时间格式 将一个字段映射为两个字段 搜索/导出会用到
  // 不需要直接删除
  // fieldMappingTime: [
  //  [
  //    'createTime',
  //    ['params[beginTime]', 'params[endTime]'],
  //    ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
  //  ],
  // ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  // 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
  // columns: columns(),
  columns,
  height: 'auto',
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
  // 表格全局唯一表示 保存列配置需要用到
  id: 'erp-salesOrder-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [SalesOrderModal, modalApi] = useVbenModal({
  connectedComponent: salesOrderModal,
});

function handleAdd() {
  modalApi.setData({ viewMode: true});
  modalApi.open();
}

async function handleEdit(row: Required<SalesOrderForm>) {
  modalApi.setData({ id: row.id , viewMode: true});
  modalApi.open();
}

async function handleDelete(row: Required<SalesOrderForm>) {
  await salesOrderRemove(row.id);
  await tableApi.query();
}

function handleView(row: Required<SalesOrderForm>) {
  modalApi.setData({ id: row.id, viewMode: false });
  modalApi.open();
}

async function handleApprove(row: Required<SalesOrderForm>) {
  window.modal.confirm({
    title: '提示',
    content: '确认审批该销售订单吗？',
    onOk: async () => {
      await salesOrderApprove({id: row.id});
      await tableApi.query();
    },
  });
}

async function handleUnApprove(row: Required<SalesOrderForm>) {
  window.modal.confirm({
    title: '提示',
    content: '确认反审批该销售订单吗？',
    onOk: async () => {
      await salesOrderUnApprove({id: row.id});
      await tableApi.query();
    },
  });
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<SalesOrderForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await salesOrderRemove(ids);
      await tableApi.query();
    },
  });
}

const { exportBlob, exportLoading, buildExportFileName } = useBlobExport(salesOrderExport);

async function handleExport() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('销售订单数据');
  exportBlob({ data: formValues, fileName });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="销售订单列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['erp:salesOrder:export']"
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
            v-access:code="['erp:salesOrder:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['erp:salesOrder:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space wrap>
          <action-button
            v-access:code="['erp:salesOrder:view']"
            @click.stop="handleView(row)"
          >
            查看
          </action-button>
          <action-button
          v-if="row.orderStatus === 10"
            v-access:code="['erp:salesOrder:edit']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </action-button>
          <action-button
          v-if="row.orderStatus === 20"
            v-access:code="['erp:salesOrder:approve']"
            @click.stop="handleApprove(row)"
            color="green" variant="outlined"
          >
            审批
          </action-button>
          <action-button
          v-if="row.orderStatus === 30"
            v-access:code="['erp:salesOrder:unApprove']"
            @click.stop="handleUnApprove(row)"
            color="red" variant="outlined"
          >
            反审批
          </action-button>
          <Popconfirm placement="left" title="确认删除？" @confirm="handleDelete(row)">
            <action-button
              danger
              v-access:code="['erp:salesOrder:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <SalesOrderModal @reload="tableApi.query()" />
  </Page>
</template>
