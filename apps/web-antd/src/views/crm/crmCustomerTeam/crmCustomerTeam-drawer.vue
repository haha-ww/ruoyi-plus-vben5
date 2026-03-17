<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import {
  crmCustomerTeamAdd,
  crmCustomerTeamInfo,
} from '#/api/crm/crmCustomerTeam';
import { SelectStaff } from '#/components/select-staff';

import { drawerSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    // 默认占满两列
    // 默认label宽度 px
  },
  schema: drawerSchema(),
  showDefaultActions: false,
});

const [BasicDrawer, modelApi] = useVbenModal({
  // 在这里更改宽度
  class: 'w-[950px]',
  fullscreenButton: false,
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  showConfirmButton: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }

    const { id, customerId } = modelApi.getData() as {
      customerId?: string;
      id?: number | string;
    };
    isUpdate.value = !!id;
    if (isUpdate.value && id) {
      const record = await crmCustomerTeamInfo(id);
      await formApi.setValues(record);
    } else {
      await formApi.setValues({ customerId });
    }
  },
});

async function handleConfirm(val) {
  try {
    modelApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());

    data.userIds = val;
    await crmCustomerTeamAdd(data);
    emit('reload');
    modelApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modelApi.lock(false);
  }
}

async function handleCancel() {
  await formApi.resetForm();
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title">
    <SelectStaff @update:value="(val) => handleConfirm(val)" />
    <BasicForm v-show="false" />
  </BasicDrawer>
</template>
