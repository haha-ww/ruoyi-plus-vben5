<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';

import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';
import type { SalesOutboundOrderForm } from '#/api/erp/salesOutboundOrder/model';
import type { SalesOutboundOrderItemVO } from '#/api/erp/salesOutboundOrderItem/model';

import { computed, ref } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

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
import dayjs from 'dayjs';
import { pick } from 'lodash-es';

import {
  salesOutboundOrderAdd,
  salesOutboundOrderInfo,
  salesOutboundOrderUpdate,
} from '#/api/erp/salesOutboundOrder';
import { warehouseInventoryList } from '#/api/erp/warehouseInventory';
import { listCustomerSelect, liststaffSelect, listWarehouseSelect } from '#/api/wcommon';
import { SelectSalesOrderItem } from '#/components/select-sales-order-item';
import { useBeforeCloseDiff } from '#/utils/popup';

interface SalesOutboundOrderItemRow {
  id?: number | string;
  outboundOrderId?: number | string;
  salesOrderId?: number | string;
  salesOrderNo?: string;
  salesOrderItemId?: number | string;
  materialId?: number | string;
  outboundQuantity?: number;
  warehouseId?: number | string;
  // 前端展示字段
  materialName?: string;
  materialCode?: string;
  model?: string;
  unitName?: string;
  orderQuantity?: number;
  shippedQuantity?: number;
  currentQty?: number;
}

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);
const title = computed(() => {
  if (viewMode.value) return '查看销售出库单';
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const defaultValues: Partial<SalesOutboundOrderForm> = {
  id: undefined,
  outboundOrderCode: undefined,
  customerId: undefined,
  outboundResponsiblePerson: undefined,
  orderDate: undefined,
  logisticsCompany: undefined,
  remark: undefined,
};

const formData = ref<Partial<SalesOutboundOrderForm>>({ ...defaultValues });
const formInstance = ref<FormInstance>();
const selectSalesOrderItemRef = ref<InstanceType<typeof SelectSalesOrderItem>>();
const currentEditRow = ref<null | SalesOutboundOrderItemRow>(null);
const outboundItemList = ref<SalesOutboundOrderItemRow[]>([]);

const customerOptions = ref<Array<{ label: string; value: number | string }>>([]);
const staffOptions = ref<Array<{ label: string; value: number | string }>>([]);
const warehouseOptions = ref<Array<{ label: string; value: number | string }>>([]);

async function loadCustomerOptions() {
  try {
    customerOptions.value = await listCustomerSelect();
  } catch (error) {
    console.error('加载客户列表失败:', error);
  }
}

async function loadStaffOptions() {
  try {
    staffOptions.value = await liststaffSelect();
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

async function loadCurrentQty(row: SalesOutboundOrderItemRow) {
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

function handleOpenSelectSalesOrderItem() {
  selectSalesOrderItemRef.value?.open();
}

function handleSalesOrderItemSelect(rows: SalesOrderItemVO[]) {
  const existingIds = new Set(
    outboundItemList.value.map((item) => item.salesOrderItemId),
  );
  const newRows = rows.filter((item) => !existingIds.has(item.id));
  const duplicateCount = rows.length - newRows.length;
  if (duplicateCount > 0) {
    alert({ content: `${duplicateCount}条明细已存在，已自动过滤重复数据`, icon: 'warning' });
  }
  for (const item of newRows) {
    outboundItemList.value.push({
      id: Date.now() + Math.random(),
      salesOrderId: item.orderId,
      salesOrderNo: item.orderCode,
      salesOrderItemId: item.id,
      materialId: item.materialId,
      materialName: item.materialName,
      materialCode: item.materialCode,
      model: (item as any).model,
      unitName: (item as any).unitName,
      orderQuantity: item.quantity,
      shippedQuantity: 0,
      outboundQuantity: item.quantity,
      warehouseId: undefined,
      currentQty: undefined,
    });
  }
}

function handleAddRow() {
  // 打开选择器让用户选择订单明细
  handleOpenSelectSalesOrderItem();
}

function handleRemoveRow(row: SalesOutboundOrderItemRow) {
  const index = outboundItemList.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    outboundItemList.value.splice(index, 1);
  }
}

const columns: TableColumnsType<SalesOutboundOrderItemRow> = [
  {
    title: '序号',
    key: 'index',
    width: 60,
    render: (_: any, __: SalesOutboundOrderItemRow, index: number) => index + 1,
  },
  {
    title: '销售订单编码',
    dataIndex: 'salesOrderNo',
    key: 'salesOrderNo',
    width: 150,
    render: (_: any, record: SalesOutboundOrderItemRow) => (
      <Button
        disabled={viewMode.value}
        onClick={() => {
          currentEditRow.value = record;
          handleOpenSelectSalesOrderItem();
        }}
        size="small"
        type="link"
      >
        {record.salesOrderNo || '选择订单'}
      </Button>
    ),
  },
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
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
    title: '已出库数量',
    dataIndex: 'shippedQuantity',
    key: 'shippedQuantity',
    width: 100,
  },
  {
    title: '订单数量',
    dataIndex: 'orderQuantity',
    key: 'orderQuantity',
    width: 100,
  },
  {
    title: '出库数量',
    dataIndex: 'outboundQuantity',
    key: 'outboundQuantity',
    width: 110,
    render: (_: any, record: SalesOutboundOrderItemRow) => (
      <InputNumber
        disabled={viewMode.value}
        min={0}
        placeholder="请输入"
        precision={2}
        style={{ width: '100%' }}
        v-model:value={record.outboundQuantity}
      />
    ),
  },
  {
    title: '出库仓库',
    dataIndex: 'warehouseId',
    key: 'warehouseId',
    width: 140,
    render: (_: any, record: SalesOutboundOrderItemRow) => (
      <Select
        disabled={viewMode.value}
        field-names={{ label: 'warehouseName', value: 'id' }}
        get-popup-container={getPopupContainer}
        onChange={() => loadCurrentQty(record)}
        options={warehouseOptions.value}
        placeholder="请选择"
        style={{ width: '100%' }}
        v-model:value={record.warehouseId}
      />
    ),
  },
  {
    title: '可用库存',
    dataIndex: 'currentQty',
    key: 'currentQty',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 80,
    fixed: 'right' as const,
    render: (_: any, record: SalesOutboundOrderItemRow) => (
      <Button
        danger
        disabled={viewMode.value}
        onClick={() => handleRemoveRow(record)}
        size="small"
      >
        删除
      </Button>
    ),
  },
];

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

    await Promise.all([loadCustomerOptions(), loadWarehouseOptions(), loadStaffOptions()]);

    const { id, view } = modalApi.getData() as { id?: number | string; view?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!view;
    modalApi.setState({ showConfirmButton: !viewMode.value });

    if (isUpdate.value && id) {
      const record = await salesOutboundOrderInfo(id);
      formData.value = pick(record, Object.keys(defaultValues));
      outboundItemList.value = ((record as any).itemList ?? []).map((item: any) => ({
        id: item.id ?? Date.now() + Math.random(),
        salesOrderId: item.salesOrderId,
        salesOrderNo: item.salesOrderNo,
        salesOrderItemId: item.salesOrderItemId,
        materialId: item.materialId,
        materialName: item.materialName,
        materialCode: item.materialCode,
        model: item.model,
        unitName: item.unitName,
        orderQuantity: item.orderQuantity,
        shippedQuantity: item.shippedQuantity ?? 0,
        outboundQuantity: item.outboundQuantity,
        warehouseId: item.warehouseId,
        currentQty: undefined,
      }));
    } else {
      formData.value = {
        ...defaultValues,
        orderDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };
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
      if (!row.outboundQuantity || row.outboundQuantity <= 0) {
        alert({ content: `第${i + 1}行出库数量必须大于0`, icon: 'warning' });
        return;
      }
      if (!row.warehouseId) {
        alert({ content: `第${i + 1}行出库仓库不能为空`, icon: 'warning' });
        return;
      }
      if (row.outboundQuantity > row.currentQty) {
        alert({ content: `第${i + 1}行出库数量不能大于可用库存`, icon: 'warning' });
        return;
      }
    }
    const data = cloneDeep(formData.value) as SalesOutboundOrderForm;
    (data as any).itemList = outboundItemList.value as SalesOutboundOrderItemVO[];
    await (isUpdate.value
      ? salesOutboundOrderUpdate(data)
      : salesOutboundOrderAdd(data));
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
  viewMode.value = false;
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form ref="formInstance" :label-col="{ span: 6 }" :model="formData" :disabled="viewMode">
      <Divider orientation="left">基本信息</Divider>
      <Row :gutter="24">
        <Col :span="8">
          <FormItem label="出库单号" name="outboundOrderCode">
            <Input
              v-model:value="formData.outboundOrderCode"
              placeholder="系统自动生成"
              disabled
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="物流公司" name="logisticsCompany">
            <Input v-model:value="formData.logisticsCompany" placeholder="请输入物流公司" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="客户名称" name="customerId" :rules="[{ required: true, message: '请选择客户名称' }]">
            <Select
              v-model:value="formData.customerId"
              :options="customerOptions"
              :field-names="{ label: 'customerName', value: 'id' }"
              :get-popup-container="getPopupContainer"
              placeholder="请选择客户名称"
              allow-clear
              show-search
              option-filter-prop="customerName"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="出库日期" name="orderDate" :rules="[{ required: true, message: '请选择出库日期' }]">
            <DatePicker
              v-model:value="formData.orderDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="出库负责人" name="outboundResponsiblePerson" :rules="[{ required: true, message: '请选择出库负责人' }]">
            <Select
              v-model:value="formData.outboundResponsiblePerson"
              :options="staffOptions"
              :field-names="{ label: 'name', value: 'id' }"
              :get-popup-container="getPopupContainer"
              placeholder="请选择出库负责人"
              allow-clear
              show-search
              option-filter-prop="name"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="备注" name="remark">
            <TextArea v-model:value="formData.remark" :rows="2" placeholder="请输入备注" />
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left">出库明细信息</Divider>
      <div class="mb-3 ml-10">
        <Space>
          <Button v-if="!viewMode" type="primary" @click="handleAddRow">新增行</Button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="outboundItemList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 1400 }"
        style="margin: 0 16px"
      />
    </Form>

    <SelectSalesOrderItem
      ref="selectSalesOrderItemRef"
      @update:value="handleSalesOrderItemSelect"
    />
  </BasicModal>
</template>
