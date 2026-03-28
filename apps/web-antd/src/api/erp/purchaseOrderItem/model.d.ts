import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseOrderItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 采购订单ID
   */
  orderId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 采购数量
   */
  quantity: number;

  /**
   * 剩余数量
   */
  remainQuantity: number;

  /**
   * 采购计划明细id
   */
  planItemId: string | number;

  /**
   * 含税单价
   */
  taxIncludedPrice: number;

  /**
   * 税率(字典 tax_rate)
   */
  taxRate: number;

  /**
   * 不含税单价
   */
  taxExcludedPrice: number;

  /**
   * 含税金额
   */
  taxTotalAmount: number;

  /**
   * 未税金额
   */
  actualTotalAmount: number;

  /**
   * 备注
   */
  remark: string;

}

export interface PurchaseOrderItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 采购订单ID
   */
  orderId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 采购数量
   */
  quantity?: number;

  /**
   * 剩余数量
   */
  remainQuantity?: number;

  /**
   * 采购计划明细id
   */
  planItemId?: string | number;

  /**
   * 含税单价
   */
  taxIncludedPrice?: number;

  /**
   * 税率(字典 tax_rate)
   */
  taxRate?: number;

  /**
   * 不含税单价
   */
  taxExcludedPrice?: number;

  /**
   * 含税金额
   */
  taxTotalAmount?: number;

  /**
   * 未税金额
   */
  actualTotalAmount?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface PurchaseOrderItemQuery extends PageQuery {
  /**
   * 采购订单ID
   */
  orderId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 采购数量
   */
  quantity?: number;

  /**
   * 剩余数量
   */
  remainQuantity?: number;

  /**
   * 采购计划明细id
   */
  planItemId?: string | number;

  /**
   * 含税单价
   */
  taxIncludedPrice?: number;

  /**
   * 税率(字典 tax_rate)
   */
  taxRate?: number;

  /**
   * 不含税单价
   */
  taxExcludedPrice?: number;

  /**
   * 含税金额
   */
  taxTotalAmount?: number;

  /**
   * 未税金额
   */
  actualTotalAmount?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
