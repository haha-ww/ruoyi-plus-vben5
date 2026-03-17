import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffContractVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 合同名称
   */
  fileName: string;

  /**
   * ossId
   */
  ossId: number | string;

  /**
   * 合同状态(字典contract_status)
   */
  status: number;

  /**
   * 开始日期
   */
  startDate: string;

  /**
   * 结束日期
   */
  endDate: string;
}

export interface PersonnelStaffContractForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 合同名称
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

  /**
   * 合同状态(字典contract_status)
   */
  status?: number;

  /**
   * 开始日期
   */
  startDate?: string;

  /**
   * 结束日期
   */
  endDate?: string;
}

export interface PersonnelStaffContractQuery extends PageQuery {
  /**
   * 工号（w_personnel_staff表）
   */
  jobNumber?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
