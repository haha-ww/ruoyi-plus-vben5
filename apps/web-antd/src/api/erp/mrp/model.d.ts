import type { PageQuery, BaseEntity } from '#/api/common';

export interface MrpResultItemVO {
  /** 物料ID */
  materialId: string | number;
  /** 物料编码 */
  materialCode: string;
  /** 物料名称 */
  materialName: string;
  /** 规格型号 */
  model: string;
  /** 单位 */
  unitName: string;
  /** 物料类型（成品/原料/辅料） */
  materialType: string;
  /** 需求数量 */
  requiredQty: number;
  /** 当前库存 */
  currentStock: number;
  /** 可用库存 */
  availableStock: number;
  /** 采购在途 */
  purchaseOnWay: number;
  /** 生产在制 */
  productionOnWay: number;
  /** 净需求 */
  netDemand: number;
  /** 建议采购数量 */
  suggestPurchaseQty: number;
  /** 建议生产数量 */
  suggestProductionQty: number;
  /** 建议采购日期 */
  suggestPurchaseDate: string;
  /** 建议生产日期 */
  suggestProductionDate: string;
  /** 需求来源（销售订单/生产计划/MRP） */
  demandSource: string;
  /** 需求来源单号 */
  demandSourceCode: string;
  /** 供应方式 */
  supplyMode: string;
  /** 供应商ID */
  supplierId: string | number;
  /** 供应商名称 */
  supplierName: string;
}

export interface MrpResultVO {
  /** 运算批次号 */
  batchNo: string;
  /** 运算时间 */
  calculateTime: string;
  /** 总物料种类数 */
  totalMaterialCount: number;
  /** 生成采购建议数量 */
  purchaseSuggestCount: number;
  /** 生成生产建议数量 */
  productionSuggestCount: number;
  /** 采购订单明细列表 */
  purchaseItems: MrpResultItemVO[];
  /** 生产计划明细列表 */
  productionPlanItems: MrpResultItemVO[];
}

export interface MrpCalculateForm {
  /** 运算模式：manual-手动输入  salesOrder-销售订单  productionPlan-生产计划 */
  mode: 'manual' | 'salesOrder' | 'productionPlan';
  /** 运算截止日期 */
  deadlineDate: string;
  /** 安全库存天数 */
  safetyStockDays?: number;
  /** 是否考虑在途库存 */
  considerOnWayStock?: boolean;
  /** 是否按订单汇总 */
  groupByOrder?: boolean;
  /** 物料ID列表（手动模式） */
  materialIds?: (string | number)[];
  /** 销售订单ID列表 */
  salesOrderIds?: (string | number)[];
  /** 生产计划ID列表 */
  productionPlanIds?: (string | number)[];
  /** 生产计划ID列表 */
  salesOrderItemIds?: (string | number)[];
}

export interface MrpGenerateForm {
  /** 运算批次号 */
  batchNo: string;
  /** 生成类型：purchase-采购订单 production-生产计划 all-全部 */
  generateType: 'purchase' | 'production' | 'all';
  /** 选中的采购建议物料ID列表 */
  selectedPurchaseMaterialIds?: (string | number)[];
  /** 选中的生产建议物料ID列表 */
  selectedProductionMaterialIds?: (string | number)[];
}

export interface MrpVO {
  /** 主键 */
  id: string | number;
  /** 批次号 */
  batchNo: string;
  /** 运算模式 */
  mode: string;
  /** 运算时间 */
  calculateTime: string;
  /** 状态：0-进行中 1-已完成 2-失败 */
  status: number;
  /** 总物料种类数 */
  totalMaterialCount: number;
  /** 采购建议数 */
  purchaseSuggestCount: number;
  /** 生产建议数 */
  productionSuggestCount: number;
  /** 采购订单生成数 */
  purchaseOrderCount: number;
  /** 生产计划生成数 */
  productionPlanCount: number;
  /** 操作人 */
  operator: string;
  /** 备注 */
  remark: string;
}

export interface MrpQuery extends PageQuery {
  batchNo?: string;
  mode?: string;
  status?: number;
  params?: any;
}
