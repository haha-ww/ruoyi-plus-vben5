import type { PageQuery, BaseEntity } from '#/api/common';

export interface MaterialBomVO {
  /**
   * 
   */
  id: string | number;

  /**
   * bom名称
   */
  bomName: string;

  /**
   * bom编码
   */
  bomCode: string;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 状态（字典 form_status）
   */
  status: number;

  /**
   * bom类型(字典 bom_type)
   */
  bomType: string;

  /**
   * 生效日期
   */
  effectiveDate: string;

  /**
   * 失效日期
   */
  expiryDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface MaterialBomForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * bom名称
   */
  bomName?: string;

  /**
   * bom编码
   */
  bomCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 状态（字典 form_status）
   */
  status?: number;

  /**
   * bom类型(字典 bom_type)
   */
  bomType?: string;

  /**
   * 生效日期
   */
  effectiveDate?: string;

  /**
   * 失效日期
   */
  expiryDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface MaterialBomQuery extends PageQuery {
  /**
   * bom名称
   */
  bomName?: string;

  /**
   * bom编码
   */
  bomCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 状态（字典 form_status）
   */
  status?: number;

  /**
   * bom类型(字典 bom_type)
   */
  bomType?: string;

  /**
   * 生效日期
   */
  effectiveDate?: string;

  /**
   * 失效日期
   */
  expiryDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
