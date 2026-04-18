<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="tsx">
import type { FormInstance, TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { PurchaseInboundForm } from '#/api/erp/purchaseInbound/model';
import type { PurchaseOrderItemVO } from '#/api/erp/purchaseOrderItem/model';

import { computed, ref } from 'vue';

import {alert, useVbenModal } from '@vben/common-ui';
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
} from 'antdv-next';
import { pick } from 'lodash-es';

import { purchaseInboundAdd, purchaseInboundInfo, purchaseInboundUpdate } from '#/api/erp/purchaseInbound';
import { liststaffSelect,listWarehouseSelect } from '#/api/wcommon';
import { SelectPurchaseOrder } from '#/components/select-purchase-order';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);
const title = computed(() => {
  if (!viewMode.value) {
    return '详情';
  }
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

interface InboundDetailRow {
  _rowKey: number;
  id?: number | string;
  orderItemId?: number | string;
  purchaseCode?: string;
  supplierName?: string;
  materialId?: number | string;
  materialName?: string;
  materialCode?: string;
  spec?: string;
  unit?: string;
  purchaseQuantity?: number;
  inboundQuantity: number;
  warehouseId?: number | string;
}

const defaultValues: Partial<PurchaseInboundForm> = {
  id: undefined,
  inboundCode: undefined,
  purchaseOrderId: undefined,
  purchaseCode: undefined,
  supplierId: undefined,
  warehouseManager: undefined,
  inboundDate: undefined,
  remark: undefined,
  status: undefined,
};

const formData = ref<Partial<PurchaseInboundForm>>(cloneDeep(defaultValues));

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
const formRules = ref<AntdFormRules<PurchaseInboundForm>>({
  warehouseManager: [{ required: true, message: '请选择库管员', trigger: 'change' }],
  inboundDate: [{ required: true, message: '请选择入库日期', trigger: 'change' }],
});

const formInstance = ref<FormInstance>();
const selectPurchaseOrderRef = ref<InstanceType<typeof SelectPurchaseOrder>>();

const inboundItems = ref<InboundDetailRow[]>([]);
const userOptions = ref<any[]>([]);
const warehouseOptions = ref<any[]>([]);

function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, inboundItems: inboundItems.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff({
  initializedGetter: customFormValueGetter,
  currentGetter: customFormValueGetter,
});

async function loadOptions() {
  const [users, warehouses] = await Promise.all([
    liststaffSelect(),
    listWarehouseSelect(),
    
  ]);
  userOptions.value = ((users as any) || [])
  warehouseOptions.value = ((warehouses as any) || [])
}

function getCurrentDateStr() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function handleOpenPurchaseOrderSelect() {
  selectPurchaseOrderRef.value?.open();
}

function handlePurchaseOrderSelect(rows: PurchaseOrderItemVO[]) {
  if (!rows || rows.length === 0) return;
  formData.value.purchaseOrderId = rows[0].orderId;
  const newItems: InboundDetailRow[] = rows.map((row) => ({
    _rowKey: Date.now() + Math.random(),
    orderItemId: row.id,
    purchaseCode: row.orderCode,
    materialId: row.materialId,
    materialName: row.materialName,
    materialCode: row.materialCode,
    spec: row.model,
    unitName: row.unitName,
    purchaseQuantity: row.quantity,
    quantity: row.remainQuantity ?? row.quantity,
    warehouseId: undefined,
  }));
  inboundItems.value = [...inboundItems.value, ...newItems];
}

function handleRemoveRow(row: InboundDetailRow) {
  const index = inboundItems.value.indexOf(row);
  if (index !== -1) inboundItems.value.splice(index, 1);
}

const detailColumns = computed<TableColumnsType<InboundDetailRow>>(() => {
  const cols: TableColumnsType<InboundDetailRow> = [
    { title: '采购订单编码', dataIndex: 'purchaseCode', width: 130, ellipsis: true },
    { title: '物料名称', dataIndex: 'materialName', width: 120, ellipsis: true },
    { title: '物料编码', dataIndex: 'materialCode', width: 100, ellipsis: true },
    { title: '规格型号', dataIndex: 'spec', width: 100, ellipsis: true },
    { title: '物料单位', dataIndex: 'unitName', width: 80 },
    {
      title: '入库数量',
      dataIndex: 'quantity',
      width: 110,
      render: (_: any, record: InboundDetailRow) => (
        <InputNumber
          disabled={!viewMode.value}
          min={0}
          precision={2}
          style={{ width: '100%' }}
          v-model:value={record.quantity}
        />
      ),
    },
    {
      title: '存储仓库',
      dataIndex: 'warehouseId',
      width: 150,
      render: (_: any, record: InboundDetailRow) => (
        <Select
          disabled={!viewMode.value}
          fieldNames={{
            label: 'warehouseName',
            value: 'id',
          }}
          getPopupContainer={getPopupContainer}
          options={warehouseOptions.value}
          placeholder="请选择存储仓库"
          style={{ width: '100%' }}
          v-model:value={record.warehouseId}
        />
      ),
    },
  ];
  
  if (viewMode.value) {
    cols.push({
      title: '操作',
      key: 'action',
      width: 60,
      fixed: 'right' as const,
      render: (_: any, record: InboundDetailRow) => (
        <Button danger onClick={() => handleRemoveRow(record)} size="small">
          删除
        </Button>
      ),
    });
  }
  
  return cols;
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1100px]',
  fullscreenButton: false,
  showConfirmButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return null;
    modalApi.modalLoading(true);

    await loadOptions();

    const { id, viewMode: isViewMode } = modalApi.getData() as { id?: number | string; viewMode?: boolean };
    isUpdate.value = !!id;
    viewMode.value = isViewMode !== false;
    modalApi.setState({ showConfirmButton: viewMode.value });

    if (isUpdate.value && id) {
      const record = await purchaseInboundInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord as Partial<PurchaseInboundForm>;

      inboundItems.value = record.inboundItems || [];
    } else {
      formData.value = cloneDeep(defaultValues);
      formData.value.inboundDate = getCurrentDateStr();
      inboundItems.value = [];
    }

    await markInitialized();
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    
    if (inboundItems.value.length === 0) {
      alert({
          content: `入库明细不能为空`,
          icon: 'warning',
        });
      return;
    }

    for (let i = 0; i < inboundItems.value.length; i++) {
      const item = inboundItems.value[i];
      if (!item.quantity || item.quantity <= 0) {
        alert({
          content: `第${i + 1}行入库数量必须大于0`,
          icon: 'warning',
        });
        return;
      }
      if (!item.warehouseId) {
        alert({
          content: `第${i + 1}行存储仓库不能为空`,
          icon: 'warning',
        });
        return;
      }
    }

    const data = cloneDeep(formData.value) as any;
    data.inboundItems = inboundItems.value;
    await (isUpdate.value ? purchaseInboundUpdate(data) : purchaseInboundAdd(data));
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
  inboundItems.value = [];
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 6 }" ref="formInstance" :model="formData">
      <Divider orientation="left">基本信息</Divider>
      <Row :gutter="16">
        <Col :span="8">
          <FormItem label="采购入库单编码" name="inboundCode">
            <Input v-model:value="formData.inboundCode" placeholder="系统自动生成采购入库单编码" disabled />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="库管员" name="warehouseManager" :rules="formRules.warehouseManager">
            <Select
              v-model:value="formData.warehouseManager"
              :options="userOptions"
              :field-names="{
                label: 'name',
                value: 'id',
              }"
              placeholder="请选择库管员"
              :get-popup-container="getPopupContainer"
              :disabled="!viewMode"
              allow-clear
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="入库日期" name="inboundDate" :rules="formRules.inboundDate">
            <DatePicker
              v-model:value="formData.inboundDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :disabled="!viewMode"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="备注" name="remark" :label-col="{ span: 2 }">
            <TextArea
              v-model:value="formData.remark"
              placeholder="请输入备注"
              :rows="3"
              :disabled="!viewMode"
            />
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left">入库明细信息</Divider>
      <div class="mb-3" v-if="viewMode">
        <Space>
          <Button type="primary" @click="handleOpenPurchaseOrderSelect">从采购订单引入</Button>
        </Space>
      </div>
      <Table
        :columns="detailColumns"
        :data-source="inboundItems"
        row-key="_rowKey"
        :pagination="false"
        :scroll="{ x: 1030 }"
        size="small"
      />
    </Form>
  </BasicModal>

  <SelectPurchaseOrder ref="selectPurchaseOrderRef" @update:value="handlePurchaseOrderSelect" />
</template>
