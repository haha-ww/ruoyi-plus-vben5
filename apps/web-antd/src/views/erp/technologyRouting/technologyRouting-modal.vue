<!--
工艺路线表单：基本信息 + 工艺路线明细（可编辑列表）
-->
<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { TechnologyRoutingForm } from '#/api/erp/technologyRouting/model';
import type { TechnologyRoutingOperationForm } from '#/api/erp/technologyRoutingOperation/model';

import { computed, ref } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import {
  Button,
  Col,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { technologyOperationList } from '#/api/erp/technologyOperation';
import { technologyRoutingAdd, technologyRoutingInfo, technologyRoutingUpdate } from '#/api/erp/technologyRouting';
import { deptTreeSelect } from '#/api/system/user';
import SelectMaterial from '#/components/select-material/src/index.vue';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);
const title = computed(() => {
  if (!viewMode.value) return '详情';
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

interface RoutingFormData extends TechnologyRoutingForm {
  materialName?: string;
}

const defaultValues: Partial<RoutingFormData> = {
  id: undefined,
  routingCode: undefined,
  routingName: undefined,
  materialCode: undefined,
  materialId: undefined,
  materialName: undefined,
  routingDescribe: undefined,
};

const formData = ref<Partial<RoutingFormData>>(cloneDeep(defaultValues));

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & { [key: string]: Rule[] };
const formRules = ref<AntdFormRules<RoutingFormData>>({
  routingName: [{ required: true, message: '请输入工艺路线名称', trigger: 'blur' }],
});

const formInstance = ref<FormInstance>();
const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const routingOpList = ref<TechnologyRoutingOperationForm[]>([]);
const operationOptions = ref<{ label: string; record?: any; value: number | string; }[]>([]);
const deptOptions = ref<any[]>([]);

async function loadOptions() {
  const [depts, ops] = await Promise.all([
    deptTreeSelect(),
    technologyOperationList({ pageSize: 1000 }),
  ]);
  deptOptions.value = depts;
  operationOptions.value = (ops.rows || []).map((op: any) => ({
    label: `${op.operationCode} - ${op.operationName}`,
    value: op.id,
    record: op,
  }));
}

function handleOpenMaterialSelect() {
  selectMaterialRef.value?.open();
}

function handleMaterialSelect(rows: MaterialInfoVO[]) {
  const selected = rows[0];
  if (!selected) return;
  formData.value.materialId = selected.id;
  formData.value.materialName = selected.materialName;
  formData.value.materialCode = selected.materialCode;
}

function handleOperationChange(row: TechnologyRoutingOperationForm, value: number | string) {
  const op = operationOptions.value.find((o) => o.value === value);
  if (op?.record) {
    row.operationCode = op.record.operationCode;
    row.operationName = op.record.operationName;
    if (!row.deptId) row.deptId = op.record.deptId;
    if (!row.setupTime) row.setupTime = op.record.stdSetupTime;
    if (!row.runTime) row.runTime = op.record.stdRunTime;
  }
}

function handleSequenceChange() {
  routingOpList.value = [...routingOpList.value].sort(
    (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0),
  );
}

function handleAddRow() {
  const maxSeq = routingOpList.value.reduce((max, r) => Math.max(max, r.sequence ?? 0), 0);
  routingOpList.value.push({
    id: Date.now(),
    routingId: undefined,
    operationId: undefined,
    operationCode: undefined,
    operationName: undefined,
    sequence: maxSeq + 10,
    deptId: undefined,
    wage: undefined,
    waste: undefined,
    setupTime: undefined,
    runTime: undefined,
    memo: undefined,
  });
}

function handleRemoveRow(row: TechnologyRoutingOperationForm) {
  const index = routingOpList.value.indexOf(row);
  if (index !== -1) routingOpList.value.splice(index, 1);
}

const columns = computed<TableColumnsType<TechnologyRoutingOperationForm>>(() => {
  const base: TableColumnsType<TechnologyRoutingOperationForm> = [
    {
      title: '工序',
      dataIndex: 'operationId',
      width: 200,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <Select
          onChange={(val: any) => handleOperationChange(record, val)}
          options={operationOptions.value}
          placeholder="请选择工序"
          style={{ width: '100%' }}
          v-model:value={record.operationId}
        />
      ),
    },
    {
      title: '工序顺序',
      dataIndex: 'sequence',
      width: 60,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <InputNumber
          min={1}
          onChange={handleSequenceChange}
          placeholder="顺序"
          style={{ width: '100%' }}
          v-model:value={record.sequence}
        />
      ),
    },
    {
      title: '工作中心',
      dataIndex: 'deptId',
      width: 160,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <TreeSelect
          allowClear
          fieldNames={{ label: 'label', value: 'id', children: 'children' }}
          placeholder="请选择"
          style={{ width: '100%' }}
          treeData={deptOptions.value}
          treeDefaultExpandAll
          v-model:value={record.deptId}
        />
      ),
    },
    {
      title: '标准工价(元/件)',
      dataIndex: 'wage',
      width: 100,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <InputNumber min={0} placeholder="请输入" precision={2} style={{ width: '100%' }} v-model:value={record.wage} />
      ),
    },
    {
      title: '废品工价(元)',
      dataIndex: 'waste',
      width: 100,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <InputNumber min={0} placeholder="请输入" precision={2} style={{ width: '100%' }} v-model:value={record.waste} />
      ),
    },
    {
      title: '准备时间(小时)',
      dataIndex: 'setupTime',
      width: 100,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <InputNumber min={0} placeholder="请输入" precision={2} style={{ width: '100%' }} v-model:value={record.setupTime} />
      ),
    },
    {
      title: '单件加工时间(小时)',
      dataIndex: 'runTime',
      width: 120,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <InputNumber min={0} placeholder="请输入" precision={2} style={{ width: '100%' }} v-model:value={record.runTime} />
      ),
    },
    {
      title: '是否外协加工',
      dataIndex: 'isOutsource',
      width: 80,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <Select options={[{ value: true, label: '是' }, { value: false, label: '否' }]} style={{ width: '100%' }} v-model:checked={record.isOutsource}/>
      ),
    },
    {
      title: '工序说明',
      dataIndex: 'memo',
      width: 160,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <Input placeholder="请输入" style={{ width: '100%' }} v-model:value={record.memo} />
      ),
    },
  ];
  if (viewMode.value) {
    base.push({
      title: '操作',
      key: 'action',
      width: 80,
      fixed: 'right' as const,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <Button danger onClick={() => handleRemoveRow(record)} size="small">
          删除
        </Button>
      ),
    });
  }
  return base;
});

function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, routingOpList: routingOpList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff({
  initializedGetter: customFormValueGetter,
  currentGetter: customFormValueGetter,
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1200px]',
  fullscreen: true,
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return null;
    modalApi.modalLoading(true);

    await loadOptions();
    const { id, viewMode: isViewMode } = modalApi.getData() as { id?: number | string; viewMode?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!isViewMode;
    modalApi.setState({ showConfirmButton: viewMode.value });

    if (isUpdate.value && id) {
      const record = await technologyRoutingInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord as Partial<RoutingFormData>;
      routingOpList.value = (record as any).routingOperationList || [];
    } else {
      formData.value = cloneDeep(defaultValues);
      routingOpList.value = [];
    }
    await markInitialized();
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if (routingOpList.value.length === 0) {
      alert({ content: '工艺路线明细不能为空，请添加工序', icon: 'warning' });
      return;
    }
    const emptyOpIndex = routingOpList.value.findIndex((r) => !r.operationId);
    if (emptyOpIndex !== -1) {
      alert({ content: `第${emptyOpIndex + 1}行工序不能为空`, icon: 'warning' });
      return;
    }
    const data = cloneDeep(formData.value) as any;
    data.routingOperationList = routingOpList.value;
    await (isUpdate.value ? technologyRoutingUpdate(data) : technologyRoutingAdd(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  formData.value = cloneDeep(defaultValues);
  formInstance.value?.resetFields();
  routingOpList.value = [];
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 6 }" ref="formInstance" :model="formData" :disabled="!viewMode">
      <Divider :orientation="'left' as any">基本信息</Divider>
      <Row :gutter="16">
        <Col :span="8">
          <FormItem label="工艺路线编码" name="routingCode">
            <Input v-model:value="formData.routingCode" placeholder="系统自动生成" disabled />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="工艺路线名称" name="routingName" :rules="formRules.routingName">
            <Input v-model:value="formData.routingName" :placeholder="$t('ui.formRules.required')" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="物料名称" name="materialName">
            <Button type="link" style="padding: 0" @click="handleOpenMaterialSelect">
              {{ formData.materialName || '请选择物料' }}
            </Button>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="物料编码" name="materialCode">
            <Input v-model:value="formData.materialCode" placeholder="选择物料后自动填充" disabled />
          </FormItem>
        </Col>
        <Col :span="16">
          <FormItem label="工艺描述" name="routingDescribe" :label-col="{ span: 3 }">
            <TextArea
              v-model:value="formData.routingDescribe"
              :rows="2"
              :placeholder="$t('ui.formRules.required')"
            />
          </FormItem>
        </Col>
      </Row>

      <Divider :orientation="'left' as any">工艺路线明细</Divider>
      <div class="mb-3">
        <Space>
          <a-button v-if="viewMode" type="primary" @click="handleAddRow">新增行</a-button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="routingOpList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 1230 }"
        size="small"
      />
    </Form>

    <SelectMaterial ref="selectMaterialRef" @update:value="handleMaterialSelect" />
  </BasicModal>
</template>
