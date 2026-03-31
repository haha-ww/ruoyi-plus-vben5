import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtherInboundVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 其他入库单编号
   */
  inboundCode: string;

  /**
   * 业务类型（字典 other_inbound_type）
   */
  businessType: number;

  /**
   * 单据日期
   */
  inboundDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OtherInboundForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 其他入库单编号
   */
  inboundCode?: string;

  /**
   * 业务类型（字典 other_inbound_type）
   */
  businessType?: number;

  /**
   * 单据日期
   */
  inboundDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OtherInboundQuery extends PageQuery {
  /**
   * 其他入库单编号
   */
  inboundCode?: string;

  /**
   * 业务类型（字典 other_inbound_type）
   */
  businessType?: number;

  /**
   * 单据日期
   */
  inboundDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
