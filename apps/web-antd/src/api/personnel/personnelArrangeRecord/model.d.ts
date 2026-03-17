import type { PageQuery, BaseEntity } from '#/api/common';

export interface PersonnelArrangeRecordVO {
  /**
   * 自增ID
   */
  id: string | number;

  /**
   * 排班ID
   */
  arrangeId: string | number;

  /**
   * 考勤组ID
   */
  groupId: string | number;

  /**
   * 业务员ID
   */
  uid: string | number;

  /**
   * 班次ID
   */
  shiftId: string | number;

  /**
   * 排班日期
   */
  date: string;

  /**
   * 
   */
  createdAt: string;

  /**
   * 
   */
  updatedAt: string;

  /**
   * 
   */
  deletedAt: string;

}

export interface PersonnelArrangeRecordForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: string | number;

  /**
   * 排班ID
   */
  arrangeId?: string | number;

  /**
   * 考勤组ID
   */
  groupId?: string | number;

  /**
   * 业务员ID
   */
  uid?: string | number;

  /**
   * 班次ID
   */
  shiftId?: string | number;

  /**
   * 排班日期
   */
  date?: string;

  /**
   * 
   */
  createdAt?: string;

  /**
   * 
   */
  updatedAt?: string;

  /**
   * 
   */
  deletedAt?: string;

}

export interface PersonnelArrangeRecordQuery extends PageQuery {
  /**
   * 排班ID
   */
  arrangeId?: string | number;

  /**
   * 考勤组ID
   */
  groupId?: string | number;

  /**
   * 业务员ID
   */
  uid?: string | number;

  /**
   * 班次ID
   */
  shiftId?: string | number;

  /**
   * 排班日期
   */
  date?: string;

  /**
   * 
   */
  createdAt?: string;

  /**
   * 
   */
  updatedAt?: string;

  /**
   * 
   */
  deletedAt?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
