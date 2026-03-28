import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseInboundVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 采购入库单编码
   */
  inboundCode: string;

  /**
   * 采购订单id
   */
  purchaseOrderId: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode: string;

  /**
   * 供应商id
   */
  supplierId: string | number;

  /**
   * 库管员id
   */
  warehouseManager: number;

  /**
   * 入库日期
   */
  inboundDate: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 状态
   */
  status: number;

}

export interface PurchaseInboundForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 采购入库单编码
   */
  inboundCode?: string;

  /**
   * 采购订单id
   */
  purchaseOrderId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode?: string;

  /**
   * 供应商id
   */
  supplierId?: string | number;

  /**
   * 库管员id
   */
  warehouseManager?: number;

  /**
   * 入库日期
   */
  inboundDate?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 状态
   */
  status?: number;

}

export interface PurchaseInboundQuery extends PageQuery {
  /**
   * 采购入库单编码
   */
  inboundCode?: string;

  /**
   * 采购订单id
   */
  purchaseOrderId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode?: string;

  /**
   * 供应商id
   */
  supplierId?: string | number;

  /**
   * 库管员id
   */
  warehouseManager?: number;

  /**
   * 入库日期
   */
  inboundDate?: string;

  /**
   * 状态
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
