import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerFollowVO {
  /**
   * 主键id
   */
  id: number | string;

  /**
   * 客户ID
   */
  customerId: number | string;

  /**
   * 用户ID
   */
  userId: number | string;

  /**
   * 说明内容
   */
  content: string;

  /**
   * 类型：0，说明；1，提醒；
   */
  types: number;

  /**
   * 提醒时间
   */
  time: string;

  /**
   * 定时任务唯一值
   */
  uniqued: string;

  /**
   * 状态：0、待处理；1、放弃；2、已完成；
   */
  status: number;

  /**
   * 跟进版本
   */
  followVersion: number;

  /**
   * 备注
   */
  remark: string;
}

export interface CrmCustomerFollowForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: number | string;

  /**
   * 客户ID
   */
  customerId?: number | string;

  /**
   * 用户ID
   */
  userId?: number | string;

  /**
   * 说明内容
   */
  content?: string;

  /**
   * 类型：0，说明；1，提醒；
   */
  types?: number;

  /**
   * 提醒时间
   */
  time?: string;

  /**
   * 定时任务唯一值
   */
  uniqued?: string;

  /**
   * 状态：0、待处理；1、放弃；2、已完成；
   */
  status?: number;

  /**
   * 跟进版本
   */
  followVersion?: number;

  /**
   * 备注
   */
  remark?: string;
}

export interface CrmCustomerFollowQuery extends PageQuery {
  /**
   * 客户ID
   */
  customerId?: number | string;

  /**
   * 用户ID
   */
  userId?: number | string;

  /**
   * 说明内容
   */
  content?: string;

  /**
   * 类型：0，说明；1，提醒；
   */
  types?: number;

  /**
   * 提醒时间
   */
  time?: string;

  /**
   * 定时任务唯一值
   */
  uniqued?: string;

  /**
   * 状态：0、待处理；1、放弃；2、已完成；
   */
  status?: number;

  /**
   * 跟进版本
   */
  followVersion?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
