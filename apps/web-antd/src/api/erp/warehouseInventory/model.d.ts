import type { PageQuery, BaseEntity } from '#/api/common';

export interface WarehouseInventoryVO {
  /**
   * 库存ID
   */
  id: string | number;

  /**
   * 仓库ID
   */
  warehouseId: string | number;

  /**
   * 库位ID
   */
  locationId: string | number;

  /**
   * 批次号
   */
  batchNo: string;

  /**
   * 物料ID
   */
  materialId: string | number;

  /**
   * 当前可用库存
   */
  currentQty: number;

  /**
   * 锁定库存(已分配未出库)
   */
  lockedQty: number;

  /**
   * 在途库存
   */
  inTransitQty: number;

  /**
   * 待调整数量
   */
  adjustmentQty: number;

}

export interface WarehouseInventoryForm extends BaseEntity {
  /**
   * 库存ID
   */
  id?: string | number;

  /**
   * 仓库ID
   */
  warehouseId?: string | number;

  /**
   * 库位ID
   */
  locationId?: string | number;

  /**
   * 批次号
   */
  batchNo?: string;

  /**
   * 物料ID
   */
  materialId?: string | number;

  /**
   * 当前可用库存
   */
  currentQty?: number;

  /**
   * 锁定库存(已分配未出库)
   */
  lockedQty?: number;

  /**
   * 在途库存
   */
  inTransitQty?: number;

  /**
   * 待调整数量
   */
  adjustmentQty?: number;

}

export interface WarehouseInventoryQuery extends PageQuery {
  /**
   * 仓库ID
   */
  warehouseId?: string | number;

  /**
   * 库位ID
   */
  locationId?: string | number;

  /**
   * 批次号
   */
  batchNo?: string;

  /**
   * 物料ID
   */
  materialId?: string | number;

  /**
   * 当前可用库存
   */
  currentQty?: number;

  /**
   * 锁定库存(已分配未出库)
   */
  lockedQty?: number;

  /**
   * 在途库存
   */
  inTransitQty?: number;

  /**
   * 待调整数量
   */
  adjustmentQty?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
