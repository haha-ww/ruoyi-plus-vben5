import type { PurchasePlanItemVO, PurchasePlanItemForm, PurchasePlanItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购计划明细列表
* @param params
* @returns 采购计划明细列表
*/
export function purchasePlanItemList(params?: PurchasePlanItemQuery) {
  return alovaInstance.get<PageResult<PurchasePlanItemVO>>('/erp/purchasePlanItem/list', { params });
}

/**
 * 导出采购计划明细列表
 * @param params
 * @returns 采购计划明细列表
 */
export function purchasePlanItemExport(params?: PurchasePlanItemQuery) {
  return commonExport('/erp/purchasePlanItem/export', params ?? {});
}

/**
 * 查询采购计划明细详情
 * @param id id
 * @returns 采购计划明细详情
 */
export function purchasePlanItemInfo(id: ID) {
  return alovaInstance.get<PurchasePlanItemVO>(`/erp/purchasePlanItem/${id}`);
}

/**
 * 新增采购计划明细
 * @param data
 * @returns void
 */
export function purchasePlanItemAdd(data: PurchasePlanItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchasePlanItem', data);
}

/**
 * 更新采购计划明细
 * @param data
 * @returns void
 */
export function purchasePlanItemUpdate(data: PurchasePlanItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchasePlanItem', data);
}

/**
 * 删除采购计划明细
 * @param id id
 * @returns void
 */
export function purchasePlanItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchasePlanItem/${id}`);
}
