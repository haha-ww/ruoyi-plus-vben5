import type { WarehouseInventoryTransactionVO, WarehouseInventoryTransactionForm, WarehouseInventoryTransactionQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询库存明细列表
* @param params
* @returns 库存明细列表
*/
export function warehouseInventoryTransactionList(params?: WarehouseInventoryTransactionQuery) {
  return alovaInstance.get<PageResult<WarehouseInventoryTransactionVO>>('/erp/warehouseInventoryTransaction/list', { params });
}

/**
 * 导出库存明细列表
 * @param params
 * @returns 库存明细列表
 */
export function warehouseInventoryTransactionExport(params?: WarehouseInventoryTransactionQuery) {
  return commonExport('/erp/warehouseInventoryTransaction/export', params ?? {});
}

/**
 * 查询库存明细详情
 * @param id id
 * @returns 库存明细详情
 */
export function warehouseInventoryTransactionInfo(id: ID) {
  return alovaInstance.get<WarehouseInventoryTransactionVO>(`/erp/warehouseInventoryTransaction/${id}`);
}

/**
 * 新增库存明细
 * @param data
 * @returns void
 */
export function warehouseInventoryTransactionAdd(data: WarehouseInventoryTransactionForm) {
  return alovaInstance.postWithMsg<void>('/erp/warehouseInventoryTransaction', data);
}

/**
 * 更新库存明细
 * @param data
 * @returns void
 */
export function warehouseInventoryTransactionUpdate(data: WarehouseInventoryTransactionForm) {
  return alovaInstance.putWithMsg<void>('/erp/warehouseInventoryTransaction', data);
}

/**
 * 删除库存明细
 * @param id id
 * @returns void
 */
export function warehouseInventoryTransactionRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/warehouseInventoryTransaction/${id}`);
}
