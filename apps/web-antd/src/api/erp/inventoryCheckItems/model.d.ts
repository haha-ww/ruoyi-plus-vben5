import type { PageQuery, BaseEntity } from '#/api/common';

export interface InventoryCheckItemsVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 盘点单id
   */
  checkId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 盘点数量
   */
  actualQuantity: number;

  /**
   * 盈亏数量
   */
  varianceQuantity: number;

  /**
   * 盘点结果
   */
  varianceType: string;

  /**
   * 其它入库id
   */
  inboundId: string | number;

  /**
   * 其他出库id
   */
  outboundId: string | number;

  /**
   * 备注
   */
  remark: string;

}

export interface InventoryCheckItemsForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 盘点单id
   */
  checkId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 盘点数量
   */
  actualQuantity?: number;

  /**
   * 盈亏数量
   */
  varianceQuantity?: number;

  /**
   * 盘点结果
   */
  varianceType?: string;

  /**
   * 其它入库id
   */
  inboundId?: string | number;

  /**
   * 其他出库id
   */
  outboundId?: string | number;

  /**
   * 备注
   */
  remark?: string;

}

export interface InventoryCheckItemsQuery extends PageQuery {
  /**
   * 盘点单id
   */
  checkId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 盘点数量
   */
  actualQuantity?: number;

  /**
   * 盈亏数量
   */
  varianceQuantity?: number;

  /**
   * 盘点结果
   */
  varianceType?: string;

  /**
   * 其它入库id
   */
  inboundId?: string | number;

  /**
   * 其他出库id
   */
  outboundId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
