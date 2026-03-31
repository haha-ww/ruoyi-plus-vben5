import type { PageQuery, BaseEntity } from '#/api/common';

export interface WarehouseLocationVO {
  /**
   * 库位ID
   */
  id: string | number;

  /**
   * 所属仓库ID
   */
  warehouseId: string | number;

  /**
   * 父位置ID（0表示根节点）
   */
  parentId: string | number;

  /**
   * 库位编码
   */
  locationCode: string;

  /**
   * 库位名称
   */
  locationName: string;

  /**
   * 类型：1-区域 2-货架 3-货位 4-暂存区
   */
  locationType: number;

  /**
   * 完整路径编码
   */
  fullPath: string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status: number;

}

export interface WarehouseLocationForm extends BaseEntity {
  /**
   * 库位ID
   */
  id?: string | number;

  /**
   * 所属仓库ID
   */
  warehouseId?: string | number;

  /**
   * 父位置ID（0表示根节点）
   */
  parentId?: string | number;

  /**
   * 库位编码
   */
  locationCode?: string;

  /**
   * 库位名称
   */
  locationName?: string;

  /**
   * 类型：1-区域 2-货架 3-货位 4-暂存区
   */
  locationType?: number;

  /**
   * 完整路径编码
   */
  fullPath?: string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

}

export interface WarehouseLocationQuery extends PageQuery {
  /**
   * 所属仓库ID
   */
  warehouseId?: string | number;

  /**
   * 父位置ID（0表示根节点）
   */
  parentId?: string | number;

  /**
   * 库位编码
   */
  locationCode?: string;

  /**
   * 库位名称
   */
  locationName?: string;

  /**
   * 类型：1-区域 2-货架 3-货位 4-暂存区
   */
  locationType?: number;

  /**
   * 完整路径编码
   */
  fullPath?: string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
