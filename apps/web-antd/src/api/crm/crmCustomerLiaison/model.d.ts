import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerLiaisonVO {
  /**
   *
   */
  id: number | string;

  /**
   * 客户ID
   */
  customerId: number | string;

  /**
   * 联系人姓名
   */
  liaisonName: string;

  /**
   * 联系电话
   */
  liaisonTel: string;

  /**
   * 联系人职位
   */
  liaisonJob: string;

  /**
   * 性别
   */
  liaisonSex: string;

  /**
   * 联系人邮箱
   */
  liaisonEmail: string;

  /**
   * 联系人微信
   */
  liaisonWx: string;

  /**
   * 联系人QQ
   */
  liaisonQq: string;

  /**
   * 备注
   */
  remark: string;
}

export interface CrmCustomerLiaisonForm extends BaseEntity {
  /**
   *
   */
  id?: number | string;

  /**
   * 客户ID
   */
  customerId?: number | string;

  /**
   * 联系人姓名
   */
  liaisonName?: string;

  /**
   * 联系电话
   */
  liaisonTel?: string;

  /**
   * 联系人职位
   */
  liaisonJob?: string;

  /**
   * 性别
   */
  liaisonSex?: string;

  /**
   * 联系人邮箱
   */
  liaisonEmail?: string;

  /**
   * 联系人微信
   */
  liaisonWx?: string;

  /**
   * 联系人QQ
   */
  liaisonQq?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface CrmCustomerLiaisonQuery extends PageQuery {
  /**
   * 客户ID
   */
  customerId?: number | string;

  /**
   * 日期范围参数
   */
  params?: any;
}
