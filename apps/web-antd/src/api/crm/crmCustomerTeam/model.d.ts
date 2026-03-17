import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerTeamVO {
  /**
   *
   */
  id: number | string;

  /**
   * 客户id
   */
  customerId: number | string;

  /**
   * 用户id
   */
  userId: number | string;

  /**
   * 是否关注(0否，1是)
   */
  customerFollowed: string;
}

export interface CrmCustomerTeamForm extends BaseEntity {
  /**
   *
   */
  id?: number | string;

  /**
   * 客户id
   */
  customerId?: number | string;

  /**
   * 用户id
   */
  userId?: number | string;

  /**
   * 是否关注(0否，1是)
   */
  customerFollowed?: string;
}

export interface CrmCustomerTeamQuery extends PageQuery {
  /**
   * 客户id
   */
  customerId?: number | string;

  /**
   * 用户id
   */
  userId?: number | string;

  /**
   * 是否关注(0否，1是)
   */
  customerFollowed?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
