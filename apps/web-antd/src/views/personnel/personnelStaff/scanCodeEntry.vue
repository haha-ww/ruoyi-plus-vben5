<script setup lang="ts">
import type { PersonnelStaffForm } from '#/api/personnel/personnelStaff/model';

import { onMounted, ref } from 'vue';

import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import { DatePicker, Divider, Form, FormItem, Input, Select } from 'antdv-next';
import dayjs from 'dayjs';

import { checkQRCodeData, scanCodeEntry } from '#/api/personnel/personnelStaff';
import { getDictOptions } from '#/utils/dict';

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelStaffForm> = {
  id: undefined,
  name: undefined,
  jobNumber: undefined,
  phone: undefined,
  idCard: undefined,
  birthday: undefined,
  age: undefined,
  sex: undefined,
  nativePlace: undefined,
  address: undefined,
  degree: undefined,
  nation: undefined,
  politicalStatus: undefined,
  maritalStatus: undefined,
  postId: undefined,
  deptId: undefined,
  depositPerson: undefined,
  bankCard: undefined,
  depositBank: undefined,
  title: undefined,
  personType: undefined,
  entryDate: undefined,
  conversionDate: undefined,
  departureDate: undefined,
  probationPeriod: undefined,
  personStatus: undefined,
  remark: undefined,
};

/**
 * 表单数据ref
 */
const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, RuleObject[]>> & {
  [key: string]: RuleObject[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<PersonnelStaffForm>>({
  name: [{ required: true, message: '姓名不能为空' }],
  phone: [
    { required: true, message: '手机号不能为空' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号格式',
    },
  ],
});

/**
 * useForm解构出表单方法
 */
const { validate, validateInfos } = Form.useForm(formData, formRules);

const formView = ref(false);
onMounted(() => {
  // 获取地址栏参数
  const query = new URLSearchParams(location.search);
  // 获取参数值
  const code = query.get('code');
  if (code) {
    checkQRCodeData(code).then(() => {
      formView.value = true;
    });
  }
});
async function handleConfirm() {
  try {
    await validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await scanCodeEntry(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * 身份证号改变事件
 */
async function idCardChange() {
  const idCard = formData.value.idCard;
  // 根据身份证号计算年龄和出生日期
  // 身份证号校验
  if (!idCard || (idCard.length !== 15 && idCard.length !== 18)) return;

  // 提取出生日期
  let birthDateStr = '';
  if (idCard.length === 15) {
    birthDateStr = `19${idCard.slice(6, 12)}`;
  } else if (idCard.length === 18) {
    birthDateStr = idCard.slice(6, 14);
  }

  // 格式化日期
  const birthDate = dayjs(
    birthDateStr.length === 6
      ? `${birthDateStr.slice(0, 4)}-${birthDateStr.slice(4, 6)}-01`
      : `${birthDateStr.slice(0, 4)}-${birthDateStr.slice(4, 6)}-${birthDateStr.slice(6, 8)}`,
  );

  // 计算年龄
  const today = dayjs();
  const age = today.diff(birthDate, 'year');

  // 更新表单数据
  formData.value.birthday = birthDate.format('YYYY-MM-DD');
  formData.value.age = age;
  formData.value.age = age;
  formData.value.birthday = birthday;
}
</script>
<template>
  <a-card title="入职申请" :footer="false" v-if="formView">
    <Form :label-col="{ span: 5 }">
      <Divider orientation="left">个人信息</Divider>
      <a-row>
        <a-col :span="12">
          <FormItem label="姓名" v-bind="validateInfos.name">
            <Input
              v-model:value="formData.name"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="手机号" v-bind="validateInfos.phone">
            <Input
              v-model:value="formData.phone"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <FormItem label="身份证号" v-bind="validateInfos.idCard">
            <Input
              v-model:value="formData.idCard"
              :placeholder="$t('ui.formRules.required')"
              @change="idCardChange"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="出生日期" v-bind="validateInfos.birthday">
            <!-- 需要自行调整参数 -->
            <DatePicker
              v-model:value="formData.birthday"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </FormItem>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <FormItem label="年龄" v-bind="validateInfos.age">
            <Input
              v-model:value="formData.age"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="用户性别" v-bind="validateInfos.sex">
            <Select
              v-model:value="formData.sex"
              :options="getDictOptions('sys_user_sex', true)"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <FormItem label="籍贯" v-bind="validateInfos.nativePlace">
            <Input
              v-model:value="formData.nativePlace"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="现居住地址" v-bind="validateInfos.address">
            <Input
              v-model:value="formData.address"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <FormItem label="学历" v-bind="validateInfos.degree">
            <Select
              v-model:value="formData.degree"
              :options="getDictOptions('degree_type', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="民族" v-bind="validateInfos.nation">
            <Select
              v-model:value="formData.nation"
              :options="getDictOptions('nation_type', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <FormItem label="政治面貌" v-bind="validateInfos.politicalStatus">
            <Select
              v-model:value="formData.politicalStatus"
              :options="getDictOptions('political_status', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="婚姻状况" v-bind="validateInfos.maritalStatus">
            <Select
              v-model:value="formData.maritalStatus"
              :options="getDictOptions('marital_status', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </a-col>
      </a-row>

      <Divider orientation="left">银行卡信息</Divider>
      <a-row>
        <a-col :span="12">
          <FormItem label="开户人姓名" v-bind="validateInfos.depositPerson">
            <Input
              v-model:value="formData.depositPerson"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
        <a-col :span="12">
          <FormItem label="银行卡号" v-bind="validateInfos.bankCard">
            <Input
              v-model:value="formData.bankCard"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <FormItem label="开户行" v-bind="validateInfos.depositBank">
            <Input
              v-model:value="formData.depositBank"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </a-col>
      </a-row>
    </Form>
    <div style="text-align: center">
      <a-button
        type="primary"
        style="margin-bottom: 20px"
        @click="handleConfirm"
      >
        保存
      </a-button>
    </div>
  </a-card>
</template>
