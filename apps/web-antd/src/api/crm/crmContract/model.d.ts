import type { PageQuery, BaseEntity } from '#/api/common';

export interface CrmContractVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 客户ID
   */
  customerId: string | number;

  /**
   * 合同名称
   */
  contractName: string;

  /**
   * 订单编号
   */
  contractNo: string;

  /**
   * 合同金额(元)
   */
  contractPrice: number;

  /**
   * 回款金额
   */
  received: number;

  /**
   * 尾款金额
   */
  surplus: number;

  /**
   * 是否关注
   */
  contractFollowed: string;

  /**
   * 合同状态
   */
  contractStatus: string;

  /**
   * 开始时间
   */
  startDate: string;

  /**
   * 结束时间
   */
  endDate: string;

  /**
   * 签约状态
   */
  signingStatus: number;

  /**
   * 合同分类
   */
  contractCategory: number;

  /**
   * 是否异常：1、是；0、否；
   */
  isAbnormal: number;

  /**
   * 备注
   */
  remark: string;

}

export interface CrmContractForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 客户ID
   */
  customerId?: string | number;

  /**
   * 合同名称
   */
  contractName?: string;

  /**
   * 订单编号
   */
  contractNo?: string;

  /**
   * 合同金额(元)
   */
  contractPrice?: number;

  /**
   * 回款金额
   */
  received?: number;

  /**
   * 尾款金额
   */
  surplus?: number;

  /**
   * 是否关注
   */
  contractFollowed?: string;

  /**
   * 合同状态
   */
  contractStatus?: string;

  /**
   * 开始时间
   */
  startDate?: string;

  /**
   * 结束时间
   */
  endDate?: string;

  /**
   * 签约状态
   */
  signingStatus?: number;

  /**
   * 合同分类
   */
  contractCategory?: number;

  /**
   * 是否异常：1、是；0、否；
   */
  isAbnormal?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface CrmContractQuery extends PageQuery {
  /**
   * 客户ID
   */
  customerId?: string | number;

  /**
   * 合同名称
   */
  contractName?: string;

  /**
   * 订单编号
   */
  contractNo?: string;

  /**
   * 合同金额(元)
   */
  contractPrice?: number;

  /**
   * 回款金额
   */
  received?: number;

  /**
   * 尾款金额
   */
  surplus?: number;

  /**
   * 是否关注
   */
  contractFollowed?: string;

  /**
   * 合同状态
   */
  contractStatus?: string;

  /**
   * 开始时间
   */
  startDate?: string;

  /**
   * 结束时间
   */
  endDate?: string;

  /**
   * 签约状态
   */
  signingStatus?: number;

  /**
   * 合同分类
   */
  contractCategory?: number;

  /**
   * 是否异常：1、是；0、否；
   */
  isAbnormal?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
