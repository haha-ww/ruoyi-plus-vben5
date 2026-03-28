import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionPlanItemVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 主计划ID
   */
  planId: string | number;

  /**
   * 产品ID
   */
  materialId: string | number;

  /**
   * 计划生产数量
   */
  planQty: number;

  /**
   * 计划开始时间
   */
  planStartTime: string;

  /**
   * 计划结束时间
   */
  planEndTime: string;

  /**
   * 来源类型
   */
  sourceType: string;

  /**
   * 销售订单id
   */
  salesOrderId: string | number;

  /**
   * 状态
   */
  status: number;

}

export interface ProductionPlanItemForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 主计划ID
   */
  planId?: string | number;

  /**
   * 产品ID
   */
  materialId?: string | number;

  /**
   * 计划生产数量
   */
  planQty?: number;

  /**
   * 计划开始时间
   */
  planStartTime?: string;

  /**
   * 计划结束时间
   */
  planEndTime?: string;

  /**
   * 来源类型
   */
  sourceType?: string;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 状态
   */
  status?: number;

}

export interface ProductionPlanItemQuery extends PageQuery {
  /**
   * 主计划ID
   */
  planId?: string | number;

  /**
   * 产品ID
   */
  materialId?: string | number;

  /**
   * 计划生产数量
   */
  planQty?: number;

  /**
   * 计划开始时间
   */
  planStartTime?: string;

  /**
   * 计划结束时间
   */
  planEndTime?: string;

  /**
   * 来源类型
   */
  sourceType?: string;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 状态
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
