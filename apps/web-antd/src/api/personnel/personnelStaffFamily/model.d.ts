import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffFamilyVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 姓名
   */
  name: string;

  /**
   * 用户性别（0男 1女 2未知）
   */
  sex: string;

  /**
   * 关系
   */
  relation: string;

  /**
   * 出生日期
   */
  birthday: string;

  /**
   * 联系电话
   */
  phone: string;
}

export interface PersonnelStaffFamilyForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 姓名
   */
  name?: string;

  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;

  /**
   * 关系
   */
  relation?: string;

  /**
   * 出生日期
   */
  birthday?: string;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;
}

export interface PersonnelStaffFamilyQuery extends PageQuery {
  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
