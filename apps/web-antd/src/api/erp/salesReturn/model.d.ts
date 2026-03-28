import type { PageQuery, BaseEntity } from '#/api/common';

export interface SalesReturnVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 销售退货编码
   */
  returnCode: string;

  /**
   * 客户id
   */
  customerId: string | number;

  /**
   * 退货负责人id
   */
  responsiblePerson: number;

  /**
   * 收货地址
   */
  deliveryAddress: string;

  /**
   * 物流公司
   */
  logisticsCompany: string;

  /**
   * 单据日期
   */
  documentDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SalesReturnForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 销售退货编码
   */
  returnCode?: string;

  /**
   * 客户id
   */
  customerId?: string | number;

  /**
   * 退货负责人id
   */
  responsiblePerson?: number;

  /**
   * 收货地址
   */
  deliveryAddress?: string;

  /**
   * 物流公司
   */
  logisticsCompany?: string;

  /**
   * 单据日期
   */
  documentDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SalesReturnQuery extends PageQuery {
  /**
   * 销售退货编码
   */
  returnCode?: string;

  /**
   * 客户id
   */
  customerId?: string | number;

  /**
   * 退货负责人id
   */
  responsiblePerson?: number;

  /**
   * 收货地址
   */
  deliveryAddress?: string;

  /**
   * 物流公司
   */
  logisticsCompany?: string;

  /**
   * 单据日期
   */
  documentDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
