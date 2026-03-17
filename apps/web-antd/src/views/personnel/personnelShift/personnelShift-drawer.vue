<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { PersonnelShiftForm } from '#/api/personnel/personnelShift/model';
import type { PersonnelShiftRuleForm } from '#/api/project/personnelShiftRule/model';

import { computed, ref } from 'vue';

import { alert, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  Button,
  Checkbox,
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Row,
  Select,
  Tag,
  TimePicker,
} from 'antdv-next';

import {
  personnelShiftAdd,
  personnelShiftInfo,
  personnelShiftUpdate,
} from '#/api/personnel/personnelShift';
import { calculateDuration, formatDuration } from '#/utils/date';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

import ShiftRule from './components/personnelShiftRule.vue';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});
const createRuleDefaults = (
  startName: string,
  afterName: string,
  firstDayAfterDisabled: boolean,
): PersonnelShiftRuleForm => ({
  id: undefined,
  shiftId: undefined,
  number: undefined,
  firstDayAfter: 0,
  secondDayAfter: 0,
  workHours: '08:00:00',
  late: 10,
  extremeLate: undefined,
  lateLackCard: 120,
  earlyCard: 120,
  offHours: '18:00:00',
  earlyLeave: 10,
  earlyLackCard: 120,
  delayCard: 360,
  firstDayAfterDisabled,
  startName,
  afterName,
});
/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelShiftForm> = {
  id: undefined,
  name: undefined,
  number: 1,
  restTime: undefined,
  restTimeDisabled: true,
  restStart: '12:00:00',
  restEnd: '13:30:00',
  restStartAfter: 0,
  restEndAfter: 0,
  overtime: 30,
  workTime: 0,
  remark: undefined,
  rules: [createRuleDefaults('上班1', '下班1', true)],
};

// 班次2工作时长
const workTime2 = ref(0);
// 中途休息时长
const restPeriod = ref(0);
// 工作时长
const workTotal = computed(() => {
  return formatDuration(workTime1.value + workTime2.value - restPeriod.value);
});

/**
 * 表单数据ref
 */
const formData = ref(defaultValues);
// 班次1工作时长
const workTime1 = ref(
  calculateDuration(
    formData.value.rules[0].workHours,
    formData.value.rules[0].offHours,
    formData.value.rules[0].firstDayAfter,
    formData.value.rules[0].secondDayAfter,
  ),
);
type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<PersonnelStaffForm>>({
  name: [{ required: true, message: '班次名称不能为空' }],
  number: [
    {
      required: true,
      message: '上下班次数不能为空',
    },
  ],
  overtime: [{ required: true, message: '加班起算时间不能为空' }],
  workTime: [{ required: true, message: '工作时长不能为空' }],
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
  class: 'w-[1050px]',
  fullscreenButton: false,
  closeOnClickModal: false,
  onBeforeClose,
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
      const record = await personnelShiftInfo(id);
      // 只赋值存在的字段
      formData.value = record;
      formData.value.restTimeDisabled = formData.value.number < 2;
    }
    await markInitialized();
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
      ? personnelShiftUpdate(data)
      : personnelShiftAdd(data));
    resetInitialized();
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
// 上下班次数变化
function handleNumberChange() {
  const val = formData.value.number;
  if (val === 1) {
    // 删除行
    formData.value.rules.splice(1);
    workTime2.value = 0;
    formData.value.restTimeDisabled = true;
  }
  if (val === 2) {
    formData.value.rules.push(createRuleDefaults('上班2', '下班2', false));
    workTime2.value = calculateDuration(
      formData.value.rules[1].workHours,
      formData.value.rules[1].offHours,
      formData.value.rules[1].firstDayAfter,
      formData.value.rules[1].secondDayAfter,
    );
    formData.value.restTimeDisabled = false;
  }
}
// 中途休息开关变化
function restTimeChange() {
  const val = formData.value.restTime;
  restPeriod.value = val
    ? calculateDuration(
        formData.value.restStart,
        formData.value.restEnd,
        formData.value.restStartAfter,
        formData.value.restEndAfter,
      )
    : 0;
}
// 工作时长计算并验证规则是否正确
function workTimeVerify() {
  const ruleDefaultValues = formData.value.rules[0];
  const workHours = ruleDefaultValues.workHours;
  const offHours = ruleDefaultValues.offHours;
  const firstDayAfter = ruleDefaultValues.firstDayAfter;
  const secondDayAfter = ruleDefaultValues.secondDayAfter;

  workTime1.value = calculateDuration(
    workHours,
    offHours,
    firstDayAfter,
    secondDayAfter,
  );

  if (formData.value.restTimeDisabled && formData.value.restTime) {
    if (
      formData.value.restStart < workHours ||
      formData.value.restEndAfter > secondDayAfter ||
      (formData.value.restEndAfter === secondDayAfter &&
        formData.value.restEnd > offHours)
    ) {
      alert({
        content: '休息时间范围要在上班时间1和下班时间1之间',
        icon: 'danger',
      });
      return;
    }
    if (
      formData.value.restStartAfter > formData.value.restEndAfter ||
      (formData.value.restStartAfter === formData.value.restEndAfter &&
        formData.value.restEnd < formData.value.restStart)
    ) {
      alert({
        content: '休息开始时间不能大于休息结束时间',
        icon: 'danger',
      });
      return;
    }
    restPeriod.value = formData.value.restTime
      ? calculateDuration(
          formData.value.restStart,
          formData.value.restEnd,
          formData.value.restStartAfter,
          formData.value.restEndAfter,
        )
      : 0;
  } else {
    restPeriod.value = 0;
  }

  if (secondDayAfter === 0 && workHours > offHours) {
    alert({
      content: '上班时间1不能大于下班时间1',
      icon: 'danger',
    });
    return;
  }
  if (formData.value.number === 2) {
    const ruleDefaultValues1 = formData.value.rules[1];
    const workHours1 = ruleDefaultValues1.workHours;
    const offHours1 = ruleDefaultValues1.offHours;
    const firstDayAfter1 = ruleDefaultValues1.firstDayAfter;
    const secondDayAfter1 = ruleDefaultValues1.secondDayAfter;
    if (firstDayAfter1 <= secondDayAfter && workHours1 < offHours) {
      alert({
        content: '上班时间2不能小于下班时间1',
        icon: 'danger',
      });
      return;
    }
    if (workHours1 > offHours1) {
      alert({
        content: '上班时间2不能大于下班时间2',
        icon: 'danger',
      });
      return;
    }
    workTime2.value = calculateDuration(
      workHours1,
      offHours1,
      firstDayAfter1,
      secondDayAfter1,
    );
  }
  formData.value.workTime =
    workTime1.value + workTime2.value - restPeriod.value;
  alert({
    content: '验证通过',
    icon: 'success',
  });
}
</script>

<template>
  <BasicDrawer :title="title">
    <Form :label-col="{ span: 4 }" :model="formData" ref="formInstance">
      <Row>
        <Col span="12">
          <FormItem label="班次名称" name="name" :rules="formRules.name">
            <Input
              v-model:value="formData.name"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="上下班次数" name="number" :rules="formRules.number">
            <RadioGroup
              button-style="solid"
              v-model:value="formData.number"
              @change="handleNumberChange"
            >
              <Radio :value="1">1次上下班</Radio>
              <Radio :value="2">2次上下班</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="工作时长" name="workTime" :label-col="{ span: 2 }">
        <Tag color="blue">{{ workTotal }}</Tag>
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="workTimeVerify"
        >
          计算并验证
        </Button>
      </FormItem>
      <ShiftRule
        :rulelist="formData.rules"
        @update:work-time="
          (val1, val2) => ((workTime1 = val1), (workTime2 = val2))
        "
      />

      <Row v-if="formData.restTimeDisabled">
        <Col :span="0.1">
          <Checkbox
            v-model:checked="formData.restTime"
            name="restTime"
            style="margin-top: 5px"
            @change="restTimeChange"
          />
        </Col>
        <Col :span="23">
          <FormItem
            label="中途休息"
            name="restTime"
            :label-col="{ span: 2 }"
            :rules="formRules.restTime"
          >
            <FormItem name="restStartAfter" :label-col="{ span: 2 }">
              <Select
                v-model:value="formData.restStartAfter"
                :options="getDictOptions('shift_date_type', true)"
                :get-popup-container="getPopupContainer"
                :placeholder="$t('ui.formRules.selectRequired')"
                style="width: 100px"
              />
            </FormItem>
            <FormItem name="restStart" :label-col="{ span: 2 }">
              <TimePicker
                v-model:value="formData.restStart"
                name="restStart"
                value-format="HH:mm:ss"
                format="HH:mm"
                @change="restTimeChange"
              />-
            </FormItem>
            <Select
              v-model:value="formData.restEndAfter"
              :options="getDictOptions('shift_date_type', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              style="width: 100px"
            />
            <TimePicker
              v-model:value="formData.restEnd"
              value-format="HH:mm:ss"
              format="HH:mm"
              @change="restTimeChange"
            />
          </FormItem>
        </Col>
      </Row>

      <FormItem
        name="overtime"
        label="加班起算时间：最后班次下班"
        :label-col="{ span: 5 }"
        :rules="formRules.overtime"
      >
        <InputNumber
          v-model:value="formData.overtime"
          :placeholder="$t('ui.formRules.required')"
          style="width: 260px"
          suffix="分钟后开始计算加班"
        />
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
