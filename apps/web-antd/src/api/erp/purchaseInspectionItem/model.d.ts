import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseInspectionItemVO {
  /**
   * 主键
   */
  id: string | number;

  /**
   * 采购质检主表ID
   */
  inspectionId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 采购订单明细id
   */
  orderItemId: string | number;

  /**
   * 采购订单编码
   */
  purchaseOrderCode: string;

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

}

export interface PurchaseInspectionItemForm extends BaseEntity {
  /**
   * 主键
   */
  id?: string | number;

  /**
   * 采购质检主表ID
   */
  inspectionId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 采购订单明细id
   */
  orderItemId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseOrderCode?: string;

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

}

export interface PurchaseInspectionItemQuery extends PageQuery {
  /**
   * 采购质检主表ID
   */
  inspectionId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 采购订单明细id
   */
  orderItemId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseOrderCode?: string;

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
    * 日期范围参数
    */
  params?: any;
}
