import type { SupplierVO, SupplierForm, SupplierQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询供应商信息列表
* @param params
* @returns 供应商信息列表
*/
export function supplierList(params?: SupplierQuery) {
  return alovaInstance.get<PageResult<SupplierVO>>('/erp/supplier/list', { params });
}

/**
 * 导出供应商信息列表
 * @param params
 * @returns 供应商信息列表
 */
export function supplierExport(params?: SupplierQuery) {
  return commonExport('/erp/supplier/export', params ?? {});
}

/**
 * 查询供应商信息详情
 * @param id id
 * @returns 供应商信息详情
 */
export function supplierInfo(id: ID) {
  return alovaInstance.get<SupplierVO>(`/erp/supplier/${id}`);
}

/**
 * 新增供应商信息
 * @param data
 * @returns void
 */
export function supplierAdd(data: SupplierForm) {
  return alovaInstance.postWithMsg<void>('/erp/supplier', data);
}

/**
 * 更新供应商信息
 * @param data
 * @returns void
 */
export function supplierUpdate(data: SupplierForm) {
  return alovaInstance.putWithMsg<void>('/erp/supplier', data);
}

/**
 * 删除供应商信息
 * @param id id
 * @returns void
 */
export function supplierRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/supplier/${id}`);
}
