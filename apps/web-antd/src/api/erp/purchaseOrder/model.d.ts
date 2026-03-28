import type { PageQuery, BaseEntity } from '#/api/common';

export interface PurchaseOrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode: string;

  /**
   * 供应商id
   */
  supplierId: string | number;

  /**
   * 采购类型(字典 purchase_type)
   */
  purchaseType: number;

  /**
   * 部门id
   */
  deptId: string | number;

  /**
   * 业务员id
   */
  salesperson: number;

  /**
   * 订单状态（字典 purchase_order_status）
   */
  orderStatus: number;

  /**
   * 是否开票(字典 sys_yes_no)
   */
  isInvoice: string;

  /**
   * 要求到货日期
   */
  requiredDeliveryDate: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 结算方式（字典 purchase_settlement_method）
   */
  settlementMethod: number;

  /**
   * 预付金额
   */
  prepaymentAmount: number;

  /**
   * 币种（字典 currency_type）
   */
  currency: number;

  /**
   * 结算账户id
   */
  bankAccountId: string | number;

  /**
   * 订单总金额
   */
  orderTotalAmount: number;

  /**
   * 总含税金额
   */
  totalTaxAmount: number;

  /**
   * 优惠金额
   */
  discountAmount: number;

  /**
   * 结算账户账号
   */
  settlementAccountNumber: string;

  /**
   * 审批人
   */
  approver: number;

  /**
   * 审批时间
   */
  approvalTime: string;

}

export interface PurchaseOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 采购订单编码
   */
  purchaseCode?: string;

  /**
   * 供应商id
   */
  supplierId?: string | number;

  /**
   * 采购类型(字典 purchase_type)
   */
  purchaseType?: number;

  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 业务员id
   */
  salesperson?: number;

  /**
   * 订单状态（字典 purchase_order_status）
   */
  orderStatus?: number;

  /**
   * 是否开票(字典 sys_yes_no)
   */
  isInvoice?: string;

  /**
   * 要求到货日期
   */
  requiredDeliveryDate?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 结算方式（字典 purchase_settlement_method）
   */
  settlementMethod?: number;

  /**
   * 预付金额
   */
  prepaymentAmount?: number;

  /**
   * 币种（字典 currency_type）
   */
  currency?: number;

  /**
   * 结算账户id
   */
  bankAccountId?: string | number;

  /**
   * 订单总金额
   */
  orderTotalAmount?: number;

  /**
   * 总含税金额
   */
  totalTaxAmount?: number;

  /**
   * 优惠金额
   */
  discountAmount?: number;

  /**
   * 结算账户账号
   */
  settlementAccountNumber?: string;

  /**
   * 审批人
   */
  approver?: number;

  /**
   * 审批时间
   */
  approvalTime?: string;

}

export interface PurchaseOrderQuery extends PageQuery {
  /**
   * 采购订单编码
   */
  purchaseCode?: string;

  /**
   * 供应商id
   */
  supplierId?: string | number;

  /**
   * 采购类型(字典 purchase_type)
   */
  purchaseType?: number;

  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 业务员id
   */
  salesperson?: number;

  /**
   * 订单状态（字典 purchase_order_status）
   */
  orderStatus?: number;

  /**
   * 是否开票(字典 sys_yes_no)
   */
  isInvoice?: string;

  /**
   * 要求到货日期
   */
  requiredDeliveryDate?: string;

  /**
   * 结算方式（字典 purchase_settlement_method）
   */
  settlementMethod?: number;

  /**
   * 预付金额
   */
  prepaymentAmount?: number;

  /**
   * 币种（字典 currency_type）
   */
  currency?: number;

  /**
   * 结算账户id
   */
  bankAccountId?: string | number;

  /**
   * 订单总金额
   */
  orderTotalAmount?: number;

  /**
   * 总含税金额
   */
  totalTaxAmount?: number;

  /**
   * 优惠金额
   */
  discountAmount?: number;

  /**
   * 结算账户账号
   */
  settlementAccountNumber?: string;

  /**
   * 审批人
   */
  approver?: number;

  /**
   * 审批时间
   */
  approvalTime?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
