import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtherOutboundItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 其他出库单主表ID
   */
  outboundId: string | number;

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

export interface OtherOutboundItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 其他出库单主表ID
   */
  outboundId?: string | number;

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

export interface OtherOutboundItemQuery extends PageQuery {
  /**
   * 其他出库单主表ID
   */
  outboundId?: string | number;

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
