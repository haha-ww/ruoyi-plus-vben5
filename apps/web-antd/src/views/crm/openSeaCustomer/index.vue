<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { CrmCustomerForm } from '#/api/crm/crmCustomer/model';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Checkbox, message, Modal, Popconfirm, Select, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  crmCustomerAssign,
  crmCustomerCancelLost,
  crmCustomerClaim,
  crmCustomerExport,
  crmCustomerMarkLost,
  crmCustomerRemove,
  crmOpenSeaCustomerList,
} from '#/api/crm/crmCustomer';
import { personnelStaffList } from '#/api/personnel/personnelStaff';
import { useBlobExport } from '#/utils/file/export';

import crmCustomerDrawer from './crmCustomer-drawer.vue';
import { columns, querySchema } from './data';

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
        return await crmOpenSeaCustomerList({
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
  id: 'crm-crmCustomer-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [CrmCustomerDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: crmCustomerDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(row: Required<CrmCustomerForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<CrmCustomerForm>) {
  await crmCustomerRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<CrmCustomerForm>) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await crmCustomerRemove(ids);
      await tableApi.query();
    },
  });
}

const { exportBlob, exportLoading, buildExportFileName } = useBlobExport(crmCustomerExport);

async function handleExport() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('公海客户数据');
  exportBlob({ data: formValues, fileName });
}

// 领取客户
async function handleClaim(row: Required<CrmCustomerForm>) {
  await crmCustomerClaim(row.id);
  message.success('领取成功');
  await tableApi.query();
}

function handleMultiClaim() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<CrmCustomerForm>) => row.id);
  Modal.confirm({
    title: '提示',
    content: `确认领取选中的${ids.length}条客户吗？`,
    onOk: async () => {
      for (const id of ids) {
        await crmCustomerClaim(id);
      }
      message.success('领取成功');
      await tableApi.query();
    },
  });
}

// 分配客户
const assignVisible = ref(false);
const assignUid = ref<number | string>('');
const customerId = ref<number | string>('');
const staffOptions = ref<{ label: string; value: number | string }[]>([]);
// 转移类型复选框
const transferCustomer = ref(true);
const transferOrder = ref(false);
const transferInvoice = ref(false);

async function loadStaffOptions() {
  const res = await personnelStaffList({ pageNum: 1, pageSize: 999 });
  staffOptions.value = (res.rows ?? []).map((item: any) => ({
    label: item.staffName ?? item.name,
    value: item.userId ?? item.id,
  }));
}

function openAssignModal(row: CrmCustomerForm) {
  assignUid.value = '';
  customerId.value = row.id;
  transferCustomer.value = true;
  transferOrder.value = false;
  transferInvoice.value = false;
  assignVisible.value = true;
  loadStaffOptions();
}

function handleAssign(row: Required<CrmCustomerForm>) {
  openAssignModal(row);
}


async function confirmAssign() {
  if (!assignUid.value) {
    message.warning('请选择接手人员');
    return;
  }
  await crmCustomerAssign({
    id: customerId.value,
    transferCustomer: transferCustomer.value,
    transferInvoice: transferInvoice.value,
    transferOrder: transferOrder.value,
    uid: assignUid.value,
  });
  message.success('分配成功');
  assignVisible.value = false;
  await tableApi.query();
}

function handleAssignUidChange(val: any) {
  assignUid.value = val;
}

function filterStaffOption(input: string, option: any) {
  return option.label?.toLowerCase().includes(input.toLowerCase());
}

function onTransferCustomerChange(e: any) {
  transferCustomer.value = e.target.checked;
}

function onTransferOrderChange(e: any) {
  transferOrder.value = e.target.checked;
}

function onTransferInvoiceChange(e: any) {
  transferInvoice.value = e.target.checked;
}

// 标为流失
async function handleMarkLost(row: Required<CrmCustomerForm>) {
  await crmCustomerMarkLost(row.id);
  message.success('已标为流失');
  await tableApi.query();
}


// 取消流失
async function handleCancelLost(row: Required<CrmCustomerForm>) {
  await crmCustomerCancelLost(row.id);
  message.success('已取消流失');
  await tableApi.query();
}

</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="公海客户">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['crm:openSeaCustomer:export']"
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
            v-access:code="['crm:openSeaCustomer:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['crm:openSeaCustomer:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space wrap>
          <action-button
            v-access:code="['crm:openSeaCustomer:edit']"
            @click.stop="handleEdit(row)"
          >
            查看
          </action-button>
          <Popconfirm
            placement="left"
            title="确认领取该客户？"
            @confirm="handleClaim(row)"
          >
            <action-button
              v-access:code="['crm:openSeaCustomer:collect']"
              @click.stop=""
            >
              领取
            </action-button>
          </Popconfirm>
          <action-button
            v-access:code="['crm:openSeaCustomer:transfer']"
            @click.stop="handleAssign(row)"
          >
            分配
          </action-button>
          <Popconfirm
            placement="left"
            title="确认标为流失？"
            @confirm="handleMarkLost(row)"
          >
            <action-button
              v-if="row.customerStatus != 3"
              danger
              v-access:code="['crm:openSeaCustomer:lost']"
              @click.stop=""
            >
              标为流失
            </action-button>
          </Popconfirm>
          <Popconfirm
            placement="left"
            title="确认取消流失？"
            @confirm="handleCancelLost(row)"
          >
            <action-button
              v-if="row.customerStatus == '3'"
              v-access:code="['crm:openSeaCustomer:cancelLost']"
              @click.stop=""
            >
              取消流失
            </action-button>
          </Popconfirm>
          <Popconfirm
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <action-button
              danger
              v-access:code="['crm:openSeaCustomer:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <CrmCustomerDrawer @reload="tableApi.query()" />

    <!-- 分配客户弹窗 -->
    <Modal
      :open="assignVisible"
      title="分配设置"
      :confirm-loading="false"
      @ok="confirmAssign"
      @cancel="assignVisible = false"
    >
      <div style="padding: 16px 0; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 8px;">接手人员：</span>
          <Select
            :value="assignUid"
            :options="staffOptions"
            placeholder="请选择企业成员"
            show-search
            :filter-option="filterStaffOption"
            style="flex: 1;"
            @change="handleAssignUidChange"
          />
        </div>
        <div style="display: flex; gap: 24px;">
          <Checkbox :checked="transferCustomer" @change="onTransferCustomerChange">
            客户转移
          </Checkbox>
          <Checkbox :checked="transferOrder" @change="onTransferOrderChange">
            订单转移
          </Checkbox>
          <Checkbox :checked="transferInvoice" @change="onTransferInvoiceChange">
            发票转移
          </Checkbox>
        </div>
      </div>
    </Modal>
  </Page>
</template>
