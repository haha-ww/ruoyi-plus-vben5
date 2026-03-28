import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchasePlanItemVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 采购计划id
   */
  planId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 计划采购数量
   */
  planQuantity: number;

  /**
   * 剩余数量
   */
  remainQuantity: number;

  /**
   * 备注
   */
  remark: string;

}

export interface PurchasePlanItemForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 采购计划id
   */
  planId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 计划采购数量
   */
  planQuantity?: number;

  /**
   * 剩余数量
   */
  remainQuantity?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface PurchasePlanItemQuery extends PageQuery {
  /**
   * 采购计划id
   */
  planId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 计划采购数量
   */
  planQuantity?: number;

  /**
   * 剩余数量
   */
  remainQuantity?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
