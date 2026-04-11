<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialBomForm } from '#/api/erp/materialBom/model';
import type { MaterialBomDetailVO } from '#/api/erp/materialBom/model';
import type { MaterialBomVO } from '#/api/erp/materialBom/model';
import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';

import { computed, ref } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
import { cloneDeep } from '@vben/utils';

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  Row,
  Select,
  Space,
  Switch,
  Table,
  TextArea,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { materialBomAdd, materialBomInfo, materialBomUpdate } from '#/api/erp/materialBom';
import BomTree from '#/components/BomTree/src/index.vue';
import SelectBom from '#/components/select-bom/src/index.vue';
import SelectMaterial from '#/components/select-material/src/index.vue';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const defaultValues: Partial<MaterialBomForm> = {
  id: undefined,
  bomName: undefined,
  bomCode: undefined,
  materialId: undefined,
  status: '0',
  bomType: undefined,
  effectiveDate: undefined,
  expiryDate: undefined,
  remark: undefined,
  bomDetailList: [],
  materialName: undefined,
  materialCode: undefined,
  version: undefined,
  isNewVersion: false,
};

const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
const formRules = ref<AntdFormRules<MaterialBomForm>>({
  bomName: [{ required: true, message: '请输入BOM名称', trigger: 'blur' }],
  materialName: [{ required: true, message: '请选择物料', trigger: 'blur' }],
  version: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
});

const formInstance = ref<FormInstance>();

const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const selectBomRef = ref<InstanceType<typeof SelectBom>>();
const selectBaseMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const currentEditRow = ref<MaterialBomDetailVO | null>(null);
const selectedRowKeys = ref<React.Key[]>([]);
const bomTreeVisible = ref(false);
const currentBomId = ref<number | string>('');

const bomDetailList = ref<MaterialBomDetailVO[]>([]);

function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, bomDetailList: bomDetailList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

function handleIsBomNodeChange(row: MaterialBomDetailVO, checked: boolean) {
  row.isBomNode = checked ? 1 : 0;
  row.materialId = undefined;
  row.materialName = undefined;
  row.materialCode = undefined;
  row.bomId = undefined;
  row.bomVersion = undefined;
  row.unitId = undefined;
  row.unitName = undefined;
  row.model = undefined;
}

function handleOpenSelectModal(row: MaterialBomDetailVO) {
  currentEditRow.value = row;
  if (row.isBomNode === 1) {
    selectBomRef.value?.open();
  } else {
    selectMaterialRef.value?.open();
  }
}

function handleMaterialSelect(rows: MaterialInfoVO[]) {
  if (rows.length > 0 && currentEditRow.value) {
    const selected = rows[0];
    currentEditRow.value.materialId = selected.id;
    currentEditRow.value.materialName = selected.materialName;
    currentEditRow.value.materialCode = selected.materialCode;
    currentEditRow.value.model = selected.model;
    currentEditRow.value.unitName = selected.unitName;
    currentEditRow.value.supplyMode = selected.supplyMode?.toString();
  }
}

function handleBomSelect(rows: MaterialBomVO[]) {
  if (rows.length > 0 && currentEditRow.value) {
    const selected = rows[0];
    currentEditRow.value.bomId = selected.id;
    currentEditRow.value.materialId = selected.materialId;
    currentEditRow.value.materialName = selected.bomName;
    currentEditRow.value.bomVersion = selected.bomCode;
    currentEditRow.value.unitName = selected.unitName;
  }
}

function handleBaseMaterialSelect(rows: MaterialInfoVO[]) {
  if (rows.length > 0) {
    const selected = rows[0];
    formData.value.materialId = selected.id;
    formData.value.materialName = selected.materialName;
    formData.value.materialCode = selected.materialCode;
  }
}

function handleOpenBaseMaterialSelect() {
  selectBaseMaterialRef.value?.open();
}

function handleAddRow() {
  const record: MaterialBomDetailVO = {
    id: Date.now(),
    isBomNode: 0,
    materialId: undefined,
    materialName: undefined,
    materialCode: undefined,
    bomId: undefined,
    bomVersion: undefined,
    unitId: undefined,
    unitName: undefined,
    model: undefined,
    quantity: undefined,
    supplyMode: undefined,
    remark: undefined,
  };
  bomDetailList.value.push(record);
}

function handleRemoveRow(row: MaterialBomDetailVO) {
  const index = bomDetailList.value.findIndex(item => item.id === row.id);
  if (index !== -1) {
    bomDetailList.value.splice(index, 1);
  }
}

function handleViewBomTree(row: MaterialBomDetailVO) {
  if (row.bomId) {
    currentBomId.value = row.bomId;
    bomTreeVisible.value = true;
    console.log('bomId', row.bomId);
  }
}


const columns: TableColumnsType<MaterialBomDetailVO> = [
  {
    title: '是否bom节点',
    dataIndex: 'isBomNode',
    key: 'isBomNode',
    width: 100,
    render: (_: any, record: MaterialBomDetailVO) => (
      <Switch
        checked={record.isBomNode === 1}
        onChange={(checked: boolean) => handleIsBomNodeChange(record, checked)}
      />
    ),
  },
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
    render: (_: any, record: MaterialBomDetailVO) => (
      <Button onClick={() => handleOpenSelectModal(record)} size="small" type="link">
        {record.materialName || '请选择'}
      </Button>
    ),
  },
  {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width: 120,
  },
  {
    title: 'bom版本',
    dataIndex: 'bomVersion',
    key: 'bomVersion',
    width: 100,
  },
  {
    title: '物料单位',
    dataIndex: 'unitName',
    key: 'unitName',
    width: 80,
  },
  {
    title: '物料规格',
    dataIndex: 'model',
    key: 'model',
    width: 120,
  },
  {
    title: '物料用量',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
    render: (_: any, record: MaterialBomDetailVO) => (
      <InputNumber
        min={0}
        placeholder="请输入"
        precision={2}
        style={{ width: '100%' }}
        v-model:value={record.quantity}
      />
    ),
  },
  {
    title: '物料属性',
    dataIndex: 'supplyMode',
    key: 'supplyMode',
    width: 120,
    render: (_: any, record: MaterialBomDetailVO) => (
      <Select
        allowClear
        options={getDictOptions('supply_type')}
        placeholder="请选择"
        style={{ width: '100%' }}
        v-model:value={record.supplyMode}
      />
    ),
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 150,
    render: (_: any, record: MaterialBomDetailVO) => (
      <Input
        placeholder="请输入"
        style={{ width: '100%' }}
        v-model:value={record.remark}
      />
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right' as const,
    render: (_: any, record: MaterialBomDetailVO) => (
      <Space>
        {record.isBomNode === 1 && (
          <Button color="primary" onClick={() => handleViewBomTree(record)} size="small" variant="outlined" >
            查看BOM树
          </Button>
        )}
        <Button danger onClick={() => handleRemoveRow(record)} size="small">
          删除
        </Button>
      </Space>
    ),
  },
];


const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[900px]',
  fullscreen: true,
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { id,isNewVersion } = modalApi.getData() as { id?: number | string,isNewVersion?: boolean };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await materialBomInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
      formData.value.isNewVersion = isNewVersion;
      bomDetailList.value = record.bomSubList && record.bomSubList.length > 0 ? record.bomSubList : [];
    } else {
      bomDetailList.value = [];
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if(bomDetailList.value.length === 0) {
      alert({
        content: 'BOM明细不能为空，请添加明细',
        icon: 'warning',
      });
      return;
    }
    // 验证明细行数据
    for (let i = 0; i < bomDetailList.value.length; i++) {
      const row = bomDetailList.value[i];
      if (!row.materialName) {
        alert({
      content: `第${i + 1}行物料名称不能为空`,
      icon: 'warning',
    });
        return;
      }
      if (!row.quantity || row.quantity <= 0) {
        alert({
      content: `第${i + 1}行物料用量必须大于0`,
      icon: 'warning',
    });
        return;
      }
      if(formData.value.isNewVersion) {
        row.id = null;
      }
    }
    
    const data = cloneDeep(formData.value);
    data.bomSubList = bomDetailList.value;
    await (isUpdate.value ? materialBomUpdate(data) : materialBomAdd(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      // 这里可以添加消息提示，例如使用message.error(error.message)
      alert(error.message);
    }
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  formData.value = defaultValues;
  formInstance.value?.resetFields();
  bomDetailList.value = [];
  selectedRowKeys.value = [];
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 5 }" ref="formInstance" :model="formData">
      <Divider orientation="left">BOM基本信息</Divider>
      <Row>
        <Col :span="6">
      <FormItem label="bom编码" name="bomCode" :rules="formRules.bomCode">
        <Input v-model:value="formData.bomCode" placeholder="系统自动生成" disabled />
      </FormItem>
    </Col>
     <Col :span="6">
      <FormItem label="bom名称" name="bomName" :rules="formRules.bomName">
        <Input v-model:value="formData.bomName" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
    </Col>
    
    <Col :span="6">
      <FormItem label="物料名称" name="materialName" :rules="formRules.materialName">
        <Button @click="handleOpenBaseMaterialSelect" type="link">
          {{ formData.materialName || '请选择' }}
        </Button>
      </FormItem>
      </Col>
    <Col :span="6">
      <FormItem label="物料编码" name="materialCode" :rules="formRules.materialCode">
        <Input v-model:value="formData.materialCode" placeholder="选择物料后自动填充" disabled />
      </FormItem>
      </Col>
    <Col :span="6">
      <FormItem label="版本号" name="version" :rules="formRules.version">
        <Input v-model:value="formData.version" :placeholder="$t('ui.formRules.required')" />
      </FormItem>
      </Col>
    <Col :span="6">
      <FormItem label="bom类型" name="bomType" :rules="formRules.bomType">
        <Select
          v-model:value="formData.bomType"
          :options="getDictOptions('bom_type')"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      </Col>
    <Col :span="6">
      <FormItem label="生效日期" name="effectiveDate" :rules="formRules.effectiveDate">
        <DatePicker
          v-model:value="formData.effectiveDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      </Col>
    <Col :span="6">
      <FormItem label="失效日期" name="expiryDate" :rules="formRules.expiryDate">
        <DatePicker
          v-model:value="formData.expiryDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      </Col>
      <Col :span="6">
      <FormItem label="状态" name="status" :rules="formRules.status">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.status"
          :options="getDictOptions('sys_normal_disable', true)"
        />
      </FormItem>
      </Col>
    <Col :span="8">
      <FormItem label="备注" name="remark" :rules="formRules.remark">
        <TextArea
          v-model:value="formData.remark"
          :placeholder="$t('ui.formRules.required')"
          :rows="2"
        />
      </FormItem>
      </Col>
 </Row>
      <Divider orientation="left">BOM明细列表</Divider>
      <div class="mb-3">
        <Space>
          <a-button type="primary" @click="handleAddRow">新增行</a-button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="bomDetailList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 1200 }"
      />
    </Form>

    <SelectMaterial
      ref="selectMaterialRef"
      @update:value="(rows: MaterialInfoVO[]) => handleMaterialSelect(rows)"
    />

    <SelectBom
      ref="selectBomRef"
      @update:value="(rows: MaterialBomVO[]) => handleBomSelect(rows)"
    />
    <SelectMaterial
      ref="selectBaseMaterialRef"
      @update:value="(rows: MaterialInfoVO[]) => handleBaseMaterialSelect(rows)"
    />

    <BomTree v-model:visible="bomTreeVisible" :bom-id="currentBomId" />
  </BasicModal>
</template>
