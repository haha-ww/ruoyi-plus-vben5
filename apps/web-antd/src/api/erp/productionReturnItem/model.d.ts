import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionReturnItemVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 领料退货单编码
   */
  returnCode: string;

  /**
   * 领料退货单Id
   */
  returnId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 实退数量
   */
  actualReturnQuantity: number;

  /**
   * 退料仓库id
   */
  warehouseId: string | number;

  /**
   * 退货原因
   */
  returnReason: string;

  /**
   * 领料出库单号
   */
  outboundOrderCode: string;

  /**
   * 领料出库单明细id
   */
  outboundOrderItemId: string | number;

}

export interface ProductionReturnItemForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 领料退货单编码
   */
  returnCode?: string;

  /**
   * 领料退货单Id
   */
  returnId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 实退数量
   */
  actualReturnQuantity?: number;

  /**
   * 退料仓库id
   */
  warehouseId?: string | number;

  /**
   * 退货原因
   */
  returnReason?: string;

  /**
   * 领料出库单号
   */
  outboundOrderCode?: string;

  /**
   * 领料出库单明细id
   */
  outboundOrderItemId?: string | number;

}

export interface ProductionReturnItemQuery extends PageQuery {
  /**
   * 领料退货单编码
   */
  returnCode?: string;

  /**
   * 领料退货单Id
   */
  returnId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 实退数量
   */
  actualReturnQuantity?: number;

  /**
   * 退料仓库id
   */
  warehouseId?: string | number;

  /**
   * 退货原因
   */
  returnReason?: string;

  /**
   * 领料出库单号
   */
  outboundOrderCode?: string;

  /**
   * 领料出库单明细id
   */
  outboundOrderItemId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
