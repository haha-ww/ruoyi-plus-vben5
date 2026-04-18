import type { PageQuery, BaseEntity } from '#/api/common';

export interface SalesOrderItemVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 销售订单ID
   */
  orderId: string | number;

  /**
   * 销售订单编码
   */
  orderCode?: string;

  /**
   * 客户名称
   */
  customerName?: string;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 物料名称
   */
  materialName?: string;

  /**
   * 物料编码
   */
  materialCode?: string;

  /**
   * bomId
   */
  bomId: string | number;

  /**
   * bom版本
   */
  bomVersion: string;

  /**
   * 退货数
   */
  returnQuantity: number;

  /**
   * 订单数量
   */
  quantity: number;

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
   * 价税合计金额
   */
  priceBeforeDiscount: number;

  /**
   * 折扣率
   */
  discountRate: number;

  /**
   * 折扣金额
   */
  discountAmount: number;

  /**
   * 实际总金额
   */
  actualTotalAmount: number;

  /**
   * 要求交货日期
   */
  requiredDeliveryDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SalesOrderItemForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 销售订单ID
   */
  orderId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * bomId
   */
  bomId?: string | number;

  /**
   * bom版本
   */
  bomVersion?: string;

  /**
   * 退货数
   */
  returnQuantity?: number;

  /**
   * 订单数量
   */
  quantity?: number;

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
   * 价税合计金额
   */
  priceBeforeDiscount?: number;

  /**
   * 折扣率
   */
  discountRate?: number;

  /**
   * 折扣金额
   */
  discountAmount?: number;

  /**
   * 实际总金额
   */
  actualTotalAmount?: number;

  /**
   * 要求交货日期
   */
  requiredDeliveryDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SalesOrderItemQuery extends PageQuery {
  /**
   * 销售订单ID
   */
  orderId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * bomId
   */
  bomId?: string | number;

  /**
   * bom版本
   */
  bomVersion?: string;

  /**
   * 退货数
   */
  returnQuantity?: number;

  /**
   * 订单数量
   */
  quantity?: number;

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
   * 价税合计金额
   */
  priceBeforeDiscount?: number;

  /**
   * 折扣率
   */
  discountRate?: number;

  /**
   * 折扣金额
   */
  discountAmount?: number;

  /**
   * 实际总金额
   */
  actualTotalAmount?: number;

  /**
   * 要求交货日期
   */
  requiredDeliveryDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
