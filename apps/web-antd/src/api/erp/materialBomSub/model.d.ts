import type { PageQuery, BaseEntity } from '#/api/common';

export interface MaterialBomSubVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 主bomid
   */
  mainBomId: string | number;

  /**
   * 父id
   */
  parentId: string | number;

  /**
   * bomid
   */
  bomId: string | number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * bom版本
   */
  bomVersion: string;

  /**
   * 供应方式(字典 supply_type)
   */
  supplyMode: string;

  /**
   * 用量
   */
  quantity: number;

  /**
   * 基础用量
   */
  basicQuantity: number;

  /**
   * 损耗率 (%)
   */
  scrapRate: number;

  /**
   * 是否为bom节点（0否 1是）
   */
  isBomNode: number;

  /**
   * 备注
   */
  remark: string;

}

export interface MaterialBomSubForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 主bomid
   */
  mainBomId?: string | number;

  /**
   * 父id
   */
  parentId?: string | number;

  /**
   * bomid
   */
  bomId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * bom版本
   */
  bomVersion?: string;

  /**
   * 供应方式(字典 supply_type)
   */
  supplyMode?: string;

  /**
   * 用量
   */
  quantity?: number;

  /**
   * 基础用量
   */
  basicQuantity?: number;

  /**
   * 损耗率 (%)
   */
  scrapRate?: number;

  /**
   * 是否为bom节点（0否 1是）
   */
  isBomNode?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface MaterialBomSubQuery extends PageQuery {
  /**
   * 主bomid
   */
  mainBomId?: string | number;

  /**
   * 父id
   */
  parentId?: string | number;

  /**
   * bomid
   */
  bomId?: string | number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * bom版本
   */
  bomVersion?: string;

  /**
   * 供应方式(字典 supply_type)
   */
  supplyMode?: string;

  /**
   * 用量
   */
  quantity?: number;

  /**
   * 基础用量
   */
  basicQuantity?: number;

  /**
   * 损耗率 (%)
   */
  scrapRate?: number;

  /**
   * 是否为bom节点（0否 1是）
   */
  isBomNode?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
