import type { PageQuery, BaseEntity } from '#/api/common';

export interface WarehouseTransferItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 调拨单主表ID
   */
  transferId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 数量
   */
  quantity: number;

  /**
   * 调入仓库ID
   */
  inWarehouseId: string | number;

  /**
   * 调出仓库ID
   */
  outWarehouseId: string | number;

}

export interface WarehouseTransferItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 调拨单主表ID
   */
  transferId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 数量
   */
  quantity?: number;

  /**
   * 调入仓库ID
   */
  inWarehouseId?: string | number;

  /**
   * 调出仓库ID
   */
  outWarehouseId?: string | number;

}

export interface WarehouseTransferItemQuery extends PageQuery {
  /**
   * 调拨单主表ID
   */
  transferId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 数量
   */
  quantity?: number;

  /**
   * 调入仓库ID
   */
  inWarehouseId?: string | number;

  /**
   * 调出仓库ID
   */
  outWarehouseId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
