import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionPlanVO {
  /**
   * 主生产计划ID
   */
  id: string | number;

  /**
   * 计划单号
   */
  planCode: string;

  /**
   * 计划日期
   */
  planDate: string;

  /**
   * 计划开始日期
   */
  planStartDate: string;

  /**
   * 计划结束日期
   */
  planEndDate: string;

  /**
   * 状态
   */
  status: number;

  /**
   * 审核时间
   */
  auditTime: string;

  /**
   * 审核人
   */
  auditUserId: string | number;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductionPlanForm extends BaseEntity {
  /**
   * 主生产计划ID
   */
  id?: string | number;

  /**
   * 计划单号
   */
  planCode?: string;

  /**
   * 计划日期
   */
  planDate?: string;

  /**
   * 计划开始日期
   */
  planStartDate?: string;

  /**
   * 计划结束日期
   */
  planEndDate?: string;

  /**
   * 状态
   */
  status?: number;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 审核人
   */
  auditUserId?: string | number;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductionPlanQuery extends PageQuery {
  /**
   * 计划单号
   */
  planCode?: string;

  /**
   * 计划日期
   */
  planDate?: string;

  /**
   * 计划开始日期
   */
  planStartDate?: string;

  /**
   * 计划结束日期
   */
  planEndDate?: string;

  /**
   * 状态
   */
  status?: number;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 审核人
   */
  auditUserId?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
