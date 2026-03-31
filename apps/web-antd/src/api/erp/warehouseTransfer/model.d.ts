import type { PageQuery, BaseEntity } from '#/api/common';

export interface WarehouseTransferVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 调拨单编号
   */
  transferCode: string;

  /**
   * 单据日期
   */
  transferDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface WarehouseTransferForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 调拨单编号
   */
  transferCode?: string;

  /**
   * 单据日期
   */
  transferDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface WarehouseTransferQuery extends PageQuery {
  /**
   * 调拨单编号
   */
  transferCode?: string;

  /**
   * 单据日期
   */
  transferDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
