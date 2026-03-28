import type { PurchaseReturnItemVO, PurchaseReturnItemForm, PurchaseReturnItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购退货明细列表
* @param params
* @returns 采购退货明细列表
*/
export function purchaseReturnItemList(params?: PurchaseReturnItemQuery) {
  return alovaInstance.get<PageResult<PurchaseReturnItemVO>>('/erp/purchaseReturnItem/list', { params });
}

/**
 * 导出采购退货明细列表
 * @param params
 * @returns 采购退货明细列表
 */
export function purchaseReturnItemExport(params?: PurchaseReturnItemQuery) {
  return commonExport('/erp/purchaseReturnItem/export', params ?? {});
}

/**
 * 查询采购退货明细详情
 * @param id id
 * @returns 采购退货明细详情
 */
export function purchaseReturnItemInfo(id: ID) {
  return alovaInstance.get<PurchaseReturnItemVO>(`/erp/purchaseReturnItem/${id}`);
}

/**
 * 新增采购退货明细
 * @param data
 * @returns void
 */
export function purchaseReturnItemAdd(data: PurchaseReturnItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseReturnItem', data);
}

/**
 * 更新采购退货明细
 * @param data
 * @returns void
 */
export function purchaseReturnItemUpdate(data: PurchaseReturnItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseReturnItem', data);
}

/**
 * 删除采购退货明细
 * @param id id
 * @returns void
 */
export function purchaseReturnItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseReturnItem/${id}`);
}
