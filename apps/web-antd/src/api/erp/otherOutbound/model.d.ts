import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtherOutboundVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 其他出库单编号
   */
  outboundCode: string;

  /**
   * 业务类型（字典 other_outbound_type）
   */
  businessType: number;

  /**
   * 单据日期
   */
  outboundDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OtherOutboundForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 其他出库单编号
   */
  outboundCode?: string;

  /**
   * 业务类型（字典 other_outbound_type）
   */
  businessType?: number;

  /**
   * 单据日期
   */
  outboundDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OtherOutboundQuery extends PageQuery {
  /**
   * 其他出库单编号
   */
  outboundCode?: string;

  /**
   * 业务类型（字典 other_outbound_type）
   */
  businessType?: number;

  /**
   * 单据日期
   */
  outboundDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
