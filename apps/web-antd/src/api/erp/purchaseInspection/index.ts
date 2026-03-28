import type { PurchaseInspectionVO, PurchaseInspectionForm, PurchaseInspectionQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购质检列表
* @param params
* @returns 采购质检列表
*/
export function purchaseInspectionList(params?: PurchaseInspectionQuery) {
  return alovaInstance.get<PageResult<PurchaseInspectionVO>>('/erp/purchaseInspection/list', { params });
}

/**
 * 导出采购质检列表
 * @param params
 * @returns 采购质检列表
 */
export function purchaseInspectionExport(params?: PurchaseInspectionQuery) {
  return commonExport('/erp/purchaseInspection/export', params ?? {});
}

/**
 * 查询采购质检详情
 * @param id id
 * @returns 采购质检详情
 */
export function purchaseInspectionInfo(id: ID) {
  return alovaInstance.get<PurchaseInspectionVO>(`/erp/purchaseInspection/${id}`);
}

/**
 * 新增采购质检
 * @param data
 * @returns void
 */
export function purchaseInspectionAdd(data: PurchaseInspectionForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseInspection', data);
}

/**
 * 更新采购质检
 * @param data
 * @returns void
 */
export function purchaseInspectionUpdate(data: PurchaseInspectionForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseInspection', data);
}

/**
 * 删除采购质检
 * @param id id
 * @returns void
 */
export function purchaseInspectionRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseInspection/${id}`);
}
