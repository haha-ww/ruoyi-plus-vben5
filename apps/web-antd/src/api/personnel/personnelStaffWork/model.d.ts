import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffWorkVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 公司
   */
  company: string;

  /**
   * 部门
   */
  dept: string;

  /**
   * 职务
   */
  job: string;

  /**
   * 开始日期
   */
  startDate: string;

  /**
   * 结束日期
   */
  endDate: string;

  /**
   * 工作描述
   */
  jobDescription: string;
}

export interface PersonnelStaffWorkForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 公司
   */
  company?: string;

  /**
   * 部门
   */
  dept?: string;

  /**
   * 职务
   */
  job?: string;

  /**
   * 开始日期
   */
  startDate?: string;

  /**
   * 结束日期
   */
  endDate?: string;

  /**
   * 工作描述
   */
  jobDescription?: string;

  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;
}

export interface PersonnelStaffWorkQuery extends PageQuery {
  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
