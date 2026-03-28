import type { PageQuery, BaseEntity } from '#/api/common';

export interface SalesReturnItemVO {
  /**
   * 自增主键
   */
  id: string | number;

  /**
   * 销售退货主表ID
   */
  returnId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 销售出库单编号
   */
  outboundOrderCode: string;

  /**
   * 销售出库单id
   */
  outboundOrderId: string | number;

  /**
   * 销售出库明细id
   */
  outboundOrderItemId: string | number;

  /**
   * 销售订单编号
   */
  salesOrderCode: string;

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

export interface SalesReturnItemForm extends BaseEntity {
  /**
   * 自增主键
   */
  id?: string | number;

  /**
   * 销售退货主表ID
   */
  returnId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 销售出库单编号
   */
  outboundOrderCode?: string;

  /**
   * 销售出库单id
   */
  outboundOrderId?: string | number;

  /**
   * 销售出库明细id
   */
  outboundOrderItemId?: string | number;

  /**
   * 销售订单编号
   */
  salesOrderCode?: string;

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

export interface SalesReturnItemQuery extends PageQuery {
  /**
   * 销售退货主表ID
   */
  returnId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 销售出库单编号
   */
  outboundOrderCode?: string;

  /**
   * 销售出库单id
   */
  outboundOrderId?: string | number;

  /**
   * 销售出库明细id
   */
  outboundOrderItemId?: string | number;

  /**
   * 销售订单编号
   */
  salesOrderCode?: string;

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
