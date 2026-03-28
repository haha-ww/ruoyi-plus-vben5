import type { PageQuery, BaseEntity } from '#/api/common';

export interface MaterialOutboundOrderItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 领料出库id
   */
  outboundOrderId: string | number;

  /**
   * 领料出库单号
   */
  outboundOrderCode: string;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 实际领料数量
   */
  actualQuantity: number;

  /**
   * 退料数量
   */
  returnQuantity: number;

  /**
   * 发料仓库id
   */
  warehouseId: string | number;

}

export interface MaterialOutboundOrderItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 领料出库id
   */
  outboundOrderId?: string | number;

  /**
   * 领料出库单号
   */
  outboundOrderCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 实际领料数量
   */
  actualQuantity?: number;

  /**
   * 退料数量
   */
  returnQuantity?: number;

  /**
   * 发料仓库id
   */
  warehouseId?: string | number;

}

export interface MaterialOutboundOrderItemQuery extends PageQuery {
  /**
   * 领料出库id
   */
  outboundOrderId?: string | number;

  /**
   * 领料出库单号
   */
  outboundOrderCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 实际领料数量
   */
  actualQuantity?: number;

  /**
   * 退料数量
   */
  returnQuantity?: number;

  /**
   * 发料仓库id
   */
  warehouseId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
