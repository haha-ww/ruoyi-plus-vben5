import type { BaseEntity, PageQuery } from '#/api/common';


export interface SalesOrderVO {
  /**
   * 主键ID
   */
  id: number | string;

  /**
   * 销售订单编码
   */
  orderCode: string;

  /**
   * 客户名称id
   */
  customerId: number | string;

  /**
   * 订单状态(字典 order_status)
   */
  orderStatus: number;

  /**
   * 部门id
   */
  deptId: number | string;

  /**
   * 销售人员
   */
  salesPersonId: number | string;

  /**
   * 订单来源
   */
  orderSource: string;

  /**
   * 是否开票(字典 sys_yes_no)
   */
  isInvoice: string;

  /**
   * 票据类型(字典 voucher_type)
   */
  voucherType: number;

  /**
   * 税率
   */
  taxRate: number;

  /**
   * 总含税金额
   */
  totalTaxAmount: number;

  /**
   * 折扣率
   */
  discountRate: number;

  /**
   * 总折扣金额
   */
  totalDiscountAmount: number;

  /**
   * 优惠（抹零）金额
   */
  favourableAmount: number;

  /**
   * 不含税金额
   */
  netAmount: number;

  /**
   * 订单总金额
   */
  orderTotalAmount: number;

  /**
   * 交货地址
   */
  deliveryAddress: string;

  /**
   * 订单备注
   */
  orderRemark: string;

  /**
   * 交付日期
   */
  deliveryDate: string;

  /**
   * 结算方式(字典 settlement_type)
   */
  settlementMethod: number;

  /**
   * 结算账户id
   */
  bankAccountId: number | string;

  /**
   * 结算账户账号
   */
  settlementAccountNumber: string;

  /**
   * 预收金额
   */
  prepaymentAmount: number;

  /**
   * 尾款金额
   */
  finalPaymentAmount: number;

  /**
   * 运费金额
   */
  shippingFeeAmount: number;

  /**
   * 运费承担方(字典 freight_bearer)
   */
  shippingFeeBearer: number;

  /**
   * 是否进行mrp（0否1是）
   */
  isMrp: number;

  /**
   * 审批人
   */
  approver: number;

  /**
   * 审批时间
   */
  approvalTime: string;

  /**
   * 销售订单明细列表
   */
  salesOrderItemList?: SalesOrderItemVO[];
}

export interface SalesOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: number | string;

  /**
   * 销售订单编码
   */
  orderCode?: string;

  /**
   * 客户名称id
   */
  customerId?: number | string;

  /**
   * 订单状态(字典 order_status)
   */
  orderStatus?: number;

  /**
   * 部门id
   */
  deptId?: number | string;

  /**
   * 销售人员
   */
  salesPersonId?: number | string;

  /**
   * 订单来源
   */
  orderSource?: string;

  /**
   * 是否开票(字典 sys_yes_no)
   */
  isInvoice?: string;

  /**
   * 票据类型(字典 voucher_type)
   */
  voucherType?: number;

  /**
   * 税率
   */
  taxRate?: number;

  /**
   * 总含税金额
   */
  totalTaxAmount?: number;

  /**
   * 折扣率
   */
  discountRate?: number;

  /**
   * 总折扣金额
   */
  totalDiscountAmount?: number;

  /**
   * 优惠（抹零）金额
   */
  favourableAmount?: number;

  /**
   * 不含税金额
   */
  netAmount?: number;

  /**
   * 订单总金额
   */
  orderTotalAmount?: number;

  /**
   * 交货地址
   */
  deliveryAddress?: string;

  /**
   * 订单备注
   */
  orderRemark?: string;

  /**
   * 交付日期
   */
  deliveryDate?: string;

  /**
   * 结算方式(字典 settlement_type)
   */
  settlementMethod?: number;

  /**
   * 结算账户id
   */
  bankAccountId?: number | string;

  /**
   * 结算账户账号
   */
  settlementAccountNumber?: string;

  /**
   * 预收金额
   */
  prepaymentAmount?: number;

  /**
   * 尾款金额
   */
  finalPaymentAmount?: number;

  /**
   * 运费金额
   */
  shippingFeeAmount?: number;

  /**
   * 运费承担方(字典 freight_bearer)
   */
  shippingFeeBearer?: number;

  /**
   * 是否进行mrp（0否1是）
   */
  isMrp?: number;

  /**
   * 审批人
   */
  approver?: number;

  /**
   * 审批时间
   */
  approvalTime?: string;

  /**
   * 销售订单明细列表
   */
  salesOrderItemList?: SalesOrderItemVO[];
}

export interface SalesOrderQuery extends PageQuery {
  /**
   * 销售订单编码
   */
  orderCode?: string;

  /**
   * 客户名称id
   */
  customerId?: number | string;

  /**
   * 订单状态(字典 order_status)
   */
  orderStatus?: number;

  /**
   * 部门id
   */
  deptId?: number | string;

  /**
   * 销售人员
   */
  salesPersonId?: number | string;

  /**
   * 订单来源
   */
  orderSource?: string;

  /**
   * 是否开票(字典 sys_yes_no)
   */
  isInvoice?: string;

  /**
   * 票据类型(字典 voucher_type)
   */
  voucherType?: number;

  /**
   * 税率
   */
  taxRate?: number;

  /**
   * 总含税金额
   */
  totalTaxAmount?: number;

  /**
   * 折扣率
   */
  discountRate?: number;

  /**
   * 总折扣金额
   */
  totalDiscountAmount?: number;

  /**
   * 优惠（抹零）金额
   */
  favourableAmount?: number;

  /**
   * 不含税金额
   */
  netAmount?: number;

  /**
   * 订单总金额
   */
  orderTotalAmount?: number;

  /**
   * 交货地址
   */
  deliveryAddress?: string;

  /**
   * 订单备注
   */
  orderRemark?: string;

  /**
   * 交付日期
   */
  deliveryDate?: string;

  /**
   * 结算方式(字典 settlement_type)
   */
  settlementMethod?: number;

  /**
   * 结算账户id
   */
  bankAccountId?: number | string;

  /**
   * 结算账户账号
   */
  settlementAccountNumber?: string;

  /**
   * 预收金额
   */
  prepaymentAmount?: number;

  /**
   * 尾款金额
   */
  finalPaymentAmount?: number;

  /**
   * 运费金额
   */
  shippingFeeAmount?: number;

  /**
   * 运费承担方(字典 freight_bearer)
   */
  shippingFeeBearer?: number;

  /**
   * 是否进行mrp（0否1是）
   */
  isMrp?: number;

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
export interface SalesOrderStepVo {
  /**
     * 单据类型标识（sales_order/production_plan/production_order/production_inbound/sales_outbound）
     */
  docType:  string;
  /**
     * 单据类型名称（销售订单/计划与MRP/生产制造工单/下线完工入库/销售出库物流）
     */
  docTypeName: string;
  /**
     * 单据编码（关联单据的主单据号）
     */
  docCode?: string;
  /**
     * 总数量（关联单据数）
     */
  totalCount: number;
  /**
     * 百分比（总数量/销售订单明细数 * 100）
     */
  percentage: number;
  /**
     * 状态文本（待处理、进行中、已完成）
     */
  statusText: string;
}
