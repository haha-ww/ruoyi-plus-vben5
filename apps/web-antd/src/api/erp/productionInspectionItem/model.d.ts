import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionInspectionItemVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 生产质检主表ID
   */
  inspectionId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 仓库id
   */
  warehouseId: string | number;

  /**
   * 检验数量
   */
  inspectQty: number;

  /**
   * 合格数量
   */
  qualifiedQty: number;

  /**
   * 不合格数量
   */
  unqualifiedQty: number;

  /**
   * 不合格原因
   */
  unqualifiedReason: string;

  /**
   * 质检合格率
   */
  passRate: number;

  /**
   * 生产订单id
   */
  productionOrderId: string | number;

  /**
   * 生产订单编码
   */
  productionOrderCode: string;

}

export interface ProductionInspectionItemForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 生产质检主表ID
   */
  inspectionId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 仓库id
   */
  warehouseId?: string | number;

  /**
   * 检验数量
   */
  inspectQty?: number;

  /**
   * 合格数量
   */
  qualifiedQty?: number;

  /**
   * 不合格数量
   */
  unqualifiedQty?: number;

  /**
   * 不合格原因
   */
  unqualifiedReason?: string;

  /**
   * 质检合格率
   */
  passRate?: number;

  /**
   * 生产订单id
   */
  productionOrderId?: string | number;

  /**
   * 生产订单编码
   */
  productionOrderCode?: string;

}

export interface ProductionInspectionItemQuery extends PageQuery {
  /**
   * 生产质检主表ID
   */
  inspectionId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 仓库id
   */
  warehouseId?: string | number;

  /**
   * 检验数量
   */
  inspectQty?: number;

  /**
   * 合格数量
   */
  qualifiedQty?: number;

  /**
   * 不合格数量
   */
  unqualifiedQty?: number;

  /**
   * 不合格原因
   */
  unqualifiedReason?: string;

  /**
   * 质检合格率
   */
  passRate?: number;

  /**
   * 生产订单id
   */
  productionOrderId?: string | number;

  /**
   * 生产订单编码
   */
  productionOrderCode?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
