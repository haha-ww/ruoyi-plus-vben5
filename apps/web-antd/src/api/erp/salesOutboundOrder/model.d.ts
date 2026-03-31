import type { PageQuery, BaseEntity } from '#/api/common';

export interface SalesOutboundOrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 销售出库单编码
   */
  outboundOrderCode: string;

  /**
   * 客户id
   */
  customerId: string | number;

  /**
   * 出库负责人
   */
  outboundResponsiblePerson: number;

  /**
   * 收货地址
   */
  shippingAddress: string;

  /**
   * 物流公司
   */
  logisticsCompany: string;

  /**
   * 单据日期
   */
  orderDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SalesOutboundOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 销售出库单编码
   */
  outboundOrderCode?: string;

  /**
   * 客户id
   */
  customerId?: string | number;

  /**
   * 出库负责人
   */
  outboundResponsiblePerson?: number;

  /**
   * 收货地址
   */
  shippingAddress?: string;

  /**
   * 物流公司
   */
  logisticsCompany?: string;

  /**
   * 单据日期
   */
  orderDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SalesOutboundOrderQuery extends PageQuery {
  /**
   * 销售出库单编码
   */
  outboundOrderCode?: string;

  /**
   * 客户id
   */
  customerId?: string | number;

  /**
   * 出库负责人
   */
  outboundResponsiblePerson?: number;

  /**
   * 收货地址
   */
  shippingAddress?: string;

  /**
   * 物流公司
   */
  logisticsCompany?: string;

  /**
   * 单据日期
   */
  orderDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
