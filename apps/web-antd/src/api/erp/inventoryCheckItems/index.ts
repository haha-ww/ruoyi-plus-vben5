import type { InventoryCheckItemsVO, InventoryCheckItemsForm, InventoryCheckItemsQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询物料盘点明细列表
* @param params
* @returns 物料盘点明细列表
*/
export function inventoryCheckItemsList(params?: InventoryCheckItemsQuery) {
  return alovaInstance.get<PageResult<InventoryCheckItemsVO>>('/erp/inventoryCheckItems/list', { params });
}

/**
 * 导出物料盘点明细列表
 * @param params
 * @returns 物料盘点明细列表
 */
export function inventoryCheckItemsExport(params?: InventoryCheckItemsQuery) {
  return commonExport('/erp/inventoryCheckItems/export', params ?? {});
}

/**
 * 查询物料盘点明细详情
 * @param id id
 * @returns 物料盘点明细详情
 */
export function inventoryCheckItemsInfo(id: ID) {
  return alovaInstance.get<InventoryCheckItemsVO>(`/erp/inventoryCheckItems/${id}`);
}

/**
 * 新增物料盘点明细
 * @param data
 * @returns void
 */
export function inventoryCheckItemsAdd(data: InventoryCheckItemsForm) {
  return alovaInstance.postWithMsg<void>('/erp/inventoryCheckItems', data);
}

/**
 * 更新物料盘点明细
 * @param data
 * @returns void
 */
export function inventoryCheckItemsUpdate(data: InventoryCheckItemsForm) {
  return alovaInstance.putWithMsg<void>('/erp/inventoryCheckItems', data);
}

/**
 * 删除物料盘点明细
 * @param id id
 * @returns void
 */
export function inventoryCheckItemsRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/inventoryCheckItems/${id}`);
}
