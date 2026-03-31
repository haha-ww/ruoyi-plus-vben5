import type { InventoryCheckVO, InventoryCheckForm, InventoryCheckQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询盘点单列表
* @param params
* @returns 盘点单列表
*/
export function inventoryCheckList(params?: InventoryCheckQuery) {
  return alovaInstance.get<PageResult<InventoryCheckVO>>('/erp/inventoryCheck/list', { params });
}

/**
 * 导出盘点单列表
 * @param params
 * @returns 盘点单列表
 */
export function inventoryCheckExport(params?: InventoryCheckQuery) {
  return commonExport('/erp/inventoryCheck/export', params ?? {});
}

/**
 * 查询盘点单详情
 * @param id id
 * @returns 盘点单详情
 */
export function inventoryCheckInfo(id: ID) {
  return alovaInstance.get<InventoryCheckVO>(`/erp/inventoryCheck/${id}`);
}

/**
 * 新增盘点单
 * @param data
 * @returns void
 */
export function inventoryCheckAdd(data: InventoryCheckForm) {
  return alovaInstance.postWithMsg<void>('/erp/inventoryCheck', data);
}

/**
 * 更新盘点单
 * @param data
 * @returns void
 */
export function inventoryCheckUpdate(data: InventoryCheckForm) {
  return alovaInstance.putWithMsg<void>('/erp/inventoryCheck', data);
}

/**
 * 删除盘点单
 * @param id id
 * @returns void
 */
export function inventoryCheckRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/inventoryCheck/${id}`);
}
