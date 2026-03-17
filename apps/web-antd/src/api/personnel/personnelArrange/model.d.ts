import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelArrangeVO {
  /**
   * 自增ID
   */
  id: number | string;

  /**
   * 考勤组ID
   */
  groupId: number | string;

  /**
   * 业务员ID
   */
  uid: number | string;

  /**
   * 考勤时间
   */
  date: string;
}

export interface PersonnelArrangeForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: number | string;

  /**
   * 考勤组ID
   */
  groupId?: number | string;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   * 考勤时间
   */
  date?: string;
}

export interface PersonnelArrangeQuery extends PageQuery {
  /**
   * 考勤组ID
   */
  groupId?: number | string;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   * 考勤时间
   */
  date?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
