import type { PageQuery, BaseEntity } from '#/api/common';

export interface CrmInvoiceVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 发票流水号
   */
  serialNumber: string;

  /**
   * 客户ID
   */
  customerId: string | number;

  /**
   * 合同ID
   */
  contractId: string | number;

  /**
   * 发票类目ID
   */
  categoryId: string | number;

  /**
   * 发票名称
   */
  name: string;

  /**
   * 发票编号
   */
  num: string;

  /**
   * 合同金额
   */
  price: number;

  /**
   * 发票金额
   */
  amount: number;

  /**
   * 发票类型
   */
  types: number;

  /**
   * 发票抬头
   */
  title: string;

  /**
   * 纳税人识别号
   */
  ident: string | number;

  /**
   * 开户行
   */
  bank: string;

  /**
   * 开户账号
   */
  account: string;

  /**
   * 开票地址
   */
  address: string;

  /**
   * 电话
   */
  tel: string;

  /**
   * 邮寄联系人
   */
  collectName: string;

  /**
   * 邮寄联系电话
   */
  collectTel: string;

  /**
   * 邮寄方式
   */
  collectType: string;

  /**
   * 邮寄邮箱
   */
  collectEmail: string;

  /**
   * 邮寄地址
   */
  mailAddress: string;

  /**
   * 开票方式
   */
  invoiceType: string;

  /**
   * 开票地址
   */
  invoiceAddress: string;

  /**
   * 发票状态 -1：开票撤回；0：待开票；1：已开票；2:已拒绝；3：申请作废；4:同意作废；5：拒绝作废；6：作废撤回；
   */
  status: number;

  /**
   * 作废状态: 0，默认；-1，撤回；1，待审核；2，审核通过；3，审核未通过
   */
  invalid: string | number;

  /**
   * 开票日期
   */
  billDate: string;

  /**
   * 实际开票日期
   */
  realDate: string;

  /**
   * 备注内容
   */
  mark: string;

  /**
   * 开票备注
   */
  remark: string;

  /**
   * 业务员备注
   */
  cardRemark: string;

  /**
   * 财务备注
   */
  financeRemark: string;

  /**
   * 关联审批ID
   */
  linkId: string | number;

  /**
   * 撤销申请ID
   */
  revokeId: string | number;

  /**
   * 关联付款单ID
   */
  linkBill: string;

}

export interface CrmInvoiceForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 发票流水号
   */
  serialNumber?: string;

  /**
   * 客户ID
   */
  customerId?: string | number;

  /**
   * 合同ID
   */
  contractId?: string | number;

  /**
   * 发票类目ID
   */
  categoryId?: string | number;

  /**
   * 发票名称
   */
  name?: string;

  /**
   * 发票编号
   */
  num?: string;

  /**
   * 合同金额
   */
  price?: number;

  /**
   * 发票金额
   */
  amount?: number;

  /**
   * 发票类型
   */
  types?: number;

  /**
   * 发票抬头
   */
  title?: string;

  /**
   * 纳税人识别号
   */
  ident?: string | number;

  /**
   * 开户行
   */
  bank?: string;

  /**
   * 开户账号
   */
  account?: string;

  /**
   * 开票地址
   */
  address?: string;

  /**
   * 电话
   */
  tel?: string;

  /**
   * 邮寄联系人
   */
  collectName?: string;

  /**
   * 邮寄联系电话
   */
  collectTel?: string;

  /**
   * 邮寄方式
   */
  collectType?: string;

  /**
   * 邮寄邮箱
   */
  collectEmail?: string;

  /**
   * 邮寄地址
   */
  mailAddress?: string;

  /**
   * 开票方式
   */
  invoiceType?: string;

  /**
   * 开票地址
   */
  invoiceAddress?: string;

  /**
   * 发票状态 -1：开票撤回；0：待开票；1：已开票；2:已拒绝；3：申请作废；4:同意作废；5：拒绝作废；6：作废撤回；
   */
  status?: number;

  /**
   * 作废状态: 0，默认；-1，撤回；1，待审核；2，审核通过；3，审核未通过
   */
  invalid?: string | number;

  /**
   * 开票日期
   */
  billDate?: string;

  /**
   * 实际开票日期
   */
  realDate?: string;

  /**
   * 备注内容
   */
  mark?: string;

  /**
   * 开票备注
   */
  remark?: string;

  /**
   * 业务员备注
   */
  cardRemark?: string;

  /**
   * 财务备注
   */
  financeRemark?: string;

  /**
   * 关联审批ID
   */
  linkId?: string | number;

  /**
   * 撤销申请ID
   */
  revokeId?: string | number;

  /**
   * 关联付款单ID
   */
  linkBill?: string;

}

export interface CrmInvoiceQuery extends PageQuery {
  /**
   * 发票流水号
   */
  serialNumber?: string;

  /**
   * 客户ID
   */
  customerId?: string | number;

  /**
   * 合同ID
   */
  contractId?: string | number;

  /**
   * 发票类目ID
   */
  categoryId?: string | number;

  /**
   * 发票名称
   */
  name?: string;

  /**
   * 发票编号
   */
  num?: string;

  /**
   * 合同金额
   */
  price?: number;

  /**
   * 发票金额
   */
  amount?: number;

  /**
   * 发票类型
   */
  types?: number;

  /**
   * 发票抬头
   */
  title?: string;

  /**
   * 纳税人识别号
   */
  ident?: string | number;

  /**
   * 开户行
   */
  bank?: string;

  /**
   * 开户账号
   */
  account?: string;

  /**
   * 开票地址
   */
  address?: string;

  /**
   * 电话
   */
  tel?: string;

  /**
   * 邮寄联系人
   */
  collectName?: string;

  /**
   * 邮寄联系电话
   */
  collectTel?: string;

  /**
   * 邮寄方式
   */
  collectType?: string;

  /**
   * 邮寄邮箱
   */
  collectEmail?: string;

  /**
   * 邮寄地址
   */
  mailAddress?: string;

  /**
   * 开票方式
   */
  invoiceType?: string;

  /**
   * 开票地址
   */
  invoiceAddress?: string;

  /**
   * 发票状态 -1：开票撤回；0：待开票；1：已开票；2:已拒绝；3：申请作废；4:同意作废；5：拒绝作废；6：作废撤回；
   */
  status?: number;

  /**
   * 作废状态: 0，默认；-1，撤回；1，待审核；2，审核通过；3，审核未通过
   */
  invalid?: string | number;

  /**
   * 开票日期
   */
  billDate?: string;

  /**
   * 实际开票日期
   */
  realDate?: string;

  /**
   * 备注内容
   */
  mark?: string;

  /**
   * 业务员备注
   */
  cardRemark?: string;

  /**
   * 财务备注
   */
  financeRemark?: string;

  /**
   * 关联审批ID
   */
  linkId?: string | number;

  /**
   * 撤销申请ID
   */
  revokeId?: string | number;

  /**
   * 关联付款单ID
   */
  linkBill?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
