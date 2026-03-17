import type { PageQuery, BaseEntity } from '#/api/common';

export interface PersonnelCycleVO {
  /**
   * 自增ID
   */
  id: string | number;

  /**
   * 考勤组ID
   */
  groupId: string | number;

  /**
   * 周期名称
   */
  name: string;

  /**
   * 周期
   */
  cycle: number;

  /**
   * 业务员ID
   */
  uid: string | number;

  /**
   * 备注
   */
  remark: string;

}

export interface PersonnelCycleForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: string | number;

  /**
   * 考勤组ID
   */
  groupId?: string | number;

  /**
   * 周期名称
   */
  name?: string;

  /**
   * 周期
   */
  cycle?: number;

  /**
   * 业务员ID
   */
  uid?: string | number;

  /**
   * 备注
   */
  remark?: string;

}

export interface PersonnelCycleQuery extends PageQuery {
  /**
   * 考勤组ID
   */
  groupId?: string | number;

  /**
   * 周期名称
   */
  name?: string;

  /**
   * 周期
   */
  cycle?: number;

  /**
   * 业务员ID
   */
  uid?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
