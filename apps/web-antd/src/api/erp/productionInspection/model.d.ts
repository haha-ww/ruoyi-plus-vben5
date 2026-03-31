import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionInspectionVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 质检单编码
   */
  inspectionCode: string;

  /**
   * 业务类型
   */
  businessType: string;

  /**
   * 质检部门id
   */
  deptId: string | number;

  /**
   * 质检员id
   */
  inspectorId: string | number;

  /**
   * 单据日期
   */
  documentDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductionInspectionForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 质检单编码
   */
  inspectionCode?: string;

  /**
   * 业务类型
   */
  businessType?: string;

  /**
   * 质检部门id
   */
  deptId?: string | number;

  /**
   * 质检员id
   */
  inspectorId?: string | number;

  /**
   * 单据日期
   */
  documentDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductionInspectionQuery extends PageQuery {
  /**
   * 质检单编码
   */
  inspectionCode?: string;

  /**
   * 业务类型
   */
  businessType?: string;

  /**
   * 质检部门id
   */
  deptId?: string | number;

  /**
   * 质检员id
   */
  inspectorId?: string | number;

  /**
   * 单据日期
   */
  documentDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
