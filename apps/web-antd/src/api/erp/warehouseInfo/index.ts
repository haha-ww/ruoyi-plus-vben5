import type { WarehouseInfoVO, WarehouseInfoForm, WarehouseInfoQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询仓库信息列表
* @param params
* @returns 仓库信息列表
*/
export function warehouseInfoList(params?: WarehouseInfoQuery) {
  return alovaInstance.get<PageResult<WarehouseInfoVO>>('/erp/warehouseInfo/list', { params });
}

/**
 * 导出仓库信息列表
 * @param params
 * @returns 仓库信息列表
 */
export function warehouseInfoExport(params?: WarehouseInfoQuery) {
  return commonExport('/erp/warehouseInfo/export', params ?? {});
}

/**
 * 查询仓库信息详情
 * @param id id
 * @returns 仓库信息详情
 */
export function warehouseInfoInfo(id: ID) {
  return alovaInstance.get<WarehouseInfoVO>(`/erp/warehouseInfo/${id}`);
}

/**
 * 新增仓库信息
 * @param data
 * @returns void
 */
export function warehouseInfoAdd(data: WarehouseInfoForm) {
  return alovaInstance.postWithMsg<void>('/erp/warehouseInfo', data);
}

/**
 * 更新仓库信息
 * @param data
 * @returns void
 */
export function warehouseInfoUpdate(data: WarehouseInfoForm) {
  return alovaInstance.putWithMsg<void>('/erp/warehouseInfo', data);
}

/**
 * 删除仓库信息
 * @param id id
 * @returns void
 */
export function warehouseInfoRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/warehouseInfo/${id}`);
}
