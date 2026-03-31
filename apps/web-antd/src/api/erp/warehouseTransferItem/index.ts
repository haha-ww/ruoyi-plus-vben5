import type { WarehouseTransferItemVO, WarehouseTransferItemForm, WarehouseTransferItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询erp-仓库调拨明细列表
* @param params
* @returns erp-仓库调拨明细列表
*/
export function warehouseTransferItemList(params?: WarehouseTransferItemQuery) {
  return alovaInstance.get<PageResult<WarehouseTransferItemVO>>('/erp/warehouseTransferItem/list', { params });
}

/**
 * 导出erp-仓库调拨明细列表
 * @param params
 * @returns erp-仓库调拨明细列表
 */
export function warehouseTransferItemExport(params?: WarehouseTransferItemQuery) {
  return commonExport('/erp/warehouseTransferItem/export', params ?? {});
}

/**
 * 查询erp-仓库调拨明细详情
 * @param id id
 * @returns erp-仓库调拨明细详情
 */
export function warehouseTransferItemInfo(id: ID) {
  return alovaInstance.get<WarehouseTransferItemVO>(`/erp/warehouseTransferItem/${id}`);
}

/**
 * 新增erp-仓库调拨明细
 * @param data
 * @returns void
 */
export function warehouseTransferItemAdd(data: WarehouseTransferItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/warehouseTransferItem', data);
}

/**
 * 更新erp-仓库调拨明细
 * @param data
 * @returns void
 */
export function warehouseTransferItemUpdate(data: WarehouseTransferItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/warehouseTransferItem', data);
}

/**
 * 删除erp-仓库调拨明细
 * @param id id
 * @returns void
 */
export function warehouseTransferItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/warehouseTransferItem/${id}`);
}
