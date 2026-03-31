import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseInboundItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 采购入库ID
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
   * 仓库id
   */
  warehouseId: string | number;

  /**
   * 采购订单明细id
   */
  orderItemId: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode: string;

  /**
   * 备注
   */
  remark: string;

}

export interface PurchaseInboundItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 采购入库ID
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
   * 仓库id
   */
  warehouseId?: string | number;

  /**
   * 采购订单明细id
   */
  orderItemId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface PurchaseInboundItemQuery extends PageQuery {
  /**
   * 采购入库ID
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
   * 仓库id
   */
  warehouseId?: string | number;

  /**
   * 采购订单明细id
   */
  orderItemId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
