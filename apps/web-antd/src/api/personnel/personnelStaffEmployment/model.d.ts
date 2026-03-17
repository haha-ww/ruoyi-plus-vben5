import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffEmploymentVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 岗位
   */
  post: string;

  /**
   * 部门
   */
  dept: string;

  /**
   * 开始日期
   */
  startDate: string;

  /**
   * 结束日期
   */
  endDate: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 附件ossId
   */
  attachment: string;

  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber: string;
}

export interface PersonnelStaffEmploymentForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 岗位
   */
  post?: string;

  /**
   * 部门
   */
  dept?: string;

  /**
   * 开始日期
   */
  startDate?: string;

  /**
   * 结束日期
   */
  endDate?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 附件ossId
   */
  attachment?: string;

  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;
}

export interface PersonnelStaffEmploymentQuery extends PageQuery {
  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
