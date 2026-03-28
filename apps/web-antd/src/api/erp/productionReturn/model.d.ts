import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionReturnVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 生产退货单编码
   */
  returnCode: string;

  /**
   * 退料部门
   */
  deptId: string | number;

  /**
   * 退料负责人
   */
  returnResponsiblePerson: number;

  /**
   * 退货日期
   */
  returnDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductionReturnForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 生产退货单编码
   */
  returnCode?: string;

  /**
   * 退料部门
   */
  deptId?: string | number;

  /**
   * 退料负责人
   */
  returnResponsiblePerson?: number;

  /**
   * 退货日期
   */
  returnDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductionReturnQuery extends PageQuery {
  /**
   * 生产退货单编码
   */
  returnCode?: string;

  /**
   * 退料部门
   */
  deptId?: string | number;

  /**
   * 退料负责人
   */
  returnResponsiblePerson?: number;

  /**
   * 退货日期
   */
  returnDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
