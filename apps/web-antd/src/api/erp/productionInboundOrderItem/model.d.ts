import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionInboundOrderItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 生产入库单id
   */
  inboundOrderId: string | number;

  /**
   * 生产订单id
   */
  productionOrderId: string | number;

  /**
   * 生产订单编码
   */
  productionOrderCode: string;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 入库数量
   */
  inboundQuantity: number;

  /**
   * 入库仓库id
   */
  warehouseId: string | number;

}

export interface ProductionInboundOrderItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 生产入库单id
   */
  inboundOrderId?: string | number;

  /**
   * 生产订单id
   */
  productionOrderId?: string | number;

  /**
   * 生产订单编码
   */
  productionOrderCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 入库数量
   */
  inboundQuantity?: number;

  /**
   * 入库仓库id
   */
  warehouseId?: string | number;

}

export interface ProductionInboundOrderItemQuery extends PageQuery {
  /**
   * 生产入库单id
   */
  inboundOrderId?: string | number;

  /**
   * 生产订单id
   */
  productionOrderId?: string | number;

  /**
   * 生产订单编码
   */
  productionOrderCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 入库数量
   */
  inboundQuantity?: number;

  /**
   * 入库仓库id
   */
  warehouseId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
