import type { PurchasePlanVO, PurchasePlanForm, PurchasePlanQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购计划列表
* @param params
* @returns 采购计划列表
*/
export function purchasePlanList(params?: PurchasePlanQuery) {
  return alovaInstance.get<PageResult<PurchasePlanVO>>('/erp/purchasePlan/list', { params });
}

/**
 * 导出采购计划列表
 * @param params
 * @returns 采购计划列表
 */
export function purchasePlanExport(params?: PurchasePlanQuery) {
  return commonExport('/erp/purchasePlan/export', params ?? {});
}

/**
 * 查询采购计划详情
 * @param id id
 * @returns 采购计划详情
 */
export function purchasePlanInfo(id: ID) {
  return alovaInstance.get<PurchasePlanVO>(`/erp/purchasePlan/${id}`);
}

/**
 * 新增采购计划
 * @param data
 * @returns void
 */
export function purchasePlanAdd(data: PurchasePlanForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchasePlan', data);
}

/**
 * 更新采购计划
 * @param data
 * @returns void
 */
export function purchasePlanUpdate(data: PurchasePlanForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchasePlan', data);
}

/**
 * 删除采购计划
 * @param id id
 * @returns void
 */
export function purchasePlanRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchasePlan/${id}`);
}
