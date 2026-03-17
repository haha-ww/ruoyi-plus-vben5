<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { Rule } from 'antdv-next/dist/form/types';

import type { PersonnelStaffForm } from '#/api/personnel/personnelStaff/model';
import type { Role } from '#/api/system/user/model';

import { computed, h, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  Col,
  DatePicker,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Row,
  Select,
  TabPane,
  Tabs,
  Tag,
  TreeSelect,
} from 'antdv-next';
import dayjs from 'dayjs';
import { pick } from 'lodash-es';

import {
  personnelStaffAdd,
  personnelStaffInfo,
  personnelStaffUpdate,
} from '#/api/personnel/personnelStaff';
import { postOptionSelect } from '#/api/system/post';
import { roleOptionSelect } from '#/api/system/role';
import { getDeptTree } from '#/api/system/user';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';
import { authScopeOptions } from '#/views/system/role/data';

import StafEducation from '../personnelStaffEducation/index.vue';
import StaffEmployment from '../personnelStaffEmployment/index.vue';
import StaffFamily from '../personnelStaffFamily/index.vue';
import StaffMaterial from '../personnelStaffMaterial/index.vue';
import StaffWork from '../personnelStaffWork/index.vue';

const emit = defineEmits<{ reload: [] }>();
const jobNumber = ref<number | string>('0');
const activeKey = ref('1');
const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

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
  openAccount: false,
  userName: undefined,
  password: undefined,
  roleIds: [],
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
  name: [{ required: true, message: '姓名不能为空' }],
  phone: [
    { required: true, message: '手机号不能为空' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号格式',
    },
  ],
  // postId: [{ required: true, message: '岗位不能为空' }],
  deptId: [{ required: true, message: '部门不能为空' }],
  personType: [{ required: true, message: '人员类型不能为空' }],
  personStatus: [{ required: true, message: '人员状态不能为空' }],
  userName: [
    {
      required: formData.value.openAccount,
      message: '账号不能为空',
    },
  ],
  password: [
    {
      required: formData.value.openAccount,
      message: '密码不能为空',
    },
  ],
  roleIds: [
    {
      required: formData.value.openAccount,
      message: '角色不能为空',
    },
  ],
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
  class: 'w-[850px]',
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
    activeKey.value = '1';

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      activeKey.value = '1';
      const record = await personnelStaffInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      jobNumber.value = record.jobNumber;
    }
    await markInitialized();
    setupDeptSelect();
    genRoleOptionlabel();
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
      ? personnelStaffUpdate(data)
      : personnelStaffAdd(data));
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleCancel() {
  activeKey.value = '1';
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
}
/**
 * 初始化部门选择
 */
const treeData = ref<DeptTree[]>([]);
async function setupDeptSelect() {
  // updateSchema
  const deptTree = await getDeptTree();
  treeData.value = deptTree;
  const postListResp = await postOptionSelect(formData.value.deptId);
  postOptions.value = postListResp;
}
/**
 * 岗位的加载
 */
const postOptions = ref<PostOption[]>([]);
async function setupPostOptions() {
  formData.value.postId = undefined;
  console.log(formData.value.deptId);
  const postListResp = await postOptionSelect(formData.value.deptId);
  postOptions.value = postListResp;
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
}
/**
 * 生成角色的自定义label
 * 也可以用option插槽来做
 * renderComponentContent: () => ({
    option: ({value, label, [disabled, key, title]}) => '',
  }),
 */
const roles = ref<Role[]>([]);
async function genRoleOptionlabel(role: Role) {
  roles.value = await roleOptionSelect();
  roles.value.forEach((item) => {
    const found = authScopeOptions.find(
      (model) => model.value === item.dataScope,
    );
    console.log('asfasf', found);
    item.label = found
      ? ('div',
        { class: 'flex items-center gap-[6px]' },
        [
          h('span', null, item.roleName),
          h(Tag, { color: found.color }, () => found.label),
        ])
      : item.roleName;

    item.value = item.roleId;
    item.title = item.roleName;
  });
}
</script>

<template>
  <BasicDrawer :title="title">
    <Tabs v-model="activeKey">
      <TabPane key="1" tab="基本信息">
        <Form :label-col="{ span: 5 }" :model="formData" ref="formInstance">
          <Divider orientation="left">工作信息</Divider>
          <Row>
            <Col :span="12">
              <FormItem label="姓名" name="name" :rules="formRules.name">
                <Input
                  v-model:value="formData.name"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="工号"
                name="jobNumber"
                :rules="formRules.jobNumber"
              >
                <Input
                  v-model:value="formData.jobNumber"
                  placeholder="提交后自动生成工号"
                  readonly
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="部门" name="deptId" :rules="formRules.deptId">
                <TreeSelect
                  v-model:value="formData.deptId"
                  :tree-data="treeData"
                  show-search
                  tree-node-filter-prop="label"
                  tree-line="{ showLeafIcon: false }"
                  :get-popup-container="getPopupContainer"
                  :field-names="{
                    label: 'label',
                    value: 'id',
                    children: 'children',
                  }"
                  :placeholder="$t('ui.formRules.selectRequired')"
                  @change="setupPostOptions()"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="岗位" name="postId" :rules="formRules.postId">
                <Select
                  v-model:value="formData.postId"
                  :options="postOptions"
                  :field-names="{
                    label: 'postName',
                    value: 'postId',
                  }"
                  allow-clear
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="手机号" name="phone" :rules="formRules.phone">
                <Input
                  v-model:value="formData.phone"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="人员类型"
                name="personType"
                :rules="formRules.personType"
              >
                <Select
                  v-model:value="formData.personType"
                  :options="getDictOptions('person_type', true)"
                  :get-popup-container="getPopupContainer"
                  allow-clear
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row v-if="title === '新增'">
            <Col :span="12">
              <FormItem
                label="是否开通账号"
                name="openAccount"
                :rules="formRules.openAccount"
              >
                <Switch
                  v-model:checked="formData.openAccount"
                  checked-children="是"
                  un-checked-children="否"
                  @change="
                    (val) => {
                      console.log('openAccount', val);
                    }
                  "
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="账号"
                name="userName"
                :rules="formRules.userName"
                v-if="formData.openAccount"
              >
                <a-input
                  v-model:value="formData.userName"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
          </Row>

          <Row v-if="formData.openAccount && title === '新增'">
            <Col :span="12">
              <FormItem
                label="密码"
                name="password"
                :rules="formRules.password"
              >
                <Input
                  v-model:value="formData.password"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="角色" name="roleIds" :rules="formRules.roleIds">
                <Select
                  v-model:value="formData.roleIds"
                  :get-popup-container="getPopupContainer"
                  :options="roles"
                  mode="multiple"
                  allow-clear
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="职称" name="title" :rules="formRules.title">
                <Input
                  v-model:value="formData.title"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="人员状态"
                name="personStatus"
                :rules="formRules.personStatus"
              >
                <Select
                  v-model:value="formData.personStatus"
                  :options="getDictOptions('person_status', true)"
                  :get-popup-container="getPopupContainer"
                  allow-clear
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem
                label="试用期(天)"
                name="probationPeriod"
                :rules="formRules.probationPeriod"
              >
                <InputNumber
                  v-model:value="formData.probationPeriod"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="入职日期"
                name="entryDate"
                :rules="formRules.entryDate"
              >
                <!-- 需要自行调整参数 -->
                <DatePicker
                  v-model:value="formData.entryDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem
                label="转正日期"
                name="conversionDate"
                :rules="formRules.conversionDate"
              >
                <!-- 需要自行调整参数 -->
                <DatePicker
                  v-model:value="formData.conversionDate"
                  :get-popup-container="getPopupContainer"
                  placeholder="请选择"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="离职日期"
                name="departureDate"
                :rules="formRules.departureDate"
              >
                <!-- 需要自行调整参数 -->
                <DatePicker
                  v-model:value="formData.departureDate"
                  :get-popup-container="getPopupContainer"
                  placeholder="请选择"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </FormItem>
            </Col>
          </Row>

          <Divider orientation="left">个人信息</Divider>
          <Row>
            <Col :span="12">
              <FormItem
                label="身份证号"
                name="idCard"
                :rules="formRules.idCard"
              >
                <Input
                  v-model:value="formData.idCard"
                  :placeholder="$t('ui.formRules.required')"
                  @change="idCardChange"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="出生日期"
                name="birthday"
                :rules="formRules.birthday"
              >
                <!-- 需要自行调整参数 -->
                <DatePicker
                  v-model:value="formData.birthday"
                  :get-popup-container="getPopupContainer"
                  placeholder="请选择"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="年龄" name="age" :rules="formRules.age">
                <Input
                  v-model:value="formData.age"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="用户性别" name="sex" :rules="formRules.sex">
                <Select
                  v-model:value="formData.sex"
                  :get-popup-container="getPopupContainer"
                  :options="getDictOptions('sys_user_sex', true)"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem
                label="籍贯"
                name="nativePlace"
                :rules="formRules.nativePlace"
              >
                <Input
                  v-model:value="formData.nativePlace"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="现居住地址"
                name="address"
                :rules="formRules.address"
              >
                <Input
                  v-model:value="formData.address"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="学历" name="degree" :rules="formRules.degree">
                <Select
                  v-model:value="formData.degree"
                  :options="getDictOptions('degree_type', true)"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="民族" name="nation" :rules="formRules.nation">
                <Select
                  v-model:value="formData.nation"
                  :options="getDictOptions('nation_type', true)"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col :span="12">
              <FormItem
                label="政治面貌"
                name="politicalStatus"
                :rules="formRules.politicalStatus"
              >
                <Select
                  v-model:value="formData.politicalStatus"
                  :options="getDictOptions('political_status', true)"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="婚姻状况"
                name="maritalStatus"
                :rules="formRules.maritalStatus"
              >
                <Select
                  v-model:value="formData.maritalStatus"
                  :options="getDictOptions('marital_status', true)"
                  :get-popup-container="getPopupContainer"
                  :placeholder="$t('ui.formRules.selectRequired')"
                />
              </FormItem>
            </Col>
          </Row>

          <Divider orientation="left">银行卡信息</Divider>
          <Row>
            <Col :span="12">
              <FormItem
                label="开户人姓名"
                name="depositPerson"
                :rules="formRules.depositPerson"
              >
                <Input
                  v-model:value="formData.depositPerson"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem
                label="银行卡号"
                name="bankCard"
                :rules="formRules.bankCard"
              >
                <Input
                  v-model:value="formData.bankCard"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem
                label="开户行"
                name="depositBank"
                :rules="formRules.depositBank"
              >
                <Input
                  v-model:value="formData.depositBank"
                  :placeholder="$t('ui.formRules.required')"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane
        v-if="title === '编辑' && jobNumber !== '0'"
        key="2"
        tab="资料附件"
      >
        <StaffMaterial :jobnumber="jobNumber" />
      </TabPane>
      <TabPane
        v-if="title === '编辑' && jobNumber !== '0'"
        key="3"
        tab="教育经历"
      >
        <StafEducation :jobnumber="jobNumber" />
      </TabPane>
      <TabPane
        v-if="title === '编辑' && jobNumber !== '0'"
        key="4"
        tab="工作经历"
      >
        <StaffWork :jobnumber="jobNumber" />
      </TabPane>
      <TabPane
        v-if="title === '编辑' && jobNumber !== '0'"
        key="5"
        tab="家庭成员"
      >
        <StaffFamily :jobnumber="jobNumber" />
      </TabPane>
      <TabPane
        v-if="title === '编辑' && jobNumber !== '0'"
        key="6"
        tab="任职记录"
      >
        <StaffEmployment :jobnumber="jobNumber" />
      </TabPane>
    </Tabs>
  </BasicDrawer>
</template>
