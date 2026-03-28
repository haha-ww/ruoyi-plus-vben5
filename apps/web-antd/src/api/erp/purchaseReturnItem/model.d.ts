import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseReturnItemVO {
  /**
   * 自增主键
   */
  id: string | number;

  /**
   * 采购退货主表ID
   */
  returnId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 采购入库单编号
   */
  outboundOrderCode: string;

  /**
   * 采购入库单id
   */
  outboundOrderId: string | number;

  /**
   * 采购入库明细id
   */
  outboundOrderItemId: string | number;

  /**
   * 采购订单编号
   */
  purchaseOrderCode: string;

  /**
   * 应退数量
   */
  shouldReturnQty: number;

  /**
   * 实退数量
   */
  actualReturnQty: number;

  /**
   * 退货金额
   */
  returnAmount: number;

  /**
   * 退货单价
   */
  returnPrice: number;

  /**
   * 退货入库仓库id
   */
  warehouseId: string | number;

  /**
   * 库位id
   */
  locationId: string | number;

  /**
   * 退货原因
   */
  returnReason: string;

}

export interface PurchaseReturnItemForm extends BaseEntity {
  /**
   * 自增主键
   */
  id?: string | number;

  /**
   * 采购退货主表ID
   */
  returnId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 采购入库单编号
   */
  outboundOrderCode?: string;

  /**
   * 采购入库单id
   */
  outboundOrderId?: string | number;

  /**
   * 采购入库明细id
   */
  outboundOrderItemId?: string | number;

  /**
   * 采购订单编号
   */
  purchaseOrderCode?: string;

  /**
   * 应退数量
   */
  shouldReturnQty?: number;

  /**
   * 实退数量
   */
  actualReturnQty?: number;

  /**
   * 退货金额
   */
  returnAmount?: number;

  /**
   * 退货单价
   */
  returnPrice?: number;

  /**
   * 退货入库仓库id
   */
  warehouseId?: string | number;

  /**
   * 库位id
   */
  locationId?: string | number;

  /**
   * 退货原因
   */
  returnReason?: string;

}

export interface PurchaseReturnItemQuery extends PageQuery {
  /**
   * 采购退货主表ID
   */
  returnId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 采购入库单编号
   */
  outboundOrderCode?: string;

  /**
   * 采购入库单id
   */
  outboundOrderId?: string | number;

  /**
   * 采购入库明细id
   */
  outboundOrderItemId?: string | number;

  /**
   * 采购订单编号
   */
  purchaseOrderCode?: string;

  /**
   * 应退数量
   */
  shouldReturnQty?: number;

  /**
   * 实退数量
   */
  actualReturnQty?: number;

  /**
   * 退货金额
   */
  returnAmount?: number;

  /**
   * 退货单价
   */
  returnPrice?: number;

  /**
   * 退货入库仓库id
   */
  warehouseId?: string | number;

  /**
   * 库位id
   */
  locationId?: string | number;

  /**
   * 退货原因
   */
  returnReason?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
