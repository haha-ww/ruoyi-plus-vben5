<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { MaterialOutboundOrderForm } from '#/api/erp/materialOutboundOrder/model';
import type { MaterialOutboundOrderItemVO } from '#/api/erp/materialOutboundOrderItem/model';

import { computed, ref, watch } from 'vue';

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
  Row,
  Select,
  Space,
  Table,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import { pick } from 'lodash-es';
import dayjs from 'dayjs';

import { materialOutboundOrderAdd, materialOutboundOrderInfo, materialOutboundOrderUpdate } from '#/api/erp/materialOutboundOrder';
import { warehouseInventoryList } from '#/api/erp/warehouseInventory';
import { deptTreeSelect } from '#/api/system/user';
import { liststaffSelect, listWarehouseSelect } from '#/api/wcommon';
import SelectMaterial from '#/components/select-material/src/index.vue';
import { useBeforeCloseDiff } from '#/utils/popup';

interface MaterialOutboundOrderItemRow {
  id?: number | string;
  outboundOrderId?: number | string;
  materialId?: number | string;
  actualQuantity?: number;
  returnQuantity?: number;
  warehouseId?: number | string;
  // 前端展示字段
  materialName?: string;
  materialCode?: string;
  model?: string;
  unitName?: string;
  currentQty?: number;
}

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => (isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add')));

const defaultValues: Partial<MaterialOutboundOrderForm> = {
  id: undefined,
  outboundOrderCode: undefined,
  deptId: undefined,
  picker: undefined,
  outboundDate: dayjs().format('YYYY-MM-DD'),
  remark: undefined,
};

const formData = ref<Partial<MaterialOutboundOrderForm>>({ ...defaultValues });
const formInstance = ref<FormInstance>();
const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const currentEditRow = ref<null | MaterialOutboundOrderItemRow>(null);
const outboundItemList = ref<MaterialOutboundOrderItemRow[]>([]);

const deptTreeData = ref<any[]>([]);
const staffOptions = ref<Array<{ label: string; value: number | string }>>([]);
const warehouseOptions = ref<Array<{ label: string; value: number | string }>>([]);

async function loadDeptTree() {
  try {
    deptTreeData.value = await deptTreeSelect();
  } catch (error) {
    console.error('加载部门树失败:', error);
  }
}

async function loadStaffOptions(deptId?: number | string) {
  try {
    staffOptions.value = await liststaffSelect({ deptId });
  } catch (error) {
    console.error('加载员工列表失败:', error);
  }
}

async function loadWarehouseOptions() {
  try {
    warehouseOptions.value = await listWarehouseSelect();
  } catch (error) {
    console.error('加载仓库列表失败:', error);
  }
}

async function loadCurrentQty(row: MaterialOutboundOrderItemRow) {
  if (!row.materialId || !row.warehouseId) {
    row.currentQty = undefined;
    return;
  }
  try {
    const result = await warehouseInventoryList({
      materialId: row.materialId,
      warehouseId: row.warehouseId,
      pageNum: 1,
      pageSize: 1,
    });
    const list = result.rows ?? [];
    row.currentQty = list.length > 0 ? list[0]!.currentQty : 0;
  } catch {
    row.currentQty = undefined;
  }
}

function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, outboundItemList: outboundItemList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff({
  initializedGetter: customFormValueGetter,
  currentGetter: customFormValueGetter,
});

function handleOpenSelectMaterial(row: MaterialOutboundOrderItemRow) {
  currentEditRow.value = row;
  selectMaterialRef.value?.open();
}

function handleMaterialSelect(rows: MaterialInfoVO[]) {
  if (rows.length > 0 && currentEditRow.value) {
    const selected = rows[0]!;
    currentEditRow.value.materialId = selected.id;
    currentEditRow.value.materialName = selected.materialName;
    currentEditRow.value.materialCode = selected.materialCode;
    currentEditRow.value.model = selected.model;
    loadCurrentQty(currentEditRow.value);
  }
}

function handleAddRow() {
  outboundItemList.value.push({
    id: Date.now(),
    materialId: undefined,
    materialName: undefined,
    materialCode: undefined,
    model: undefined,
    unitName: undefined,
    actualQuantity: undefined,
    warehouseId: undefined,
    currentQty: undefined,
  });
}

function handleRemoveRow(row: MaterialOutboundOrderItemRow) {
  const index = outboundItemList.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    outboundItemList.value.splice(index, 1);
  }
}

watch(
  () => formData.value.deptId,
  (newDeptId) => {
    formData.value.picker = undefined;
    loadStaffOptions(newDeptId);
  },
);

const columns: TableColumnsType<MaterialOutboundOrderItemRow> = [
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
    render: (_: any, record: MaterialOutboundOrderItemRow) => (
      <Button onClick={() => handleOpenSelectMaterial(record)} size="small" type="link">
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
    title: '规格型号',
    dataIndex: 'model',
    key: 'model',
    width: 120,
  },
  {
    title: '计量单位',
    dataIndex: 'unitName',
    key: 'unitName',
    width: 90,
  },
  {
    title: '领料数量',
    dataIndex: 'actualQuantity',
    key: 'actualQuantity',
    width: 110,
    render: (_: any, record: MaterialOutboundOrderItemRow) => (
      <InputNumber
        min={0}
        placeholder="请输入"
        precision={2}
        style={{ width: '100%' }}
        v-model:value={record.actualQuantity}
      />
    ),
  },
  {
    title: '发料仓库',
    dataIndex: 'warehouseId',
    key: 'warehouseId',
    width: 140,
    render: (_: any, record: MaterialOutboundOrderItemRow) => (
      <Select
        get-popup-container={getPopupContainer}
        options={warehouseOptions.value}
        field-names={{ label: 'warehouseName', value: 'id' }}
        placeholder="请选择"
        style={{ width: '100%' }}
        v-model:value={record.warehouseId}
        onChange={() => loadCurrentQty(record)}
      />
    ),
  },
  {
    title: '现存量',
    dataIndex: 'currentQty',
    key: 'currentQty',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 80,
    fixed: 'right' as const,
    render: (_: any, record: MaterialOutboundOrderItemRow) => (
      <Button danger onClick={() => handleRemoveRow(record)} size="small">
        删除
      </Button>
    ),
  },
];

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1000px]',
  fullscreen: true,
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return null;
    modalApi.modalLoading(true);

    await Promise.all([loadDeptTree(), loadWarehouseOptions(), loadStaffOptions()]);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await materialOutboundOrderInfo(id);
      formData.value = pick(record, Object.keys(defaultValues));
      outboundItemList.value = (record as any).orderItems ?? [];
      if (formData.value.deptId) {
        await loadStaffOptions(formData.value.deptId);
      }
    } else {
      formData.value = { ...defaultValues, outboundDate: dayjs().format('YYYY-MM-DD') };
      outboundItemList.value = [];
    }

    await markInitialized();
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if (outboundItemList.value.length === 0) {
      alert({ content: '出库明细不能为空，请添加明细', icon: 'warning' });
      return;
    }
    for (let i = 0; i < outboundItemList.value.length; i++) {
      const row = outboundItemList.value[i]!;
      if (!row.materialId) {
        alert({ content: `第${i + 1}行物料名称不能为空`, icon: 'warning' });
        return;
      }
      if (!row.actualQuantity || row.actualQuantity <= 0) {
        alert({ content: `第${i + 1}行领料数量必须大于0`, icon: 'warning' });
        return;
      }
    }
    const data = cloneDeep(formData.value) as MaterialOutboundOrderForm;
    (data as any).orderItems = outboundItemList.value as MaterialOutboundOrderItemVO[];
    await (isUpdate.value ? materialOutboundOrderUpdate(data) : materialOutboundOrderAdd(data));
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
  formData.value = { ...defaultValues };
  formInstance.value?.resetFields();
  outboundItemList.value = [];
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form ref="formInstance" :label-col="{ span: 6 }" :model="formData">
      <Divider orientation="left">基本信息</Divider>
      <Row :gutter="24">
        <Col :span="8">
          <FormItem label="出库单号" name="outboundOrderCode">
            <Input v-model:value="formData.outboundOrderCode" placeholder="系统自动生成" disabled />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="领料部门" name="deptId">
            <TreeSelect
              v-model:value="formData.deptId"
              :tree-data="deptTreeData"
              :field-names="{ label: 'label', value: 'id' }"
              :placeholder="$t('ui.formRules.selectRequired')"
              style="width: 100%"
              tree-default-expand-all
              allow-clear
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="领料人" name="picker">
            <Select
              v-model:value="formData.picker"
              :options="staffOptions"
              :field-names="{ label: 'name', value: 'id' }"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              allow-clear
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="出库日期" name="outboundDate">
            <DatePicker
              v-model:value="formData.outboundDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="16">
          <FormItem label="备注" name="remark">
            <TextArea v-model:value="formData.remark" :rows="2" placeholder="请输入备注" />
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left">领料出库明细</Divider>
      <div class="mb-3 ml-10">
        <Space>
          <Button type="primary" @click="handleAddRow">新增行</Button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="outboundItemList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 900 }"
        style="margin: 0 16px"
      />
    </Form>

    <SelectMaterial
      ref="selectMaterialRef"
      @update:value="(rows: MaterialInfoVO[]) => handleMaterialSelect(rows)"
    />
  </BasicModal>
</template>
