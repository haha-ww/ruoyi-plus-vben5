<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { CrmCustomerFollowForm } from '#/api/crm/crmCustomerFollow/model';

import { ref, watch } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import {
  Alert,
  Avatar,
  Button,
  Dropdown,
  Timeline,
  TimelineItem
} from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  crmCustomerFollowList,
  crmCustomerFollowRemove,
} from '#/api/crm/crmCustomerFollow';

import crmCustomerFollowDrawer from './crmCustomerFollow-drawer.vue';
import { columns } from './data';

const props = defineProps({
  customerid: { default: '0', type: String },
});
watch(() => props.customerid, async (newVal) => {
  if (newVal) {
    await tableApi.query();
  }
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
const list = ref([]);
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
        const res = await crmCustomerFollowList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          customerId: props.customerid,
          ...formValues,
        });
        list.value = res.rows;
        return res;
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'crm-crmCustomerFollow-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  showSearchForm: false,
});

const [CrmCustomerFollowDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: crmCustomerFollowDrawer,
});

function handleAdd() {
  drawerApi.setData({ customerId: props.customerid });
  drawerApi.open();
}

async function handleEdit(row: Required<CrmCustomerFollowForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<CrmCustomerFollowForm>) {
  await crmCustomerFollowRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<CrmCustomerFollowForm>) => row.id);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await crmCustomerFollowRemove(ids);
      await tableApi.query();
    },
  });
}
</script>
<template>
  <div class="follow-header">
    <h3>跟进记录</h3>
    <a-button type="primary" @click="handleAdd">添加跟进记录</a-button>
  </div>
  <Timeline>
    <TimelineItem
      v-for="item in list"
      :key="item.id"
      :color="item.status == 2 ? 'green' : item.status == 1 ? 'red' : 'gray'"
    >
      <div class="message-container">
        <!-- 用户头像和用户名 -->
        <div class="user-info">
          <Avatar :size="40" :src="item.avatar" icon="User" />
          <div class="user-details">
            <p class="username">{{ item.nickName }}</p>
            <p class="timestamp">{{ item.createTime }}</p>
          </div>
          <div style="display: flex; justify-content: flex-end; width: 80%">
            <Dropdown
:menu="{ items: [
              { key: 'edit', label: '编辑', onClick: () => handleEdit(item) },
              { key: 'delete', label: '删除', onClick: () => handleDelete(item) }
            ] }"
>
              <Button>...</Button>
            </Dropdown>
          </div>
        </div>
        <!-- 消息内容 -->
        <p class="message-content" v-html="item.content"></p>

        <!-- 提醒时间 -->
        <Alert
          v-if="item.types === 1"
          :message="`提醒时间：${item.time}`"
          type="info"
          show-icon
          banner
          style="margin-top: 10px"
        />
      </div>
    </TimelineItem>
  </Timeline>
  <BasicTable style="width: 0; height: 0" />
  <CrmCustomerFollowDrawer @reload="tableApi.query()" />
</template>

<style scoped>
.message-container {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-details {
  margin-left: 10px;
}

.username {
  font-weight: bold;
  color: #333;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.message-content {
  font-size: 14px;
  color: #333;
}

.follow-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.follow-header h3 {
  margin: 0;
  font-size: 18px;
}
</style>
