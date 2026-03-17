<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { PersonnelClockRecordForm } from '#/api/personnel/personnelClockRecord/model';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Form, FormItem, Image, Tag } from 'antdv-next';
import { pick } from 'lodash-es';

import {
  personnelClockRecordAdd,
  personnelClockRecordInfo,
  personnelClockRecordUpdate,
} from '#/api/personnel/personnelClockRecord';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelClockRecordForm> = {
  id: undefined,
  deptId: undefined,
  groupId: undefined,
  group: undefined,
  shiftId: undefined,
  shiftData: undefined,
  address: undefined,
  lat: undefined,
  lng: undefined,
  remark: undefined,
  image: undefined,
  uid: undefined,
  isExternal: undefined,
  deptName: undefined,
  imageUrl: undefined,
  userName: undefined,
  clockStatusName: undefined,
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
const formRules = ref<AntdFormRules<PersonnelStaffForm>>({});

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
      const record = await personnelClockRecordInfo(id);
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
      ? personnelClockRecordUpdate(data)
      : personnelClockRecordAdd(data));
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
      <FormItem label="考勤人员" :rules="formRules.uid">
        <Tag>{{ formData.userName }}</Tag>
      </FormItem>
      <FormItem label="部门" :rules="formRules.deptId">
        <Tag>{{ formData.deptName }}</Tag>
      </FormItem>
      <FormItem label="考勤状态">
        <Tag>{{ formData.clockStatusName }}</Tag>
      </FormItem>
      <FormItem label="打卡地址" :rules="formRules.address">
        <Tag>{{ formData.address }}</Tag>
      </FormItem>
      <FormItem label="图片" :rules="formRules.image">
        <!-- props参考apps/web-antd/src/components/upload/src/image-upload.vue 25行 -->
        <!-- maxNumber为1(默认)时只允许上传一个文件 会自动绑定为string而非string[] -->
        <!-- resultField默认为url 可选ossId -->
        <Image :src="formData.imageUrl" :width="100" :height="100" />
      </FormItem>
      <FormItem label="备注" :rules="formRules.remark">
        <Tag>{{ formData.remark }}</Tag>
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
