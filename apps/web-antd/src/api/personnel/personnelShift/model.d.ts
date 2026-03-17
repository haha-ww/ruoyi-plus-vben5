import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelShiftVO {
  /**
   * 自增ID
   */
  id: number | string;

  /**
   * 班次名称
   */
  name: string;

  /**
   * 上下班次数 0、休息；1、1次上下班；2、2次上下班；
   */
  number: number;

  /**
   * 中途休息：1、开启；0、关闭；
   */
  restTime: number;

  /**
   * 休息开始时间
   */
  restStart: string;

  /**
   * 休息结束时间
   */
  restEnd: string;

  /**
   * 休息开始规则 0、当日；1、次日；
   */
  restStartAfter: number;

  /**
   * 休息结束规则 0、当日；1、次日；
   */
  restEndAfter: number;

  /**
   * 加班起算时间
   */
  overtime: number;

  /**
   * 工作时长
   */
  workTime: string;

  /**
   * 备注
   */
  remark: string;
}

export interface PersonnelShiftForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: number | string;

  /**
   * 班次名称
   */
  name?: string;

  /**
   * 上下班次数 0、休息；1、1次上下班；2、2次上下班；
   */
  number?: number;

  /**
   * 中途休息：1、开启；0、关闭；
   */
  restTime?: number;

  /**
   * 休息开始时间
   */
  restStart?: string;

  /**
   * 休息结束时间
   */
  restEnd?: string;

  /**
   * 休息开始规则 0、当日；1、次日；
   */
  restStartAfter?: number;

  /**
   * 休息结束规则 0、当日；1、次日；
   */
  restEndAfter?: number;

  /**
   * 加班起算时间
   */
  overtime?: number;

  /**
   * 工作时长
   */
  workTime?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 规则列表
   */
  rules?: PersonnelShiftRule[];
}

export interface PersonnelShiftQuery extends PageQuery {
  /**
   * 班次名称
   */
  name?: string;

  /**
   * 上下班次数 0、休息；1、1次上下班；2、2次上下班；
   */
  number?: number;

  /**
   * 中途休息：1、开启；0、关闭；
   */
  restTime?: number;

  /**
   * 休息开始时间
   */
  restStart?: string;

  /**
   * 休息结束时间
   */
  restEnd?: string;

  /**
   * 休息开始规则 0、当日；1、次日；
   */
  restStartAfter?: number;

  /**
   * 休息结束规则 0、当日；1、次日；
   */
  restEndAfter?: number;

  /**
   * 加班起算时间
   */
  overtime?: number;

  /**
   * 工作时长
   */
  workTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
