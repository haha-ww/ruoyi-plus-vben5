import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffMaterialVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 文件名称
   */
  fileName: string;

  /**
   * ossId
   */
  ossId: number | string;
}

export interface PersonnelStaffMaterialForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 文件名称
   */
  fileName?: string;

  /**
   * ossId
   */
  ossId?: number | string;

  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;
}

export interface PersonnelStaffMaterialQuery extends PageQuery {
  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
