import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtherInboundItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 其他入库单主表ID
   */
  inboundId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 入库数量
   */
  quantity: number;

  /**
   * 仓库ID
   */
  warehouseId: string | number;

}

export interface OtherInboundItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 其他入库单主表ID
   */
  inboundId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 入库数量
   */
  quantity?: number;

  /**
   * 仓库ID
   */
  warehouseId?: string | number;

}

export interface OtherInboundItemQuery extends PageQuery {
  /**
   * 其他入库单主表ID
   */
  inboundId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 入库数量
   */
  quantity?: number;

  /**
   * 仓库ID
   */
  warehouseId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
