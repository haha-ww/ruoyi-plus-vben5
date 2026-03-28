import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionInboundOrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 生产入库单编码
   */
  inboundOrderCode: string;

  /**
   * 入库部门id
   */
  deptId: string | number;

  /**
   * 入库负责人
   */
  inboundResponsiblePerson: number;

  /**
   * 入库日期
   */
  inboundDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductionInboundOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 生产入库单编码
   */
  inboundOrderCode?: string;

  /**
   * 入库部门id
   */
  deptId?: string | number;

  /**
   * 入库负责人
   */
  inboundResponsiblePerson?: number;

  /**
   * 入库日期
   */
  inboundDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductionInboundOrderQuery extends PageQuery {
  /**
   * 生产入库单编码
   */
  inboundOrderCode?: string;

  /**
   * 入库部门id
   */
  deptId?: string | number;

  /**
   * 入库负责人
   */
  inboundResponsiblePerson?: number;

  /**
   * 入库日期
   */
  inboundDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
