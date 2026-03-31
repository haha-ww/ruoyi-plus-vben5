import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchasePlanVO {
  /**
   * 主键
   */
  id: string | number;

  /**
   * 采购计划编码
   */
  planCode: string;

  /**
   * 销售订单id
   */
  salesOrderId: string | number;

  /**
   * 销售订单编码
   */
  salesOrderCode: string;

  /**
   * 日期
   */
  planDate: string;

  /**
   * 采购计划状态（字典 purchase_plan_status）
   */
  status: number;

  /**
   * 备注
   */
  remark: string;

}

export interface PurchasePlanForm extends BaseEntity {
  /**
   * 主键
   */
  id?: string | number;

  /**
   * 采购计划编码
   */
  planCode?: string;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 销售订单编码
   */
  salesOrderCode?: string;

  /**
   * 日期
   */
  planDate?: string;

  /**
   * 采购计划状态（字典 purchase_plan_status）
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface PurchasePlanQuery extends PageQuery {
  /**
   * 采购计划编码
   */
  planCode?: string;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 销售订单编码
   */
  salesOrderCode?: string;

  /**
   * 日期
   */
  planDate?: string;

  /**
   * 采购计划状态（字典 purchase_plan_status）
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
