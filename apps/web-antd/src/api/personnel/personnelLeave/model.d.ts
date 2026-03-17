import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelLeaveVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 员工id
   */
  staffId: number | string;

  /**
   * 请假类型
   */
  leaveType: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

  /**
   * 请假时长（小时）
   */
  leaveLength: number;

  /**
   * 审核状态
   */
  auditStatus: string;

  /**
   * 请假原因
   */
  reason: string;
}

export interface PersonnelLeaveForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 员工id
   */
  staffId?: number | string;

  staffName?: string;
  /**
   * 请假类型
   */
  leaveType?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 请假时长（小时）
   */
  leaveLength?: number;

  /**
   * 审核状态
   */
  auditStatus?: string;

  /**
   * 请假原因
   */
  reason?: string;
}

export interface PersonnelLeaveQuery extends PageQuery {
  /**
   * 员工id
   */
  staffId?: number | string;

  /**
   * 请假类型
   */
  leaveType?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 请假时长（小时）
   */
  leaveLength?: number;

  /**
   * 审核状态
   */
  auditStatus?: string;

  /**
   * 请假原因
   */
  reason?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
