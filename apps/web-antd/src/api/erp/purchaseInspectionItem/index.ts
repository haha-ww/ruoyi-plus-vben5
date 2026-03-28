import type { PurchaseInspectionItemVO, PurchaseInspectionItemForm, PurchaseInspectionItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购质检明细列表
* @param params
* @returns 采购质检明细列表
*/
export function purchaseInspectionItemList(params?: PurchaseInspectionItemQuery) {
  return alovaInstance.get<PageResult<PurchaseInspectionItemVO>>('/erp/purchaseInspectionItem/list', { params });
}

/**
 * 导出采购质检明细列表
 * @param params
 * @returns 采购质检明细列表
 */
export function purchaseInspectionItemExport(params?: PurchaseInspectionItemQuery) {
  return commonExport('/erp/purchaseInspectionItem/export', params ?? {});
}

/**
 * 查询采购质检明细详情
 * @param id id
 * @returns 采购质检明细详情
 */
export function purchaseInspectionItemInfo(id: ID) {
  return alovaInstance.get<PurchaseInspectionItemVO>(`/erp/purchaseInspectionItem/${id}`);
}

/**
 * 新增采购质检明细
 * @param data
 * @returns void
 */
export function purchaseInspectionItemAdd(data: PurchaseInspectionItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseInspectionItem', data);
}

/**
 * 更新采购质检明细
 * @param data
 * @returns void
 */
export function purchaseInspectionItemUpdate(data: PurchaseInspectionItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseInspectionItem', data);
}

/**
 * 删除采购质检明细
 * @param id id
 * @returns void
 */
export function purchaseInspectionItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseInspectionItem/${id}`);
}
