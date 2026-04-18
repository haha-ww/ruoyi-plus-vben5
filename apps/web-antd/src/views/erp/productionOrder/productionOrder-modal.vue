<!--
使用antdv-next原生Form生成 详细用法参考antdv-next Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="tsx">
import type { FormInstance } from 'antdv-next';
import type { TableColumnsType } from 'antdv-next';
import type { Rule } from 'antdv-next/dist/form/types';

import type { MaterialInfoVO } from '#/api/erp/materialInfo/model';
import type { ProductionOrderForm } from '#/api/erp/productionOrder/model';
import type { ProductionPlanVO } from '#/api/erp/productionPlan/model';
import type { SalesOrderItemVO } from '#/api/erp/salesOrderItem/model';
import type { TechnologyRoutingVO } from '#/api/erp/technologyRouting/model';
import type { TechnologyRoutingOperationForm } from '#/api/erp/technologyRoutingOperation/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
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
  Table,
  TextArea,
  TreeSelect,
} from 'antdv-next';
import { pick } from 'lodash-es';

import { productionOrderAdd, productionOrderInfo, productionOrderUpdate } from '#/api/erp/productionOrder';
import { technologyOperationList } from '#/api/erp/technologyOperation';
import { technologyRoutingInfo } from '#/api/erp/technologyRouting';
import { deptTreeSelect } from '#/api/system/user';
import { SelectBom } from '#/components/select-bom';
import { SelectMaterial } from '#/components/select-material';
import { SelectProductionPlan } from '#/components/select-production-plan';
import { SelectSalesOrderItem } from '#/components/select-sales-order-item';
import { SelectTechnologyRouting } from '#/components/select-technology-routing';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<ProductionOrderForm> = {
  id: undefined,
  orderCode: undefined,
  productionType: undefined,
  deptId: undefined,
  productionManager: undefined,
  orderStatus: undefined,
  materialId: undefined,
  materialName: undefined,
  materialCode: undefined,
  bomVersion: undefined,
  planId: undefined,
  planCode: undefined,
  salesOrderId: undefined,
  salesOrderCode: undefined,
  routingId: undefined,
  routingName: undefined,
  orderQuantity: undefined,
  remainQuantity: undefined,
  salesOrderQuantity: undefined,
  requiredDeliveryDate: undefined,
  actualStartDate: undefined,
  plannedCompletionDate: undefined,
  isPick: undefined,
  progress: undefined,
  orderDate: undefined,
  cancelDate: undefined,
  remark: undefined,
};

/**
 * 表单数据ref
 */
const formData = ref<Partial<ProductionOrderForm>>(cloneDeep(defaultValues));

type AntdFormRules<T> = Partial<Record<keyof T, Rule[]>> & {
  [key: string]: Rule[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<ProductionOrderForm>>({
  productionType: [{ required: true, message: '请选择生产类型', trigger: 'change' }],
  materialId: [{ required: true, message: '请选择物料', trigger: 'change' }],
});

const formInstance = ref<FormInstance>();

// 选择组件 ref
const selectProductionPlanRef = ref<InstanceType<typeof SelectProductionPlan>>();
const selectMaterialRef = ref<InstanceType<typeof SelectMaterial>>();
const selectSalesOrderItemRef = ref<InstanceType<typeof SelectSalesOrderItem>>();
const selectTechnologyRoutingRef = ref<InstanceType<typeof SelectTechnologyRouting>>();
const selectBomRef = ref<InstanceType<typeof SelectBom>>();

// 工艺路线明细相关
const routingOpList = ref<TechnologyRoutingOperationForm[]>([]);
const showRoutingDetail = ref(false);
const operationOptions = ref<{ label: string; record?: any; value: number | string }[]>([]);
const deptOptions = ref<any[]>([]);

// 显示用字段
const displayMaterialName = ref<string>('');
const displaySalesOrderCode = ref<string>('');

function customFormValueGetter() {
  return JSON.stringify({ ...formData.value, routingOpList: routingOpList.value });
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

// 加载工艺路线明细数据
async function loadRoutingDetail(routingId: number | string) {
  if (!routingId) {
    routingOpList.value = [];
    showRoutingDetail.value = false;
    return;
  }
  try {
    const record = await technologyRoutingInfo(routingId);
    routingOpList.value = cloneDeep((record as any).routingOperationList || []);
    showRoutingDetail.value = routingOpList.value.length > 0;
  } catch (error) {
    console.error('加载工艺路线明细失败', error);
    routingOpList.value = [];
    showRoutingDetail.value = false;
  }
}

// 加载工序和工作中心选项
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

// 打开生产计划选择
function handleOpenProductionPlanSelect() {
  selectProductionPlanRef.value?.open();
}

// 生产计划选择回调
function handleProductionPlanSelect(row: null | ProductionPlanVO) {
  if (!row) return;
  formData.value.planId = row.id;
  formData.value.planCode = row.planCode;
  formData.value.materialId = row.materialId;
  formData.value.materialName = row.materialName;
  formData.value.materialCode = row.materialCode;
  formData.value.salesOrderId = row.salesOrderId;
  formData.value.salesOrderCode = row.salesOrderCode;
  formData.value.requiredDeliveryDate = row.planEndTime;
  formData.value.orderQuantity = row.planQty;
  formData.value.bomVersion = row.bomVersion;
  displayMaterialName.value = row.materialName;
  displaySalesOrderCode.value = row.salesOrderCode;
}

// 物料选择回调
function handleMaterialSelect(rows: MaterialInfoVO[]) {
  if (!rows || rows.length === 0) return;
  const row = rows[0];
  if (!row) return;
  formData.value.materialId = row.id;
  formData.value.materialName = row.materialName;
  formData.value.materialCode = row.materialCode;
  displayMaterialName.value = row.materialName;
  formData.value.planId = undefined;
  formData.value.planCode = undefined;
  formData.value.salesOrderId = undefined;
  formData.value.salesOrderCode = undefined;
  displaySalesOrderCode.value = '';
}

// 打开物料选择
function handleOpenMaterialSelect() {
  selectMaterialRef.value?.open();
}

// 打开销售订单明细选择
function handleOpenSalesOrderItemSelect() {
  selectSalesOrderItemRef.value?.open();
}

// 销售订单明细选择回调
function handleSalesOrderItemSelect(rows: SalesOrderItemVO[]) {
  if (!rows || rows.length === 0) return;
  const row = rows[0];
  if (!row) return;
  formData.value.salesOrderId = row.id;
  formData.value.salesOrderCode = row.orderCode;
  formData.value.materialId = row.materialId;
  formData.value.materialName = row.materialName;
  formData.value.materialCode = row.materialCode;
  displayMaterialName.value = row.materialName || '';
  displaySalesOrderCode.value = row.orderCode || '';
}

// 打开工艺路线选择
function handleOpenTechnologyRoutingSelect() {
  selectTechnologyRoutingRef.value?.open();
}

// 工艺路线选择回调
function handleTechnologyRoutingSelect(rows: TechnologyRoutingVO[]) {
  if (!rows || rows.length === 0) {
    formData.value.routingId = undefined;
    formData.value.routingName = undefined;
    routingOpList.value = [];
    showRoutingDetail.value = false;
    return;
  }
  const row = rows[0];
  if (!row) return;
  formData.value.routingId = row.id;
  formData.value.routingName = row.routingName;
  loadRoutingDetail(row.id);
}

// 清除工艺路线
function handleClearTechnologyRouting() {
  formData.value.routingId = undefined;
  formData.value.routingName = undefined;
  routingOpList.value = [];
  showRoutingDetail.value = false;
}

// 打开BOM选择
function handleOpenBomSelect() {
  selectBomRef.value?.open();
}

// BOM选择回调
function handleBomSelect(row: any) {
  if (!row) return;
  formData.value.bomVersion = row.version;
}

// 工序选择变更
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

// 序号变更后重新排序
function handleSequenceChange() {
  routingOpList.value = [...routingOpList.value].sort(
    (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0),
  );
}

// 新增行
function handleAddRow() {
  const maxSeq = routingOpList.value.reduce((max, r) => Math.max(max, r.sequence ?? 0), 0);
  routingOpList.value.push({
    id: Date.now(),
    routingId: formData.value.routingId,
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

// 删除行
function handleRemoveRow(row: TechnologyRoutingOperationForm) {
  const index = routingOpList.value.indexOf(row);
  if (index !== -1) routingOpList.value.splice(index, 1);
}

// 工艺路线明细列定义
const routingColumns = computed<TableColumnsType<TechnologyRoutingOperationForm>>(() => {
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
      width: 80,
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
      title: '工序说明',
      dataIndex: 'memo',
      width: 160,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <Input placeholder="请输入" style={{ width: '100%' }} v-model:value={record.memo} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      fixed: 'right' as const,
      render: (_: any, record: TechnologyRoutingOperationForm) => (
        <Button danger onClick={() => handleRemoveRow(record)} size="small">
          删除
        </Button>
      ),
    },
  ];
  return base;
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[1000px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    await loadOptions();

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await productionOrderInfo(id);
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord as Partial<ProductionOrderForm>;
      // 编辑时加载工艺路线明细
      if (formData.value.routingId) {
        displayMaterialName.value = formData.value.materialName || '';
        displaySalesOrderCode.value = formData.value.salesOrderCode || '';
        await loadRoutingDetail(formData.value.routingId);
      }
    } else {
      formData.value = cloneDeep(defaultValues);
      // 单据日期默认当前日期
      formData.value.orderDate = new Date().toLocaleString('zh-CN', { hour12: false }).replaceAll('/', '-') + ' 00:00:00';
      displayMaterialName.value = '';
      displaySalesOrderCode.value = '';
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formInstance.value?.validate();
    const data = cloneDeep(formData.value);
    (data as any).routingOperationList = routingOpList.value;
    await (isUpdate.value ? productionOrderUpdate(data) : productionOrderAdd(data));
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
  showRoutingDetail.value = false;
  displayMaterialName.value = '';
  displaySalesOrderCode.value = '';
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 6 }" ref="formInstance" :model="formData">
      <Divider orientation="left">基本信息</Divider>
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="生产订单编码" name="orderCode">
            <Input v-model:value="formData.orderCode" placeholder="系统自动生成" disabled />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="生产计划单号" name="planCode">
            <Input
              v-model:value="formData.planCode"
              readonly
              placeholder="点击选择生产计划"
              @click="handleOpenProductionPlanSelect"
              class="cursor-pointer"
>
              <template #suffix>
                <Button type="link" size="small" class="!p-0" @click.stop="handleOpenProductionPlanSelect">
                  选择
                </Button>
              </template>
            </Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="销售订单编码" name="salesOrderCode">
            <Input
              v-model:value="formData.salesOrderCode"
              readonly
              placeholder="点击选择销售订单"
              @click="handleOpenSalesOrderItemSelect"
              class="cursor-pointer"
>
              <template #suffix>
                <Button type="link" size="small" class="!p-0" @click.stop="handleOpenSalesOrderItemSelect">
                  选择
                </Button>
              </template>
            </Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="物料名称" name="materialId">
            <Input
              :value="displayMaterialName"
              readonly
              placeholder="点击选择物料"
              @click="handleOpenMaterialSelect"
              class="cursor-pointer"
>
              <template #suffix>
                <Button type="link" size="small" class="!p-0" @click.stop="handleOpenMaterialSelect">
                  选择
                </Button>
              </template>
            </Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="BOM版本号" name="bomVersion">
            <Input
              v-model:value="formData.bomVersion"
              readonly
              placeholder="点击选择BOM版本"
              @click="handleOpenBomSelect"
              class="cursor-pointer"
            >
              <template #suffix>
                <Button type="link" size="small" class="!p-0" @click.stop="handleOpenBomSelect">
                  选择
                </Button>
              </template>
            </Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="要求交货日期" name="requiredDeliveryDate">
            <DatePicker
              v-model:value="formData.requiredDeliveryDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              disabled
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="单据日期" name="orderDate">
            <DatePicker
              v-model:value="formData.orderDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="生产类型" name="productionType" :rules="formRules.productionType">
            <Select
              v-model:value="formData.productionType"
              :options="getDictOptions('production_type', true)"
              :get-popup-container="getPopupContainer"
              :placeholder="$t('ui.formRules.selectRequired')"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="生产数量" name="orderQuantity">
            <InputNumber
              v-model:value="formData.orderQuantity"
              :min="0"
              :placeholder="$t('ui.formRules.required')"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="实际开工日期" name="actualStartDate">
            <DatePicker
              v-model:value="formData.actualStartDate"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="计划完成日期" name="plannedCompletionDate">
            <DatePicker
              v-model:value="formData.plannedCompletionDate"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="订单状态" name="orderStatus">
            <RadioGroup
              option-type="button"
              button-style="solid"
              v-model:value="formData.orderStatus"
              :options="getDictOptions('production_order_status', true)"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="备注" name="remark" :label-col="{ span: 3 }">
            <TextArea
              v-model:value="formData.remark"
              :placeholder="$t('ui.formRules.input')"
              :rows="3"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="工艺路线" name="routingName">
            <Input
              v-model:value="formData.routingName"
              readonly
              placeholder="点击选择工艺路线"
              @click="handleOpenTechnologyRoutingSelect"
              class="cursor-pointer"
>
              <template #suffix>
                <Space>
                  <Button
                    v-if="formData.routingName"
                    type="link"
                    size="small"
                    class="!p-0"
                    @click.stop="handleClearTechnologyRouting"
>
                    清除
                  </Button>
                  <Button type="link" size="small" class="!p-0" @click.stop="handleOpenTechnologyRoutingSelect">
                    选择
                  </Button>
                </Space>
              </template>
            </Input>
          </FormItem>
        </Col>
      </Row>


        

      <!-- 工艺路线明细 -->
      <template v-if="showRoutingDetail">
        <Divider :orientation="'left' as any">工艺路线明细</Divider>
        <div class="mb-3">
          <Space>
            <Button type="primary" @click="handleAddRow">新增行</Button>
          </Space>
        </div>
        <Table
          :columns="routingColumns"
          :data-source="routingOpList"
          row-key="id"
          :pagination="false"
          :scroll="{ x: 1230 }"
          size="small"
        />
      </template>
</Form>
  </BasicModal>

  <!-- 选择组件 -->
  <SelectProductionPlan ref="selectProductionPlanRef" @update:value="handleProductionPlanSelect" />
  <SelectMaterial ref="selectMaterialRef" @update:value="handleMaterialSelect" />
  <SelectSalesOrderItem ref="selectSalesOrderItemRef" @update:value="handleSalesOrderItemSelect" />
  <SelectTechnologyRouting ref="selectTechnologyRoutingRef" @update:value="handleTechnologyRoutingSelect" />
  <SelectBom ref="selectBomRef" @update:value="handleBomSelect" :default-params="{ materialId: formData.materialId }" />
</template>
