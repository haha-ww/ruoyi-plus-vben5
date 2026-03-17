<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PersonnelClockRecordForm } from '#/api/personnel/personnelClockRecord/model';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  personnelClockRecordExport,
  personnelClockRecordList,
} from '#/api/personnel/personnelClockRecord';
import { useBlobExport } from '#/utils/file/export';

import { columns, querySchema } from './data';
import personnelClockRecordDrawer from './personnelClockRecord-drawer.vue';

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
        return await personnelClockRecordList({
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
  id: 'personnel-personnelClockRecord-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [PersonnelClockRecordDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: personnelClockRecordDrawer,
});

async function handleEdit(row: Required<PersonnelClockRecordForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}
const { exportBlob, exportLoading, buildExportFileName } = useBlobExport(
  personnelClockRecordExport,
);
async function handleDownloadExcel() {
  const formValues = await tableApi.formApi.getValues();
  const fileName = buildExportFileName('人事-考勤打卡记录数据');
  exportBlob({ data: formValues, fileName });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="人事-考勤打卡记录列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['personnel:personnelClockRecord:export']"
            :loading="exportLoading"
            :disabled="exportLoading"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <!-- <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary" 
            v-access:code="['personnel:personnelClockRecord:remove']" 
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['personnel:personnelClockRecord:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button> -->
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['personnel:personnelClockRecord:edit']"
            @click.stop="handleEdit(row)"
          >
            查看
          </action-button>
        </Space>
      </template>
    </BasicTable>
    <PersonnelClockRecordDrawer @reload="tableApi.query()" />
  </Page>
</template>
