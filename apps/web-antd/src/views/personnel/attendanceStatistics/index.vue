<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { mounthList } from '#/api/personnel/attendanceStatistics';
import { getDeptTree } from '#/api/system/user';

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
  border: true,
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await mounthList({
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
  id: 'personnel-personnelArrange-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
const deptTreeData = ref([]);
// 部门下拉树
async function deptTree() {
  const res = await getDeptTree();
  deptTreeData.value = res;
}
onMounted(() => {
  deptTree();
});
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="人事-考勤月度统计列表">
      <template #form-deptItem>
        <TreeSelect
          v-model:value="deptId"
          style="width: 100%"
          :tree-data="deptTreeData"
          tree-checkable
          allow-clear
          :show-checked-strategy="SHOW_ALL"
          placeholder="选择考勤部门"
          tree-node-filter-prop="label"
          :field-names="{
            children: 'children',
            label: 'label',
            value: 'id',
          }"
        />
      </template>
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['personnel:attendanceStatistics:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
        </Space>
      </template>
    </BasicTable>
    <PersonnelArrangeModal @reload="tableApi.query()" />
  </Page>
</template>
