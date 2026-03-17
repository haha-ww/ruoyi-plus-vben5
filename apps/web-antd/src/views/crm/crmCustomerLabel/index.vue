<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { CrmCustomerLabelForm } from '#/api/crm/crmCustomerLabel/model';

import { nextTick, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { PlusOutlined } from '@antdv-next/icons';
import { Popconfirm, Space,Tag,Input } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  crmCustomerLabelAdd,
  crmCustomerLabelList,
  crmCustomerLabelRemove,
} from '#/api/crm/crmCustomerLabel';

import crmCustomerLabelDrawer from './crmCustomerLabel-drawer.vue';
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
        return await crmCustomerLabelList({
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
  id: 'crm-crmCustomerLabel-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [CrmCustomerLabelDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: crmCustomerLabelDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(row: Required<CrmCustomerLabelForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<CrmCustomerLabelForm>) {
  await crmCustomerLabelRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<CrmCustomerLabelForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await crmCustomerLabelRemove(ids);
      await tableApi.query();
    },
  });
}
const inputRef = ref();
const showInput = (row: any) => {
  row.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};
const handleInputConfirm = (row: any) => {
  const inputValue = row.inputValue;
  crmCustomerLabelAdd({ pid: row.id, name: inputValue }).then((res) => {
    let labelName = row.labelName ? row.labelName : [];
    if (inputValue) {
      labelName = [...labelName, { id: res, name: inputValue }];
    }
    row.labelName = labelName;
    row.inputVisible = false;
    row.inputValue = '';
  });
};
const handleClose = (row, tag) => {
  // 通过 id 删除标签
  crmCustomerLabelRemove(tag.id).then(() => {
    // 删除成功后更新本地数据
    row.labelName = row.labelName.filter((t) => t.id !== tag.id);
  });
};
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="客户-客户标签列表">
      <template #labelName="{ row }">
        <Tag
          color="blue"
          v-for="tag in row.labelName"
          :key="tag.id"
          :closable="true"
          @close="handleClose(row, tag)"
        >
          {{ tag.name }}
        </Tag>
        <Input
          v-if="row.inputVisible"
          ref="inputRef"
          v-model:value="row.inputValue"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          @blur="handleInputConfirm(row)"
          @keyup.enter="handleInputConfirm(row)"
        />
        <Tag
          v-else
          color="blue"
          style="border-style: dashed"
          @click="showInput(row)"
        >
          <PlusOutlined />
        </Tag>
      </template>
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['crm:crmCustomerLabel:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['crm:crmCustomerLabel:add']"
            @click="handleAdd"
          >
            新增标签组
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['crm:crmCustomerLabel:edit']"
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
              v-access:code="['crm:crmCustomerLabel:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <CrmCustomerLabelDrawer @reload="tableApi.query()" />
  </Page>
</template>
