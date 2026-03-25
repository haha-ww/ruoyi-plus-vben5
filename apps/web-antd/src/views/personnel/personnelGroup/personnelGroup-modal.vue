<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { FormInstance } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { PersonnelGroupForm } from '#/api/personnel/personnelGroup/model';

import { computed, onUnmounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useAppConfig } from '@vben/hooks';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import AMapLoader from '@amap/amap-jsapi-loader';
import {
  Checkbox,
  CheckboxGroup,
  Col,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Row,
  Select,
  Switch,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import { pick } from 'lodash-es';

import {
  personnelGroupAdd,
  personnelGroupInfo,
  personnelGroupUpdate,
} from '#/api/personnel/personnelGroup';
import { shiftList } from '#/api/personnel/personnelShift';
import { getDeptTree, getDeptUserTree } from '#/api/system/user';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<PersonnelGroupForm> = {
  id: undefined,
  name: undefined,
  type: 0,
  address: undefined,
  lat: 36.009_273,
  lng: 119.412_992,
  effectiveRange: 500,
  locationName: undefined,
  repairAllowed: undefined,
  repairType: undefined,
  isLimitTime: undefined,
  limitTime: undefined,
  isLimitNumber: undefined,
  limitNumber: undefined,
  isPhoto: undefined,
  isExternal: undefined,
  isExternalNote: undefined,
  isExternalPhoto: undefined,
  uid: undefined,
  createdAt: undefined,
  remark: undefined,
  userArr: [],
  deptArr: [],
  shiftArr: [],
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
const formRules = ref<AntdFormRules<PersonnelGroupForm>>({
  name: [{ required: true, message: '考勤组名称不能为空' }],
  type: [{ required: true, message: '考勤类型不能为空' }],
  shiftArr: [{ required: true, message: '考勤班次不能为空' }],
  deptArr: [
    { required: formData.value.type === 1, message: '需要考勤部门不能为空' },
  ],
  userArr: [
    { required: formData.value.type === 0, message: '需要考勤人员不能为空' },
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
const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[100%]',
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
      console.log('id', id);
      const record = await personnelGroupInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    deptTree();
    userTree();
    getShiftList();
    initMap();
    modalApi.modalLoading(false);
  },
});
async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    if (Array.isArray(formData.value.repairType)) {
      formData.value.repairType = formData.value.repairType.join(',');
    }
    const data = cloneDeep(formData.value);
    await (isUpdate.value
      ? personnelGroupUpdate(data)
      : personnelGroupAdd(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    modalApi.lock(false);
  }
}
async function handleCancel() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  resetInitialized();
  map?.destroy();
  marker = null;
  circle = null;
}
const deptTreeData = ref([]);
const userTreeData = ref([]);
const shiftListData = ref([]);
// 部门下拉树
async function deptTree() {
  const res = await getDeptTree();
  deptTreeData.value = res;
}
// 人员下拉树
async function userTree() {
  const res = await getDeptUserTree();
  userTreeData.value = res;
}
// 班次下拉列表
async function getShiftList() {
  const res = await shiftList();
  shiftListData.value = res;
}
// 初始化高德地图
const keyword = ref('');
const addressData = ref([]);
let geocoder, placeSearch;
let marker: AMap.Marker | null = null;
let circle: AMap.Circle | null = null;
// 坐标和半径数据
let map: AMap.Map = null;
const initMap = () => {
  const { amap } = useAppConfig(import.meta.env, import.meta.env.PROD);
  console.log('amap', amap);
  window._AMapSecurityConfig = {
    // 安全密钥
    // 由于 import.meta 限制，假设 VITE_AMAP_SECRET 已通过全局变量暴露
    securityJsCode: amap.secret,
  };
  AMapLoader.load({
    key: amap.key, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.AutoComplete'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      console.log('高德地图加载成功');
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '2D', // 是否为3D地图模式
        zoom: 16, // 初始化地图级别
        center: [formData.value.lng, formData.value.lat], // 初始化地图中心点位置
      });
      // 添加默认标记和范围
      createMarker([formData.value.lng, formData.value.lat]);
      createCircle(
        [formData.value.lng, formData.value.lat],
        formData.value.effectiveRange,
      );

      // 地图点击事件
      map.on('click', (e: AMap.MapEvent) => {
        formData.value.lng = e.lnglat.getLng();
        formData.value.lat = e.lnglat.getLat();
        geocoder.getAddress(
          [formData.value.lng, formData.value.lat],
          (status: string, result: any) => {
            formData.value.locationName = result.regeocode.formattedAddress;
          },
        );

        createMarker([formData.value.lng, formData.value.lat]);
        createCircle(
          [formData.value.lng, formData.value.lat],
          formData.value.effectiveRange,
        );
      });
      geocoder = new AMap.Geocoder({
        city: '诸城',
      });
      placeSearch = new AMap.PlaceSearch({
        city: '诸城',
        pageSize: 10, // 单页显示结果条数
        pageIndex: 1, // 页码
        citylimit: false, // 是否强制限制在设置的城市内搜索
        autoFitView: true,
      });
      map.addControl(placeSearch);
    })
    .catch((error) => {
      console.log(error);
    });
};
// 创建标记
const createMarker = (position: [number, number]) => {
  console.log('position', marker);
  if (marker) {
    marker.setPosition(position);
  } else {
    marker = new AMap.Marker({
      position,
      draggable: true,
    });
    map?.add(marker);
    // 监听标记拖动事件
    marker.on('dragend', (e: AMap.Event) => {
      const newPos = e.target.getPosition() as [number, number];
      formData.value.lng = newPos.lng;
      formData.value.lat = newPos.lat;
      console.log(formData.value.lng);
      geocoder.getAddress(newPos, (status: string, result: any) => {
        formData.value.locationName = result.regeocode.formattedAddress;
      });
      createCircle(newPos, formData.value.effectiveRange);
    });
  }
};

// 创建范围圆形
const createCircle = (center: [number, number], radiusVal: number) => {
  if (circle) {
    circle.setCenter(center);
    circle.setRadius(radiusVal);
  } else {
    circle = new AMap.Circle({
      center,
      radius: radiusVal,
      strokeColor: '#5898ff',
      strokeOpacity: 0.5,
      strokeWeight: 1,
      fillColor: '#67B6FF',
      fillOpacity: 0.2,
    });
    map?.add(circle);
  }
  map?.setCenter(center);
};

// 更新半径
const updateRadius = () => {
  if (circle && formData.value.lng) {
    createCircle(
      [formData.value.lng, formData.value.lat],
      formData.value.effectiveRange,
    );
  }
};

// 搜索地图
function handleSearch(str: string) {
  placeSearch.search(str, (status, result) => {
    if (result && typeof result === 'object' && result.poiList) {
      const list = result.poiList.pois;
      addressData.value = list;
    }
  });
}
function handleSelect(item) {
  map?.setCenter([item.lng, item.lat]);
}
onUnmounted(() => {
  map?.destroy();
  marker = null;
  circle = null;
});
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 4 }" :model="formData" ref="formInstance">
      <Divider orientation="left">基本信息</Divider>

      <FormItem label="考勤组名称" name="name" :rules="formRules.name">
        <Input
          v-model:value="formData.name"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="考勤类型" name="type" :rules="formRules.type">
        <RadioGroup v-model:value="formData.type">
          <Radio class="radioStyle" :value="0">
            人员
            <spqn class="radio-span">
              用于特殊小组或特殊个例人员需要参加考勤的情况
            </spqn>
          </Radio>
          <Radio class="radioStyle" :value="1">
            部门
            <spqn class="radio-span">
              用于本部门所有人员均需参加考勤的情况；若所选择的部门有新员工加入，则该人员自动加入考勤人员之中
            </spqn>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem
        v-if="formData.type === 1"
        name="deptArr"
        label="需要考勤部门"
        :rules="formRules.deptArr"
      >
        <TreeSelect
          v-model:value="formData.deptArr"
          style="width: 100%"
          :tree-data="deptTreeData"
          tree-checkable
          allow-clear
          :show-checked-strategy="SHOW_ALL"
          placeholder="选择考勤部门"
          tree-node-filter-prop="label"
          :field-names="{
            children: 'children',
            label: 'label',
            value: 'id',
          }"
        />
      </FormItem>
      <FormItem
        v-if="formData.type === 0"
        name="userArr"
        label="需要考勤人员"
        :rules="formRules.userArr"
      >
        <TreeSelect
          v-model:value="formData.userArr"
          style="width: 100%"
          :tree-data="userTreeData"
          tree-checkable
          allow-clear
          :show-checked-strategy="SHOW_ALL"
          placeholder="选择考勤人员"
          tree-node-filter-prop="label"
          :field-names="{
            children: 'children',
            label: 'label',
            value: 'id',
          }"
        />
      </FormItem>
      <FormItem name="shiftArr" label="考勤班次" :rules="formRules.shiftArr">
        <Select
          v-model:value="formData.shiftArr"
          style="width: 100%"
          placeholder="请选择考勤班次"
          mode="multiple"
          :options="shiftListData"
          :field-names="{
            label: 'name',
            value: 'id',
          }"
        />
      </FormItem>
      <Divider orientation="left">考勤地点</Divider>
      <Row>
        <Col :span="14">
          <div
            id="container"
            style="position: relative; width: 100%; height: 50vh"
          >
            <div
              style="position: absolute; top: 10px; left: 10px; z-index: 999"
            >
              <Select
                v-model="keyword"
                style="width: 300px"
                :show-search="true"
                :filter-option="false"
                placeholder="请选择地址"
                :options="addressData"
                :field-names="{ label: 'name', value: 'location' }"
                @search="handleSearch"
                @select="handleSelect"
              />
            </div>
          </div>
        </Col>
        <Col :span="10">
          <FormItem name="lng" label="经度" :label-col="{ span: 8 }">
            {{ formData.lng }}
          </FormItem>
          <FormItem name="lat" label="纬度" :label-col="{ span: 8 }">
            {{ formData.lat }}
          </FormItem>
          <FormItem name="effectiveRange" label="打卡半径范围（米）" :label-col="{ span: 8 }">
            <InputNumber
              v-model:value="formData.effectiveRange"
              @change="updateRadius"
            />
          </FormItem>
          <FormItem name="locationName" label="考勤地点名称" :label-col="{ span: 8 }">
            <TextArea v-model:value="formData.locationName" />
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left">考勤规则</Divider>
      <div style="display: flex; flex-direction: column; gap: 8px">
        <FormItem name="repairAllowed" :label-col="{ span: 4 }">
        <Checkbox
          v-model:checked="formData.repairAllowed"
          style="margin-left: 65px"
          @change="restTimeChange"
        >
          允许补卡
        </Checkbox>
        </FormItem>
        <Card v-if="formData.repairAllowed">
          <FormItem name="repairType" label="补卡类型">
            <CheckboxGroup
              v-model:value="formData.repairType"
              name="checkboxgroup"
            >
              <Checkbox value="1">缺卡</Checkbox>
              <Checkbox value="2">迟到</Checkbox>
              <Checkbox value="3">严重迟到</Checkbox>
              <Checkbox value="4">早退</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="补卡时间" name="isLimitTime">
            <Checkbox
              v-model:checked="formData.isLimitTime"
              @change="restTimeChange"
            >
              限制补卡时间
            </Checkbox>
            <div v-if="formData.isLimitTime">
              <FormItem label="补卡时间" name="limitTime">
              可申请过去<InputNumber
                v-model:value="formData.limitTime"
                :min="0"
              />天内的补卡 填写0天，则只能发起当天的补卡
              </FormItem>
            </div>
          </FormItem>
          <FormItem label="补卡次数" name="isLimitNumber">
            <Checkbox
              v-model:checked="formData.isLimitNumber"
              @change="restNumberChange"
            >
              限制补卡次数
            </Checkbox>
            <div v-if="formData.isLimitNumber">
              <FormItem label="补卡次数" name="limitNumber">
              每人每月补卡次数上限
              <InputNumber
                v-model:value="formData.limitNumber"
                v-if="formData.isLimitNumber"
                :max="30"
                :min="0"
              />
              次
              </FormItem>
            </div>
          </FormItem>
        </Card>
<FormItem name="isExternal" :label-col="{ span: 4 }">
        <Checkbox
          v-model:checked="formData.isExternal"
          style="margin-left: 65px"
          @change="restTimeChange"
        >
          允许外勤打卡
          <spqn class="radio-span">
            勾选之后，允许员工不在考勤范围使用外勤打卡，外勤打卡会在打卡报表中体现
          </spqn>
        </Checkbox>
        </FormItem>
        <Card v-if="formData.isExternal">
          <FormItem label="外勤打卡备注必填" name="isExternalNote">
            <Switch
              v-model:checked="formData.isExternalNote"
              checked-children="开启"
              un-checked-children="关闭"
            />
          </FormItem>
          <FormItem label="外勤打卡拍照必填" name="isExternalPhoto">
            <Switch
              v-model:checked="formData.isExternalPhoto"
              checked-children="开启"
              un-checked-children="关闭"
            />
          </FormItem>
        </Card>
      </div>
    </Form>
  </BasicModal>
</template>
<style lang="scss" scoped>
.radioStyle {
  display: flex;
  height: 30px;
}

.radio-span {
  margin-left: 10px;
  font-size: 13px;
  color: rgb(157 157 167);
}

:deep(.ant-divider) {
  position: relative;
  margin: 28px 0;

  &.ant-divider-horizontal {
    height: 3px;
    background: linear-gradient(
      90deg,
      rgb(24 144 255 / 0%) 0%,
      #1890ff 50%,
      rgb(24 144 255 / 0%) 100%
    );

    .ant-divider-inner-text {
      padding: 0 24px;
      font-weight: 600;
      color: #1890ff;
      background: white;

      &::before {
        margin-right: 8px;
        content: '♾️';
      }
    }
  }
}
</style>
