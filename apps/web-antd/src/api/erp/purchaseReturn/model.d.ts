import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseReturnVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 采购退货编码
   */
  returnCode: string;

  /**
   * 供应商id
   */
  supplierId: string | number;

  /**
   * 退货类型
   */
  returnType: number;

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

export interface PurchaseReturnForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 采购退货编码
   */
  returnCode?: string;

  /**
   * 供应商id
   */
  supplierId?: string | number;

  /**
   * 退货类型
   */
  returnType?: number;

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

export interface PurchaseReturnQuery extends PageQuery {
  /**
   * 采购退货编码
   */
  returnCode?: string;

  /**
   * 供应商id
   */
  supplierId?: string | number;

  /**
   * 退货类型
   */
  returnType?: number;

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
