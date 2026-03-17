import type { PageQuery } from '#/api/common';

export interface AttendanceStatisticsVO {
  /**
   * 考勤时间
   */
  attendanceTime: string;

  /**
   * 姓名
   */
  name: string;

  /**
   * 部门名称
   */
  deptName: number | string;

  /**
   * 应出勤天数
   */
  requiredWorkDays: string;
}

export interface AttendanceStatisticsQuery extends PageQuery {
  /**
   * 考勤组ID
   */
  groupId?: number | string;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   * 考勤时间
   */
  date?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
