import type { WarehouseTransferVO, WarehouseTransferForm, WarehouseTransferQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询erp-仓库调拨列表
* @param params
* @returns erp-仓库调拨列表
*/
export function warehouseTransferList(params?: WarehouseTransferQuery) {
  return alovaInstance.get<PageResult<WarehouseTransferVO>>('/erp/warehouseTransfer/list', { params });
}

/**
 * 导出erp-仓库调拨列表
 * @param params
 * @returns erp-仓库调拨列表
 */
export function warehouseTransferExport(params?: WarehouseTransferQuery) {
  return commonExport('/erp/warehouseTransfer/export', params ?? {});
}

/**
 * 查询erp-仓库调拨详情
 * @param id id
 * @returns erp-仓库调拨详情
 */
export function warehouseTransferInfo(id: ID) {
  return alovaInstance.get<WarehouseTransferVO>(`/erp/warehouseTransfer/${id}`);
}

/**
 * 新增erp-仓库调拨
 * @param data
 * @returns void
 */
export function warehouseTransferAdd(data: WarehouseTransferForm) {
  return alovaInstance.postWithMsg<void>('/erp/warehouseTransfer', data);
}

/**
 * 更新erp-仓库调拨
 * @param data
 * @returns void
 */
export function warehouseTransferUpdate(data: WarehouseTransferForm) {
  return alovaInstance.putWithMsg<void>('/erp/warehouseTransfer', data);
}

/**
 * 删除erp-仓库调拨
 * @param id id
 * @returns void
 */
export function warehouseTransferRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/warehouseTransfer/${id}`);
}
