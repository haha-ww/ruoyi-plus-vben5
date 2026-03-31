import type { WarehouseLocationVO, WarehouseLocationForm, WarehouseLocationQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询库位列表
* @param params
* @returns 库位列表
*/
export function warehouseLocationList(params?: WarehouseLocationQuery) {
  return alovaInstance.get<PageResult<WarehouseLocationVO>>('/erp/warehouseLocation/list', { params });
}

/**
 * 导出库位列表
 * @param params
 * @returns 库位列表
 */
export function warehouseLocationExport(params?: WarehouseLocationQuery) {
  return commonExport('/erp/warehouseLocation/export', params ?? {});
}

/**
 * 查询库位详情
 * @param id id
 * @returns 库位详情
 */
export function warehouseLocationInfo(id: ID) {
  return alovaInstance.get<WarehouseLocationVO>(`/erp/warehouseLocation/${id}`);
}

/**
 * 新增库位
 * @param data
 * @returns void
 */
export function warehouseLocationAdd(data: WarehouseLocationForm) {
  return alovaInstance.postWithMsg<void>('/erp/warehouseLocation', data);
}

/**
 * 更新库位
 * @param data
 * @returns void
 */
export function warehouseLocationUpdate(data: WarehouseLocationForm) {
  return alovaInstance.putWithMsg<void>('/erp/warehouseLocation', data);
}

/**
 * 删除库位
 * @param id id
 * @returns void
 */
export function warehouseLocationRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/warehouseLocation/${id}`);
}
