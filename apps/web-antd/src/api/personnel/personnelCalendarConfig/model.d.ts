import type { PageQuery, BaseEntity } from '#/api/common';

export interface PersonnelCalendarConfigVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 日期
   */
  day: string;

  /**
   * 备注
   */
  remark: string;

}

export interface PersonnelCalendarConfigForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 日期
   */
  day?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface PersonnelCalendarConfigQuery extends PageQuery {
  /**
   * 日期
   */
  day?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
