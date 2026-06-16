<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { ProductionInboundOrderForm } from '#/api/erp/productionInboundOrder/model';
import type { ProductionInboundOrderItemVO } from '#/api/erp/productionInboundOrderItem/model';

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
  Row,
  Select,
  Space,
  Table,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import dayjs from 'dayjs';
import { pick } from 'lodash-es';

import {
  productionInboundOrderAdd,
  productionInboundOrderInfo,
  productionInboundOrderUpdate,
} from '#/api/erp/productionInboundOrder';
import { warehouseInventoryList } from '#/api/erp/warehouseInventory';
import { deptTreeSelect } from '#/api/system/user';
import { liststaffSelect, listWarehouseSelect } from '#/api/wcommon';
import SelectMaterial from '#/components/select-material/src/index.vue';
import SelectProductionOrder from '#/components/select-production-order/src/index.vue';
import { useBeforeCloseDiff } from '#/utils/popup';

interface ProductionInboundOrderItemRow {
  id?: number | string;
  inboundOrderId?: number | string;
  productionOrderId?: number | string;
  productionOrderCode?: string;
  materialId?: number | string;
  inboundQuantity?: number;
  warehouseId?: number | string;
  materialName?: string;
  materialCode?: string;
  model?: string;
  unitName?: string;
  currentQty?: number;
}

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const viewMode = ref(false);
const title = computed(() => {
  if (viewMode.value) return '查看生产入库单';
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const defaultValues: Partial<ProductionInboundOrderForm> = {
  id: undefined,
  inboundOrderCode: undefined,
  deptId: undefined,
  inboundResponsiblePerson: undefined,
  inboundDate: undefined,
  remark: undefined,
};

const formData = ref<Partial<ProductionInboundOrderForm>>({ ...defaultValues });
const formInstance = ref<FormInstance>();
const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const selectProductionOrderRef = ref<InstanceType<typeof SelectProductionOrder>>();
const currentEditRow = ref<null | ProductionInboundOrderItemRow>(null);
const inboundItemList = ref<ProductionInboundOrderItemRow[]>([]);

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

async function loadCurrentQty(row: ProductionInboundOrderItemRow) {
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
  return JSON.stringify({ ...formData.value, inboundItemList: inboundItemList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff({
  initializedGetter: customFormValueGetter,
  currentGetter: customFormValueGetter,
});


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

function handleOpenSelectProductionOrder() {
  selectProductionOrderRef.value?.open();
}

function handleOpenSelectProductionOrderForRow(row: ProductionInboundOrderItemRow) {
  currentEditRow.value = row;
  selectProductionOrderRef.value?.open();
}

function handleProductionOrderSelect(order: any) {
  if (order && currentEditRow.value) {
    // 更新当前行的生产订单和物料信息
    currentEditRow.value.productionOrderId = order.id;
    currentEditRow.value.productionOrderCode = order.orderCode;
    currentEditRow.value.materialId=order.materialId;
    currentEditRow.value.materialName=order.materialName;
    currentEditRow.value.materialCode=order.materialCode;
    currentEditRow.value.model=order.model;
    currentEditRow.value.unitName=order.unitName;
    currentEditRow.value.inboundQuantity=order.quantity;
    currentEditRow.value.salesOrderCode=order.salesOrderCode;
    currentEditRow.value.salesOrderItemId=order.salesOrderItemId;
  } else if (!currentEditRow.value) {
    // 没有选中行时，替换整个明细列表
    inboundItemList.value = (order?.itemList ?? []).map((item: any) => ({
      id: Date.now() + Math.random(),
      productionOrderId: order.id,
      productionOrderCode: order.orderCode,
      materialId: item.materialId,
      materialName: item.materialName,
      materialCode: item.materialCode,
      model: item.model,
      unitName: item.unitName,
      inboundQuantity: item.quantity ?? item.productionQuantity ?? undefined,
      warehouseId: item.warehouseId ?? undefined,
      currentQty: undefined,
    }));
  }
}

function handleAddRow() {
  inboundItemList.value.push({
    id: Date.now(),
    productionOrderId: undefined,
    productionOrderCode: undefined,
    materialId: undefined,
    materialName: undefined,
    materialCode: undefined,
    model: undefined,
    unitName: undefined,
    inboundQuantity: undefined,
    warehouseId: undefined,
    currentQty: undefined,
  });
}

function handleRemoveRow(row: ProductionInboundOrderItemRow) {
  const index = inboundItemList.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    inboundItemList.value.splice(index, 1);
  }
}

const columns: TableColumnsType<ProductionInboundOrderItemRow> = [
  {
    title: '生产订单',
    dataIndex: 'productionOrderCode',
    key: 'productionOrderCode',
    width: 150,
    render: (_: any, record: ProductionInboundOrderItemRow) => (
      <Button
        disabled={viewMode.value}
        onClick={() => handleOpenSelectProductionOrderForRow(record)}
        size="small"
        type="link"
      >
        {record.productionOrderCode || '请选择'}
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
    title: '入库数量',
    dataIndex: 'inboundQuantity',
    key: 'inboundQuantity',
    width: 110,
    render: (_: any, record: ProductionInboundOrderItemRow) => (
      <InputNumber
        disabled={viewMode.value}
        min={0}
        placeholder="请输入"
        precision={2}
        style={{ width: '100%' }}
        v-model:value={record.inboundQuantity}
      />
    ),
  },
  {
    title: '入库仓库',
    dataIndex: 'warehouseId',
    key: 'warehouseId',
    width: 140,
    render: (_: any, record: ProductionInboundOrderItemRow) => (
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
    render: (_: any, record: ProductionInboundOrderItemRow) => (
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

    const { id, view } = modalApi.getData() as { id?: number | string; view?: boolean };
    isUpdate.value = !!id;
    viewMode.value = !!view;
    modalApi.setState({ showConfirmButton: !viewMode.value });

    if (isUpdate.value && id) {
      const record = await productionInboundOrderInfo(id);
      formData.value = pick(record, Object.keys(defaultValues));
      const itemList = (record as any).itemList ?? [];
      inboundItemList.value = itemList
      if (formData.value.deptId) {
        await loadStaffOptions(formData.value.deptId);
      }
    } else {
      formData.value = {
        ...defaultValues,
        inboundDate: dayjs().format('YYYY-MM-DD'),
      };
      inboundItemList.value = [];
    }

    await markInitialized();
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    if (inboundItemList.value.length === 0) {
      alert({ content: '入库明细不能为空，请添加明细', icon: 'warning' });
      return;
    }
    for (let i = 0; i < inboundItemList.value.length; i++) {
      const row = inboundItemList.value[i]!;
      if (!row.materialId) {
        alert({ content: `第${i + 1}行物料名称不能为空`, icon: 'warning' });
        return;
      }
      if (!row.inboundQuantity || row.inboundQuantity <= 0) {
        alert({ content: `第${i + 1}行入库数量必须大于0`, icon: 'warning' });
        return;
      }
    }
    const data = cloneDeep(formData.value) as ProductionInboundOrderForm;
    (data as any).itemList = inboundItemList.value as ProductionInboundOrderItemVO[];
    await (isUpdate.value
      ? productionInboundOrderUpdate(data)
      : productionInboundOrderAdd(data));
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
  inboundItemList.value = [];
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
          <FormItem label="入库单号" name="inboundOrderCode">
            <Input
              v-model:value="formData.inboundOrderCode"
              placeholder="系统自动生成"
              disabled
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="入库部门" name="deptId">
            <TreeSelect
              v-model:value="formData.deptId"
              :tree-data="deptTreeData"
              :field-names="{ label: 'label', value: 'id' }"
              :placeholder="$t('ui.formRules.selectRequired')"
              @change="loadStaffOptions"
              style="width: 100%"
              tree-default-expand-all
              allow-clear
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="入库负责人" name="inboundResponsiblePerson">
            <Select
              v-model:value="formData.inboundResponsiblePerson"
              :options="staffOptions"
              :field-names="{ label: 'name', value: 'id' }"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
              allow-clear
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="入库日期" name="inboundDate">
            <DatePicker
              v-model:value="formData.inboundDate"
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

      <Divider orientation="left">入库明细</Divider>
      <div class="mb-3 ml-10">
        <Space>
          <Button v-if="!viewMode" type="primary" @click="handleAddRow">新增行</Button>
        </Space>
      </div>
      <Table
        :columns="columns"
        :data-source="inboundItemList"
        row-key="id"
        :pagination="false"
        :scroll="{ x: 900 }"
        style="margin: 0 16px"
      />
    </Form>

    <SelectProductionOrder
      ref="selectProductionOrderRef"
      @update:value="handleProductionOrderSelect"
    />
  </BasicModal>
</template>
