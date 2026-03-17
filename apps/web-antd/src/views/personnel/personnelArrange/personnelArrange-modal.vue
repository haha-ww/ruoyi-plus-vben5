<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { PersonnelArrangeForm } from '#/api/personnel/personnelArrange/model';

import { computed, onMounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Button, DatePicker, Form, FormItem, Select, Table } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  getArrangeRecordList,
  personnelArrangeInfo,
  personnelArrangeUpdate,
} from '#/api/personnel/personnelArrange';
import { groupSelectList } from '#/api/personnel/personnelGroup';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelArrangeForm> = {
  id: undefined,
  groupId: undefined,
  uid: undefined,
  date: undefined,
};

/**
 * 表单数据ref
 */
const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<ErpMaterialBomForm>>({
  groupId: [{ required: true, message: '考勤组ID不能为空' }],
  date: [{ required: true, message: '考勤时间不能为空' }],
});

const formInstance = ref<FormInstance>();

function customFormValueGetter() {
  return JSON.stringify(formData.value);
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[550px]',
  fullscreen: true,
  appendToMain: true,
  fullscreenButton: false,
  closeOnClickModal: false,
  onClosed: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await personnelArrangeInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      getArrangeRecord();
    } else {
      employees.value = [];
      days.value = [];
    }

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    data.list = employees.value;
    console.log('data', data);
    await personnelArrangeUpdate(data);
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleCancel() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
}

// 初始化当月日期
const generateDays = () => {
  console.log('generateDays', new Date(formData.value.date));
  console.log('formData.value.date', new Date());
  month.value = new Date(formData.value.date).getMonth() + 1;
  const date = new Date(formData.value.date);
  const year = date.getFullYear();
  const month1 = date.getMonth();
  const daysInMonth = new Date(year, month1 + 1, 0).getDate();

  days.value = Array.from({ length: daysInMonth }, (_, i) => {
    const dayDate = new Date(year, month1, i + 1);
    return {
      date: `${year}-${month1 + 1}-${i + 1}`,
      day: i + 1,
      weekday: ['日', '一', '二', '三', '四', '五', '六'][dayDate.getDay()],
    };
  });
};
// 当前月份
const month = ref();
const days = ref([]);

// 表格列配置
const columns = computed(() => {
  const baseColumns = [
    {
      title: '姓名',
      dataIndex: 'uidName',
      width: 100,
      key: 'uidName',
      fixed: 'left',
    },
    ...days.value.map((day) => ({
      title: `${month.value}-${day.day} 周${day.weekday}`,
      dataIndex: `day${day.day}`, // 简化数据结构
      width: 120,
      key: day.date,
    })),
  ];
  return baseColumns;
});

const shifts = ref([]);
// 示例员工数据
const employees = ref([]);

// 考勤组下拉列表
const groupLoading = ref(false);
const groupOptions = ref([]);

// 初始化加载考勤组
const loadGroups = async () => {
  try {
    groupLoading.value = true;
    const list = await groupSelectList();
    console.log('考勤组列表', list);
    groupOptions.value = list;
  } catch (error) {
    console.error('考勤组加载失败', error);
  } finally {
    groupLoading.value = false;
  }
};
// 获取排班信息
const getArrangeRecord = async () => {
  generateDays();
  await formInstance.value?.validate();
  const resp = await getArrangeRecordList({
    groupId: formData.value.groupId,
    date: formData.value.date,
  });
  console.log('排班信息返回数据:', resp);
  console.log('groupList:', resp.groupList);
  employees.value = resp.list || [];
  shifts.value = resp.groupList || [];
  shifts.value.push({ name: '休息', id: 0, color: 'red' });
  console.log('shifts最终值:', shifts.value);
  formData.value.id = resp.id;
};
// 组件挂载时加载
onMounted(loadGroups);
</script>

<template>
  <BasicModal :title="title">
    <Form style="display: flex">
      <FormItem label="考勤组" :rules="formRules.groupId">
        <Select
          v-model:value="formData.groupId"
          :field-names="{ label: 'name', value: 'id' }"
          :options="groupOptions"
          :loading="groupLoading"
          show-search
          option-filter-prop="label"
          placeholder="请选择考勤组"
        />
      </FormItem>
      <FormItem class="ml-4" label="考勤时间" :rules="formRules.date">
        <DatePicker
          v-model:value="formData.date"
          picker="month"
          value-format="YYYY-MM"
        />
      </FormItem>
      <Button class="ml-4" type="primary" @click="getArrangeRecord">
        获取排班信息
      </Button>
    </Form>
    <Table
      :columns="columns"
      :data-source="employees"
      bordered
      size="small"
      :pagination="false"
      class="mt-4"
      :scroll="{ x: 500 }"
    >
      <template #bodyCell="{ column, record }">
        <!-- 姓名列 -->
        <template v-if="column.dataIndex === 'uidName'">
          <strong>{{ record.uidName }}</strong>
        </template>

        <!-- 动态日期列 -->
        <template v-else-if="column.dataIndex.startsWith('day')">
          <Select
            v-model:value="record[column.dataIndex]"
            style="width: 100%"
            :class="{ 'rest-selected': record[column.dataIndex] === 0 }"
            :status="!record[column.dataIndex] ? 'error' : undefined"
            :options="shifts"
            :field-names="{ label: 'name', value: 'id' }"
          />
        </template>
      </template>

      <!-- 表头样式 -->
      <template #headerCell="{ column }">
        <div class="font-bold text-gray-600">{{ column.title }}</div>
      </template>
    </Table>
  </BasicModal>
</template>
<style>
/* 当选中“休息”时，修改文字颜色 */
.rest-selected .ant-select-selection-item {
  color: red !important;
}
</style>
