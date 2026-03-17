import type { PageQuery, BaseEntity } from '#/api/common';

export interface CrmBillVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 客户ID
   */
  customerId: string | number;

  /**
   * 合同ID
   */
  contractId: string | number;

  /**
   * 财务科目
   */
  billCateId: string | number;

  /**
   * 类型:1,支出;2,收入
   */
  billTypes: number;

  /**
   * 发票ID
   */
  invoiceId: string | number;

  /**
   * 金额
   */
  num: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 支付方式ID
   */
  typeId: string | number;

  /**
   * 支付方式名称
   */
  payType: string;

  /**
   * 收款日期
   */
  date: string;

  /**
   * 续费结束日期
   */
  endDate: string;

  /**
   * 付款单号
   */
  billNo: string;

  /**
   * 关联申请审批ID
   */
  applyId: string | number;

  /**
   * 类型：1，待审核；2，已通过；3，未通过
   */
  status: number;

  /**
   * 失败原因
   */
  failMsg: string;

}

export interface CrmBillForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 客户ID
   */
  customerId?: string | number;

  /**
   * 合同ID
   */
  contractId?: string | number;

  /**
   * 财务科目
   */
  billCateId?: string | number;

  /**
   * 类型:1,支出;2,收入
   */
  billTypes?: number;

  /**
   * 发票ID
   */
  invoiceId?: string | number;

  /**
   * 金额
   */
  num?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 支付方式ID
   */
  typeId?: string | number;

  /**
   * 支付方式名称
   */
  payType?: string;

  /**
   * 收款日期
   */
  date?: string;

  /**
   * 续费结束日期
   */
  endDate?: string;

  /**
   * 付款单号
   */
  billNo?: string;

  /**
   * 关联申请审批ID
   */
  applyId?: string | number;

  /**
   * 类型：1，待审核；2，已通过；3，未通过
   */
  status?: number;

  /**
   * 失败原因
   */
  failMsg?: string;

}

export interface CrmBillQuery extends PageQuery {
  /**
   * 客户ID
   */
  customerId?: string | number;

  /**
   * 合同ID
   */
  contractId?: string | number;

  /**
   * 财务科目
   */
  billCateId?: string | number;

  /**
   * 类型:1,支出;2,收入
   */
  billTypes?: number;

  /**
   * 发票ID
   */
  invoiceId?: string | number;

  /**
   * 金额
   */
  num?: number;

  /**
   * 支付方式ID
   */
  typeId?: string | number;

  /**
   * 支付方式名称
   */
  payType?: string;

  /**
   * 收款日期
   */
  date?: string;

  /**
   * 续费结束日期
   */
  endDate?: string;

  /**
   * 付款单号
   */
  billNo?: string;

  /**
   * 关联申请审批ID
   */
  applyId?: string | number;

  /**
   * 类型：1，待审核；2，已通过；3，未通过
   */
  status?: number;

  /**
   * 失败原因
   */
  failMsg?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
