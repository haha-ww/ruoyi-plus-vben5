<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PersonnelStaffEmploymentForm } from '#/api/personnel/personnelStaffEmployment/model';

import { ref, watch } from 'vue';
import { Page, useVbenDrawer } from '@vben/common-ui';

import { Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  personnelStaffEmploymentList,
  personnelStaffEmploymentRemove,
} from '#/api/personnel/personnelStaffEmployment';

import { columns } from './data';
import personnelStaffEmploymentDrawer from './personnelStaffEmployment-drawer.vue';

const props = defineProps({
  jobnumber: { default: '', type: String },
});
const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
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
        return await personnelStaffEmploymentList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          jobNumber: props.jobnumber,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'personnel-personnelStaffEmployment-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  showSearchForm: false,
});

watch(() => props.jobnumber, () => {
  tableApi.query();
});

const [PersonnelStaffEmploymentDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: personnelStaffEmploymentDrawer,
});

function handleAdd() {
  drawerApi.setData({ jobNumber: props.jobnumber });
  drawerApi.open();
}

async function handleEdit(row: Required<PersonnelStaffEmploymentForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<PersonnelStaffEmploymentForm>) {
  await personnelStaffEmploymentRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<PersonnelStaffEmploymentForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await personnelStaffEmploymentRemove(ids);
      await tableApi.query();
    },
  });
}

/* function handleDownloadExcel() {
  commonDownloadExcel(
    personnelStaffEmploymentExport,
    '人事-员工任职记录数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
} */
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="人事-员工任职记录列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['personnel:personnelStaffEmployment:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['personnel:personnelStaffEmployment:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #attachmentUrl="{ row }">
        <a-image
          :key="row.attachmentUrl"
          v-if="row.attachmentUrl != null"
          :src="row.attachmentUrl"
          height="50px"
          :fallback="fallbackImageBase64"
        />
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['personnel:personnelStaffEmployment:edit']"
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
              v-access:code="['personnel:personnelStaffEmployment:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <PersonnelStaffEmploymentDrawer @reload="tableApi.query()" />
  </Page>
</template>
