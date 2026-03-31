import type { PurchaseOrderItemVO, PurchaseOrderItemForm, PurchaseOrderItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购订单明细列表
* @param params
* @returns 采购订单明细列表
*/
export function purchaseOrderItemList(params?: PurchaseOrderItemQuery) {
  return alovaInstance.get<PageResult<PurchaseOrderItemVO>>('/erp/purchaseOrderItem/list', { params });
}

/**
 * 导出采购订单明细列表
 * @param params
 * @returns 采购订单明细列表
 */
export function purchaseOrderItemExport(params?: PurchaseOrderItemQuery) {
  return commonExport('/erp/purchaseOrderItem/export', params ?? {});
}

/**
 * 查询采购订单明细详情
 * @param id id
 * @returns 采购订单明细详情
 */
export function purchaseOrderItemInfo(id: ID) {
  return alovaInstance.get<PurchaseOrderItemVO>(`/erp/purchaseOrderItem/${id}`);
}

/**
 * 新增采购订单明细
 * @param data
 * @returns void
 */
export function purchaseOrderItemAdd(data: PurchaseOrderItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseOrderItem', data);
}

/**
 * 更新采购订单明细
 * @param data
 * @returns void
 */
export function purchaseOrderItemUpdate(data: PurchaseOrderItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseOrderItem', data);
}

/**
 * 删除采购订单明细
 * @param id id
 * @returns void
 */
export function purchaseOrderItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseOrderItem/${id}`);
}
