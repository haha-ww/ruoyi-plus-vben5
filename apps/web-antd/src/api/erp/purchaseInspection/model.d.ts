import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseInspectionVO {
  /**
   * 自增主键
   */
  id: string | number;

  /**
   * 质检单编码
   */
  inspectionCode: string;

  /**
   * 类型
   */
  businessType: string;

  /**
   * 采购订单id
   */
  purchaseOrderId: string | number;

  /**
   * 采购订单编码
   */
  purchaseOrderNo: string;

  /**
   * 质检部门id
   */
  deptId: string | number;

  /**
   * 质检员id
   */
  inspectorId: string | number;

  /**
   * 单据日期
   */
  documentDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface PurchaseInspectionForm extends BaseEntity {
  /**
   * 自增主键
   */
  id?: string | number;

  /**
   * 质检单编码
   */
  inspectionCode?: string;

  /**
   * 类型
   */
  businessType?: string;

  /**
   * 采购订单id
   */
  purchaseOrderId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseOrderNo?: string;

  /**
   * 质检部门id
   */
  deptId?: string | number;

  /**
   * 质检员id
   */
  inspectorId?: string | number;

  /**
   * 单据日期
   */
  documentDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface PurchaseInspectionQuery extends PageQuery {
  /**
   * 质检单编码
   */
  inspectionCode?: string;

  /**
   * 类型
   */
  businessType?: string;

  /**
   * 采购订单id
   */
  purchaseOrderId?: string | number;

  /**
   * 采购订单编码
   */
  purchaseOrderNo?: string;

  /**
   * 质检部门id
   */
  deptId?: string | number;

  /**
   * 质检员id
   */
  inspectorId?: string | number;

  /**
   * 单据日期
   */
  documentDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
