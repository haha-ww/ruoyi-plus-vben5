<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import {
  crmCustomerLiaisonAdd,
  crmCustomerLiaisonInfo,
  crmCustomerLiaisonUpdate,
} from '#/api/crm/crmCustomerLiaison';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { drawerSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    // 默认占满两列
    formItemClass: 'col-span-2',
    // 默认label宽度 px
    labelWidth: 80,
    // 通用配置项 会影响到所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});
const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);
const [BasicDrawer, drawerApi] = useVbenDrawer({
  // 在这里更改宽度
  class: 'w-[550px]',
  fullscreenButton: false,
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id, customerId } = drawerApi.getData() as {
      customerId?: string;
      id?: number | string;
    };
    isUpdate.value = !!id;
    if (isUpdate.value && id) {
      const record = await crmCustomerLiaisonInfo(id);
      await formApi.setValues(record);
    } else {
      await formApi.setValues({ customerId });
      console.log('record', formApi.getValues());
    }

    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? crmCustomerLiaisonUpdate(data)
      : crmCustomerLiaisonAdd(data));
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleCancel() {
  await formApi.resetForm();
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title">
    <BasicForm />
  </BasicDrawer>
</template>
