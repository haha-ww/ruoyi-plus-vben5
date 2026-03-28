import type { PageQuery, BaseEntity } from '#/api/common';

export interface MaterialOutboundOrderVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 领料出库单号
   */
  outboundOrderCode: string;

  /**
   * 领料人
   */
  picker: number;

  /**
   * 领料部门
   */
  deptId: string | number;

  /**
   * 出库日期
   */
  outboundDate: string;

  /**
   * 是否出库（0否 1是）
   */
  status: number;

  /**
   * 备注
   */
  remark: string;

}

export interface MaterialOutboundOrderForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 领料出库单号
   */
  outboundOrderCode?: string;

  /**
   * 领料人
   */
  picker?: number;

  /**
   * 领料部门
   */
  deptId?: string | number;

  /**
   * 出库日期
   */
  outboundDate?: string;

  /**
   * 是否出库（0否 1是）
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface MaterialOutboundOrderQuery extends PageQuery {
  /**
   * 领料出库单号
   */
  outboundOrderCode?: string;

  /**
   * 领料人
   */
  picker?: number;

  /**
   * 领料部门
   */
  deptId?: string | number;

  /**
   * 出库日期
   */
  outboundDate?: string;

  /**
   * 是否出库（0否 1是）
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
