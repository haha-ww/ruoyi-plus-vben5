import type { PageQuery, BaseEntity } from '#/api/common';

export interface SupplierVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 供应商编码
   */
  supplierCode: string;

  /**
   * 供应商名称
   */
  supplierName: string;

  /**
   * 简称
   */
  shortName: string;

  /**
   * 统一社会信用代码
   */
  socialCommunicationCode: string;

  /**
   * 供应商类型(字典 supplier_type)
   */
  type: number;

  /**
   * 合作状态(字典 cooperation_status)
   */
  cooperationStatus: number;

  /**
   * 成立时间
   */
  succeedDate: string;

  /**
   * 所属行业
   */
  industry: string;

  /**
   * 联系人
   */
  contactPerson: string;

  /**
   * 联系电话
   */
  phone: string;

  /**
   * 电子邮箱
   */
  email: string;

  /**
   * 联系地址
   */
  address: string;

  /**
   * 开户行
   */
  bank: string;

  /**
   * 银行账号
   */
  bankCard: string;

  /**
   * 开票抬头
   */
  bill: string;

  /**
   * 结算方式
   */
  settlementType: string;

  /**
   * 备注
   */
  remark: string;

}

export interface SupplierForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 供应商编码
   */
  supplierCode?: string;

  /**
   * 供应商名称
   */
  supplierName?: string;

  /**
   * 简称
   */
  shortName?: string;

  /**
   * 统一社会信用代码
   */
  socialCommunicationCode?: string;

  /**
   * 供应商类型(字典 supplier_type)
   */
  type?: number;

  /**
   * 合作状态(字典 cooperation_status)
   */
  cooperationStatus?: number;

  /**
   * 成立时间
   */
  succeedDate?: string;

  /**
   * 所属行业
   */
  industry?: string;

  /**
   * 联系人
   */
  contactPerson?: string;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 电子邮箱
   */
  email?: string;

  /**
   * 联系地址
   */
  address?: string;

  /**
   * 开户行
   */
  bank?: string;

  /**
   * 银行账号
   */
  bankCard?: string;

  /**
   * 开票抬头
   */
  bill?: string;

  /**
   * 结算方式
   */
  settlementType?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface SupplierQuery extends PageQuery {
  /**
   * 供应商编码
   */
  supplierCode?: string;

  /**
   * 供应商名称
   */
  supplierName?: string;

  /**
   * 简称
   */
  shortName?: string;

  /**
   * 统一社会信用代码
   */
  socialCommunicationCode?: string;

  /**
   * 供应商类型(字典 supplier_type)
   */
  type?: number;

  /**
   * 合作状态(字典 cooperation_status)
   */
  cooperationStatus?: number;

  /**
   * 成立时间
   */
  succeedDate?: string;

  /**
   * 所属行业
   */
  industry?: string;

  /**
   * 联系人
   */
  contactPerson?: string;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 电子邮箱
   */
  email?: string;

  /**
   * 联系地址
   */
  address?: string;

  /**
   * 开户行
   */
  bank?: string;

  /**
   * 银行账号
   */
  bankCard?: string;

  /**
   * 开票抬头
   */
  bill?: string;

  /**
   * 结算方式
   */
  settlementType?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
