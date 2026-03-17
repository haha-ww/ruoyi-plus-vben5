<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PersonnelStaffForm } from '#/api/personnel/personnelStaff/model';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  getQRCodeData,
  personnelStaffExport,
  personnelStaffList,
  personnelStaffRemove,
} from '#/api/personnel/personnelStaff';
import { useBlobExport } from '#/utils/file/export';

import { columns, querySchema } from './data';
import personnelStaffDrawer from './personnelStaff-drawer.vue';

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
        return await personnelStaffList({
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
  id: 'personnel-personnelStaff-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [PersonnelStaffDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: personnelStaffDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(row: Required<PersonnelStaffForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<PersonnelStaffForm>) {
  await personnelStaffRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<PersonnelStaffForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await personnelStaffRemove(ids);
      await tableApi.query();
    },
  });
}

const { exportBlob, exportLoading, buildExportFileName } =
  useBlobExport(personnelStaffExport);

async function handleDownloadExcel() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('人事-员工信息数据');
  exportBlob({ data: formValues, fileName });
}
// 生成扫码入职信息
function handleScanCode() {
  getQRCodeData().then((res) => {
    const host = window.location.host;
    qrCodeData.value = `http://${host}/personnel/personnelStaff/scanCodeEntry?code=${res}`;
  });
}
const qrCodeData = ref('');
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="人事-员工信息列表">
      <template #toolbar-tools>
        <Space>
          <a-popconfirm title="扫码入职">
            <template #description>
              <<a-qrcode :value="qrCodeData" :size="200" />
              <a-tag color="red">
                二维码链接有效期为1天，请尽快完成入职填写
              </a-tag>
            </template>
            <a-button
              v-access:code="['personnel:personnelStaff:scanCode']"
              type="link"
              @click="handleScanCode"
            >
              扫码入职
            </a-button>
          </a-popconfirm>

          <a-button
            v-access:code="['personnel:personnelStaff:export']"
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
            v-access:code="['personnel:personnelStaff:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['personnel:personnelStaff:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['personnel:personnelStaff:edit']"
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
              v-access:code="['personnel:personnelStaff:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <PersonnelStaffDrawer @reload="tableApi.query()" />
  </Page>
</template>
