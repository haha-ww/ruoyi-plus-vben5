import type { PageQuery, BaseEntity } from '#/api/common';

export interface InventoryCheckVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 盘点单编码
   */
  checkCode: string;

  /**
   * 盘点开始日期
   */
  startDate: string;

  /**
   * 盘点结束日期
   */
  endDate: string;

  /**
   * 盘点类型（表 erp_material_category）
   */
  checkType: number;

  /**
   * 盘点仓库ID
   */
  warehouseId: string | number;

  /**
   * 是否包含当天的库存（0否 1是）
   */
  includeToday: number;

  /**
   * 备注
   */
  remark: string;

}

export interface InventoryCheckForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 盘点单编码
   */
  checkCode?: string;

  /**
   * 盘点开始日期
   */
  startDate?: string;

  /**
   * 盘点结束日期
   */
  endDate?: string;

  /**
   * 盘点类型（表 erp_material_category）
   */
  checkType?: number;

  /**
   * 盘点仓库ID
   */
  warehouseId?: string | number;

  /**
   * 是否包含当天的库存（0否 1是）
   */
  includeToday?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface InventoryCheckQuery extends PageQuery {
  /**
   * 盘点单编码
   */
  checkCode?: string;

  /**
   * 盘点开始日期
   */
  startDate?: string;

  /**
   * 盘点结束日期
   */
  endDate?: string;

  /**
   * 盘点类型（表 erp_material_category）
   */
  checkType?: number;

  /**
   * 盘点仓库ID
   */
  warehouseId?: string | number;

  /**
   * 是否包含当天的库存（0否 1是）
   */
  includeToday?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
