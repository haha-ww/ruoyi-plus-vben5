import type { PurchaseReturnVO, PurchaseReturnForm, PurchaseReturnQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购退货列表
* @param params
* @returns 采购退货列表
*/
export function purchaseReturnList(params?: PurchaseReturnQuery) {
  return alovaInstance.get<PageResult<PurchaseReturnVO>>('/erp/purchaseReturn/list', { params });
}

/**
 * 导出采购退货列表
 * @param params
 * @returns 采购退货列表
 */
export function purchaseReturnExport(params?: PurchaseReturnQuery) {
  return commonExport('/erp/purchaseReturn/export', params ?? {});
}

/**
 * 查询采购退货详情
 * @param id id
 * @returns 采购退货详情
 */
export function purchaseReturnInfo(id: ID) {
  return alovaInstance.get<PurchaseReturnVO>(`/erp/purchaseReturn/${id}`);
}

/**
 * 新增采购退货
 * @param data
 * @returns void
 */
export function purchaseReturnAdd(data: PurchaseReturnForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseReturn', data);
}

/**
 * 更新采购退货
 * @param data
 * @returns void
 */
export function purchaseReturnUpdate(data: PurchaseReturnForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseReturn', data);
}

/**
 * 删除采购退货
 * @param id id
 * @returns void
 */
export function purchaseReturnRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseReturn/${id}`);
}
