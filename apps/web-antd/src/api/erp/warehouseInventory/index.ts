import type { WarehouseInventoryVO, WarehouseInventoryForm, WarehouseInventoryQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询实时库存列表
* @param params
* @returns 实时库存列表
*/
export function warehouseInventoryList(params?: WarehouseInventoryQuery) {
  return alovaInstance.get<PageResult<WarehouseInventoryVO>>('/erp/warehouseInventory/list', { params });
}

/**
 * 导出实时库存列表
 * @param params
 * @returns 实时库存列表
 */
export function warehouseInventoryExport(params?: WarehouseInventoryQuery) {
  return commonExport('/erp/warehouseInventory/export', params ?? {});
}

/**
 * 查询实时库存详情
 * @param id id
 * @returns 实时库存详情
 */
export function warehouseInventoryInfo(id: ID) {
  return alovaInstance.get<WarehouseInventoryVO>(`/erp/warehouseInventory/${id}`);
}

/**
 * 新增实时库存
 * @param data
 * @returns void
 */
export function warehouseInventoryAdd(data: WarehouseInventoryForm) {
  return alovaInstance.postWithMsg<void>('/erp/warehouseInventory', data);
}

/**
 * 更新实时库存
 * @param data
 * @returns void
 */
export function warehouseInventoryUpdate(data: WarehouseInventoryForm) {
  return alovaInstance.putWithMsg<void>('/erp/warehouseInventory', data);
}

/**
 * 删除实时库存
 * @param id id
 * @returns void
 */
export function warehouseInventoryRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/warehouseInventory/${id}`);
}
