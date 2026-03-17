<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { PersonnelLeaveForm } from '#/api/personnel/personnelLeave/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import { DatePicker, Form, FormItem, Input, Select } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  personnelLeaveAdd,
  personnelLeaveInfo,
  personnelLeaveUpdate,
} from '#/api/personnel/personnelLeave';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelLeaveForm> = {
  id: undefined,
  staffId: undefined,
  staffName: undefined,
  leaveType: undefined,
  startTime: undefined,
  endTime: undefined,
  leaveLength: undefined,
  auditStatus: undefined,
  reason: undefined,
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
const formRules = ref<AntdFormRules<PersonnelStaffForm>>({
  staffId: [{ required: true, message: '员工id不能为空' }],
  leaveType: [{ required: true, message: '请假类型不能为空' }],
  startTime: [{ required: true, message: '开始时间不能为空' }],
  endTime: [{ required: true, message: '结束时间不能为空' }],
  leaveLength: [{ required: true, message: '请假时长不能为空' }],
  auditStatus: [{ required: true, message: '审核状态不能为空' }],
  reason: [{ required: true, message: '请假原因不能为空' }],
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

const [BasicDrawer, drawerApi] = useVbenDrawer({
  class: 'w-[550px]',
  fullscreenButton: false,
  closeOnClickModal: false,
  showConfirmButton: false,
  onClosed: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await personnelLeaveInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }

    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value
      ? personnelLeaveUpdate(data)
      : personnelLeaveAdd(data));
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleCancel() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title">
    <Form :label-col="{ span: 4 }">
      <FormItem label="员工" v-bind="validateInfos.staffName">
        <Input
          v-model:value="formData.staffName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="请假类型" v-bind="validateInfos.leaveType">
        <Select
          v-model:value="formData.leaveType"
          :options="getDictOptions('leave_type')"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="开始时间" v-bind="validateInfos.startTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.startTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="结束时间" v-bind="validateInfos.endTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.endTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="请假时长" v-bind="validateInfos.leaveLength">
        <Input
          v-model:value="formData.leaveLength"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="请假原因" v-bind="validateInfos.reason">
        <Input
          v-model:value="formData.reason"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
