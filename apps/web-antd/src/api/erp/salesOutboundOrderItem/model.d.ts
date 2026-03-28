import type { PageQuery, BaseEntity } from '#/api/common';

export interface SalesOutboundOrderItemVO {
  /**
   * 自增主键ID
   */
  id: string | number;

  /**
   * 销售出库id
   */
  outboundOrderId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 销售订单id
   */
  salesOrderId: string | number;

  /**
   * 销售订单编号
   */
  salesOrderNo: string;

  /**
   * 销售订单明细id
   */
  salesOrderItemId: string | number;

  /**
   * 出库数量
   */
  outboundQuantity: number;

  /**
   * 仓库id
   */
  warehouseId: string | number;

  /**
   * 库位id
   */
  locationId: string | number;

}

export interface SalesOutboundOrderItemForm extends BaseEntity {
  /**
   * 自增主键ID
   */
  id?: string | number;

  /**
   * 销售出库id
   */
  outboundOrderId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 销售订单编号
   */
  salesOrderNo?: string;

  /**
   * 销售订单明细id
   */
  salesOrderItemId?: string | number;

  /**
   * 出库数量
   */
  outboundQuantity?: number;

  /**
   * 仓库id
   */
  warehouseId?: string | number;

  /**
   * 库位id
   */
  locationId?: string | number;

}

export interface SalesOutboundOrderItemQuery extends PageQuery {
  /**
   * 销售出库id
   */
  outboundOrderId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 销售订单编号
   */
  salesOrderNo?: string;

  /**
   * 销售订单明细id
   */
  salesOrderItemId?: string | number;

  /**
   * 出库数量
   */
  outboundQuantity?: number;

  /**
   * 仓库id
   */
  warehouseId?: string | number;

  /**
   * 库位id
   */
  locationId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
