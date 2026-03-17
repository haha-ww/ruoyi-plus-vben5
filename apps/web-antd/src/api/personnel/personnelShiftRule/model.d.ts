import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelShiftRuleVO {
  /**
   * 自增ID
   */
  id: number | string;

  /**
   * 班次表ID
   */
  shiftId: number | string;

  /**
   * 上班当日次数 0、当日；1、次日；
   */
  firstDayAfter: number;

  /**
   * 下班当日次数 0、当日；1、次日；
   */
  secondDayAfter: number;

  /**
   * 上班时间
   */
  workHours: string;

  /**
   * 迟到
   */
  late: number;

  /**
   * 严重迟到
   */
  extremeLate: number;

  /**
   * 晚到缺卡
   */
  lateLackCard: number;

  /**
   * 提前打卡
   */
  earlyCard: number;

  /**
   * 下班时间
   */
  offHours: string;

  /**
   * 早退
   */
  earlyLeave: number;

  /**
   * 提前缺卡
   */
  earlyLackCard: number;

  /**
   * 延后打卡
   */
  delayCard: number;
}

export interface PersonnelShiftRuleForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: number | string;

  /**
   * 班次表ID
   */
  shiftId?: number | string;

  /**
   * 次数 1、1次上下班；2、2次上下班；
   */
  number?: number;

  /**
   * 上班当日次数 0、当日；1、次日；
   */
  firstDayAfter?: number;

  /**
   * 下班当日次数 0、当日；1、次日；
   */
  secondDayAfter?: number;

  /**
   * 上班时间
   */
  workHours?: string;

  /**
   * 迟到
   */
  late?: number;

  /**
   * 严重迟到
   */
  extremeLate?: number;

  /**
   * 晚到缺卡
   */
  lateLackCard?: number;

  /**
   * 提前打卡
   */
  earlyCard?: number;

  /**
   * 下班时间
   */
  offHours?: string;

  /**
   * 早退
   */
  earlyLeave?: number;

  /**
   * 提前缺卡
   */
  earlyLackCard?: number;

  /**
   * 延后打卡
   */
  delayCard?: number;
}

export interface PersonnelShiftRuleQuery extends PageQuery {
  /**
   * 日期范围参数
   */
  params?: any;
}
