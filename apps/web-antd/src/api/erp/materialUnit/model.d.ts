import type { PageQuery, BaseEntity } from '#/api/common';

export interface MaterialUnitVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 单位名称
   */
  unitName: string;

  /**
   * 上级单位id
   */
  parentId: string | number;

  /**
   * 换算系数
   */
  coefficient: number;

  /**
   * 层级组
   */
  levelGroup: string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status: number;

  /**
   * 备注
   */
  remark: string;

}

export interface MaterialUnitForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 单位名称
   */
  unitName?: string;

  /**
   * 上级单位id
   */
  parentId?: string | number;

  /**
   * 换算系数
   */
  coefficient?: number;

  /**
   * 层级组
   */
  levelGroup?: string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface MaterialUnitQuery extends PageQuery {
  /**
   * 单位名称
   */
  unitName?: string;

  /**
   * 上级单位id
   */
  parentId?: string | number;

  /**
   * 换算系数
   */
  coefficient?: number;

  /**
   * 层级组
   */
  levelGroup?: string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
