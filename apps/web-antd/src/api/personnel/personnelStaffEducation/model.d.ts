import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffEducationVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 学历（字典degree_type）
   */
  degree: number;

  /**
   * 学校
   */
  school: string;

  /**
   * 开始日期
   */
  startDate: string;

  /**
   * 结束日期
   */
  endDate: string;

  /**
   * 专业
   */
  major: string;
}

export interface PersonnelStaffEducationForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 学历（字典degree_type）
   */
  degree?: number;

  /**
   * 学校
   */
  school?: string;

  /**
   * 开始日期
   */
  startDate?: string;

  /**
   * 结束日期
   */
  endDate?: string;

  /**
   * 专业
   */
  major?: string;

  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;
}

export interface PersonnelStaffEducationQuery extends PageQuery {
  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
