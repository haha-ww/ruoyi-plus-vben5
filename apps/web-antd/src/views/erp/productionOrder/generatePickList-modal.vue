<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { MaterialOutboundOrderForm } from '#/api/erp/materialOutboundOrder/model';
import type { MaterialOutboundOrderItemVO } from '#/api/erp/materialOutboundOrderItem/model';
import type { ProductionOrderVO } from '#/api/erp/productionOrder/model';

import { computed, ref, watch } from 'vue';

import { alert, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getPopupContainer } from '@vben/utils';
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

import {
  materialOutboundOrderAdd,
} from '#/api/erp/materialOutboundOrder';
import { getProductionOrderPickList } from '#/api/erp/productionOrder';
import { warehouseInventoryList } from '#/api/erp/warehouseInventory';
import { deptTreeSelect } from '#/api/system/user';
import { liststaffSelect, listWarehouseSelect } from '#/api/wcommon';
import SelectMaterial from '#/components/select-material/src/index.vue';
import { useBeforeCloseDiff } from '#/utils/popup';

interface PickListItem {
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

const title = computed(() => '生成领料单');

const defaultValues: Partial<MaterialOutboundOrderForm> = {
  id: undefined,
  outboundOrderCode: undefined,
  deptId: undefined,
  picker: undefined,
  outboundDate: '',
  remark: undefined,
};

const formData = ref<Partial<MaterialOutboundOrderForm>>({ ...defaultValues });
const formInstance = ref<FormInstance>();
const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const currentEditRow = ref<null | PickListItem>(null);
const outboundItemList = ref<PickListItem[]>([]);
const productionOrderInfo = ref<null | ProductionOrderVO>(null);

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

async function loadCurrentQty(row: PickListItem) {
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

function handleOpenSelectMaterial(row: PickListItem) {
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
    requiredQuantity: undefined,
    warehouseId: undefined,
    currentQty: undefined,
  });
}

function handleRemoveRow(row: PickListItem) {
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

const columns: TableColumnsType<PickListItem> = [
  {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 150,
    render: (_: any, record: PickListItem) => (
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
    render: (_: any, record: PickListItem) => (
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
    render: (_: any, record: PickListItem) => (
      <Select
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
    render: (_: any, record: PickListItem) => (
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

    const { productionOrderId } = modalApi.getData() as { productionOrderId?: number | string };

    if (productionOrderId) {
      try {
        const pickListData = await getProductionOrderPickList(productionOrderId);
        formData.value = pickListData ?? null;
        outboundItemList.value = pickListData.itemList ?? [];
        if (formData.value.deptId) {
          await loadStaffOptions(formData.value.deptId);
        }
      } catch (error) {
        console.error('加载领料数据失败:', error);
        alert({ content: '加载领料数据失败', icon: 'error' });
        outboundItemList.value = [];
      }
    } else {
      outboundItemList.value = [];
      formData.value = { ...defaultValues };
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
    (data as any).itemList = outboundItemList.value as MaterialOutboundOrderItemVO[];
    data.isPick=1
    await materialOutboundOrderAdd(data);
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
  productionOrderInfo.value = null;
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form ref="formInstance" :label-col="{ span: 6 }" :model="formData">
      <Divider orientation="left">基本信息</Divider>
      <Row :gutter="24">
        <Col :span="8">
          <FormItem label="生产订单号" name="productionOrderCode">
            <Input
              :value="formData?.productionOrderCode"
              placeholder="系统自动获取"
              disabled
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="领料部门" name="deptId" :rules="[{ required: true, message: $t('ui.formRules.selectRequired') }]">
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
          <FormItem label="领料人" name="picker" :rules="[{ required: true, message: $t('ui.formRules.selectRequired') }]">
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
