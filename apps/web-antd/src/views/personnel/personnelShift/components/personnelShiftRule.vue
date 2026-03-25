<script lang="ts" setup>
import type { PropType } from 'vue';

import type { PersonnelShiftRuleForm } from '#/api/project/personnelShiftRule/model';

import { onMounted } from 'vue';

import { getPopupContainer } from '@vben/utils';

import { Form, FormItem, InputNumber, Select, Table, TimePicker } from 'antdv-next';

import { getDictOptions } from '#/utils/dict';

const props = defineProps({
  rulelist: {
    type: Array as PropType<PersonnelShiftRuleForm[]>,
    default: () => [],
  },
});

onMounted(() => {
  console.log('getPopupContainer', props.rulelist);
});

const columns = [
  {
    title: '上班班次',
    dataIndex: 'startName',
    key: 'startName',
    width: 90,
  },
  {
    title: '上班规则',
    dataIndex: 'startRules',
    key: 'startRules',
    width: 400,
  },
  {
    title: '下班班次',
    dataIndex: 'afterName',
    key: 'afterName',
    width: 90,
  },
  {
    title: '下班规则',
    dataIndex: 'afterRules',
    key: 'afterRules',
    width: 400,
  },
];

function firstDayAfterChange() {
  const val = props.rulelist[1].firstDayAfter;
  const newRuleList = [...props.rulelist];
  if (val === 1) {
    newRuleList[1].secondDayAfter = 1;
    newRuleList[1].secondDayAfterDisabled = true;
  }
  if (val === 0) {
    newRuleList[1].secondDayAfterDisabled = false;
  }
}

function secondDayAfterChange() {
  const val = props.rulelist[0].secondDayAfter;
  if (props.rulelist.length > 1) {
    const newRuleList = [...props.rulelist];
    if (val === 1) {
      newRuleList[1].firstDayAfter = 1;
      newRuleList[1].firstDayAfterDisabled = true;
      newRuleList[1].secondDayAfter = 1;
      newRuleList[1].secondDayAfterDisabled = true;
    }
    if (val === 0) {
      newRuleList[1].firstDayAfterDisabled = false;
      newRuleList[1].secondDayAfterDisabled = false;
    }
  }
}
</script>
<template>
  <Table
    :columns="columns"
    :data-source="rulelist"
    :pagination="false"
    bordered="true"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'startRules'">
        <Form :label-col="{ span: 4 }">
          <FormItem label="上班时间">
            <Select
              v-model:value="record.firstDayAfter"
              :options="getDictOptions('shift_date_type', true)"
              :get-popup-container="getPopupContainer"
              style="width: 100px"
              :disabled="record.firstDayAfterDisabled"
              @change="firstDayAfterChange"
            />
            <TimePicker
              v-model:value="record.workHours"
              format="HH:mm"
              value-format="HH:mm:ss"
            />
          </FormItem>
          <FormItem label="晚到超过">
            <InputNumber
              v-model:value="record.late"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 200px"
              suffix="分钟记为迟到"
            />
          </FormItem>
          <FormItem label="晚到超过">
            <InputNumber
              v-model:value="record.lateLackCard"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 230px"
              suffix="分钟记为半天缺卡"
            />
          </FormItem>
          <FormItem label="最早提前">
            <InputNumber
              v-model:value="record.earlyCard"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 200px"
              suffix="分钟进行打卡"
            />
          </FormItem>
        </Form>
      </template>
      <template v-if="column.dataIndex === 'afterRules'">
        <Form :label-col="{ span: 4 }">
          <FormItem label="下班时间">
            <Select
              v-model:value="record.secondDayAfter"
              :options="getDictOptions('shift_date_type', true)"
              :get-popup-container="getPopupContainer"
              style="width: 100px"
              :disabled="record.secondDayAfterDisabled"
              @change="secondDayAfterChange"
            />
            <TimePicker
              v-model:value="record.offHours"
              format="HH:mm"
              value-format="HH:mm:ss"
            />
          </FormItem>
          <FormItem label="提前" :label-col="{ span: 3 }">
            <InputNumber
              v-model:value="record.earlyLeave"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 230px"
              suffix="分钟打卡记为早退"
            />
          </FormItem>
          <FormItem label="提前" :label-col="{ span: 3 }">
            <InputNumber
              v-model:value="record.earlyLackCard"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 260px"
              suffix="分钟打卡记为半天缺卡"
            />
          </FormItem>
          <FormItem label="最晚可延后" :label-col="{ span: 5 }">
            <InputNumber
              v-model:value="record.delayCard"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 200px"
              suffix="分钟进行打卡"
            />
          </FormItem>
        </Form>
      </template>
    </template>
  </Table>
</template>
