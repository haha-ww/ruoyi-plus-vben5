<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { CrmCustomerLiaisonForm } from '#/api/crm/crmCustomerLiaison/model';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  crmCustomerLiaisonExport,
  crmCustomerLiaisonList,
  crmCustomerLiaisonRemove,
} from '#/api/crm/crmCustomerLiaison';
import { useBlobExport } from '#/utils/file/export';

import crmCustomerLiaisonDrawer from './crmCustomerLiaison-drawer.vue';
import { columns, querySchema } from './data';

const props = defineProps({
  customerid: { default: '', type: String },
});
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
        return await crmCustomerLiaisonList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          customerId: props.customerid,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'crm-crmCustomerLiaison-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  showSearchForm: false,
});

const [CrmCustomerLiaisonDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: crmCustomerLiaisonDrawer,
});

function handleAdd() {
  drawerApi.setData({ customerId: props.customerid });
  drawerApi.open();
}

async function handleEdit(row: Required<CrmCustomerLiaisonForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<CrmCustomerLiaisonForm>) {
  await crmCustomerLiaisonRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<CrmCustomerLiaisonForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await crmCustomerLiaisonRemove(ids);
      await tableApi.query();
    },
  });
}

const { exportBlob, exportLoading, buildExportFileName } = useBlobExport(
  crmCustomerLiaisonExport,
);

async function handleDownloadExcel() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('客户-客户联系人数据');
  exportBlob({ data: formValues, fileName });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="客户-客户联系人列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['crm:crmCustomerLiaison:export']"
            :loading="exportLoading"
            :disabled="exportLoading"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['crm:crmCustomerLiaison:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['crm:crmCustomerLiaison:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['crm:crmCustomerLiaison:edit']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </action-button>
          <Popconfirm
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <action-button
              danger
              v-access:code="['crm:crmCustomerLiaison:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <CrmCustomerLiaisonDrawer @reload="tableApi.query()" />
  </Page>
</template>
