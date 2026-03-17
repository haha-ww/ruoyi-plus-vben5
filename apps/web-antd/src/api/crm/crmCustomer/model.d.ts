import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerVO {
  /**
   *
   */
  id: number | string;

  /**
   * 业务员ID
   */
  uid: number | string;

  /**
   * 前业务员ID
   */
  beforeUid: number | string;

  /**
   * 客户名称
   */
  customerName: string;

  /**
   * 客户标签
   */
  customerLabel: string;

  /**
   * 客户编号
   */
  customerNo: string;

  /**
   * 客户来源
   */
  customerWay: string;

  /**
   * 未跟进天数
   */
  unFollowedDays: number;

  /**
   * 已入账金额
   */
  amountRecorded: number;

  /**
   * 已支出+金额
   */
  amountExpend: number;

  /**
   * 已开票金额
   */
  invoicedAmount: number;

  /**
   * 合同数量
   */
  contractNum: number;

  /**
   * 发票数量
   */
  invoiceNum: number;

  /**
   * 附件数量
   */
  attachmentNum: number;

  /**
   * 退回次数
   */
  returnNum: number;

  /**
   * 是否关注(0否，1是)
   */
  customerFollowed: string;

  /**
   * 客户状态
   */
  customerStatus: string;

  /**
   * 省市区
   */
  areaCascade: string;

  /**
   * 客户电话
   */
  customerPhone: string;

  /**
   * 详细地址
   */
  address: string;

  /**
   * 客户附件
   */
  file: string;

  /**
   * 最后跟进时间
   */
  lastFollowUpTime: string;

  /**
   * 领取时间
   */
  collectTime: string;

  /**
   * 备注
   */
  remark: string;
}

export interface CrmCustomerForm extends BaseEntity {
  /**
   *
   */
  id?: number | string;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   * 前业务员ID
   */
  beforeUid?: number | string;

  /**
   * 客户名称
   */
  customerName?: string;

  /**
   * 客户标签
   */
  customerLabel?: string;

  /**
   * 客户编号
   */
  customerNo?: string;

  /**
   * 客户来源
   */
  customerWay?: string;

  /**
   * 未跟进天数
   */
  unFollowedDays?: number;

  /**
   * 已入账金额
   */
  amountRecorded?: number;

  /**
   * 已支出+金额
   */
  amountExpend?: number;

  /**
   * 已开票金额
   */
  invoicedAmount?: number;

  /**
   * 合同数量
   */
  contractNum?: number;

  /**
   * 发票数量
   */
  invoiceNum?: number;

  /**
   * 附件数量
   */
  attachmentNum?: number;

  /**
   * 退回次数
   */
  returnNum?: number;

  /**
   * 是否关注(0否，1是)
   */
  customerFollowed?: string;

  /**
   * 客户状态
   */
  customerStatus?: string;

  /**
   * 省市区
   */
  areaCascade?: string;

  /**
   * 客户电话
   */
  customerPhone?: string;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 客户附件
   */
  file?: string;

  /**
   * 最后跟进时间
   */
  lastFollowUpTime?: string;

  /**
   * 领取时间
   */
  collectTime?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface CrmCustomerQuery extends PageQuery {
  /**
   * 客户名称
   */
  customerName?: string;

  /**
   * 客户标签
   */
  customerLabel?: string;

  /**
   * 客户编号
   */
  customerNo?: string;

  /**
   * 客户来源
   */
  customerWay?: string;

  /**
   * 是否关注(0否，1是)
   */
  customerFollowed?: string;

  /**
   * 客户状态
   */
  customerStatus?: string;

  /**
   * 省市区
   */
  areaCascade?: string;

  /**
   * 客户电话
   */
  customerPhone?: string;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
