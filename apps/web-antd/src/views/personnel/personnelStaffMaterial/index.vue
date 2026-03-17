<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PersonnelStaffMaterialForm } from '#/api/personnel/personnelStaffMaterial/model';

import { ref, watch } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message, Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  personnelStaffMaterialList,
  personnelStaffMaterialRemove,
} from '#/api/personnel/personnelStaffMaterial';
import { ossDownload } from '#/api/system/oss';
import { downloadByData } from '#/utils/file/download';

import { columns } from './data';
import personnelStaffMaterialDrawer from './personnelStaffMaterial-drawer.vue';

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
        return await personnelStaffMaterialList({
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
  id: 'personnel-personnelStaffMaterial-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  showSearchForm: false,
});

watch(
  () => props.jobnumber,
  () => {
    tableApi.query();
  },
);

const [PersonnelStaffMaterialDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: personnelStaffMaterialDrawer,
});

function handleAdd() {
  drawerApi.setData({ jobNumber: props.jobnumber });
  drawerApi.open();
}

async function handleEdit(row: Required<PersonnelStaffMaterialForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<PersonnelStaffMaterialForm>) {
  await personnelStaffMaterialRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<PersonnelStaffMaterialForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await personnelStaffMaterialRemove(ids);
      await tableApi.query();
    },
  });
}

/* function handleDownloadExcel() {
  commonDownloadExcel(
    personnelStaffMaterialExport,
    '人事-员工资料附件数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
} */

function isImageFile(ext: string) {
  const supportList = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  return supportList.some((item) => ext.toLocaleLowerCase().includes(item));
}

async function handleDownload(row: OssFile) {
  const downloadSize = ref($t('pages.common.downloadLoading'));
  const hideLoading = message.loading({
    content: () => downloadSize.value,
    duration: 0,
  });
  try {
    const data = await ossDownload(row.ossId, (e) => {
      // 计算下载进度
      const percent = Math.floor((e.loaded / e.total!) * 100);
      // 已经下载
      const current = calculateFileSize(e.loaded);
      // 总大小
      const total = calculateFileSize(e.total!);
      downloadSize.value = `已下载: ${current}/${total} (${percent}%)`;
    });
    downloadByData(data, row.suffix);
    message.success('下载完成');
  } finally {
    hideLoading();
  }
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="人事-员工资料附件列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['personnel:personnelStaffMaterial:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['personnel:personnelStaffMaterial:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #fileUrl="{ row }">
        <a-image
          :key="row.fileUrl"
          v-if="isImageFile(row.fileUrl)"
          :src="row.fileUrl"
          height="50px"
          :fallback="fallbackImageBase64"
        >
          <template #placeholder>
            <div class="flex size-full items-center justify-center">
              <Spin />
            </div>
          </template>
        </a-image>
        <span v-else>{{ row.fileUrl }}</span>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['system:oss:download']"
            @click="handleDownload(row)"
          >
            {{ $t('pages.common.download') }}
          </action-button>
          <action-button
            v-access:code="['personnel:personnelStaffMaterial:edit']"
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
              v-access:code="['personnel:personnelStaffMaterial:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <PersonnelStaffMaterialDrawer @reload="tableApi.query()" />
  </Page>
</template>
