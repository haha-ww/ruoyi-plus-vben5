import type { PurchaseOrderVO, PurchaseOrderForm, PurchaseOrderQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购订单列表
* @param params
* @returns 采购订单列表
*/
export function purchaseOrderList(params?: PurchaseOrderQuery) {
  return alovaInstance.get<PageResult<PurchaseOrderVO>>('/erp/purchaseOrder/list', { params });
}

/**
 * 导出采购订单列表
 * @param params
 * @returns 采购订单列表
 */
export function purchaseOrderExport(params?: PurchaseOrderQuery) {
  return commonExport('/erp/purchaseOrder/export', params ?? {});
}

/**
 * 查询采购订单详情
 * @param id id
 * @returns 采购订单详情
 */
export function purchaseOrderInfo(id: ID) {
  return alovaInstance.get<PurchaseOrderVO>(`/erp/purchaseOrder/${id}`);
}

/**
 * 新增采购订单
 * @param data
 * @returns void
 */
export function purchaseOrderAdd(data: PurchaseOrderForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseOrder', data);
}

/**
 * 更新采购订单
 * @param data
 * @returns void
 */
export function purchaseOrderUpdate(data: PurchaseOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseOrder', data);
}

/**
 * 删除采购订单
 * @param id id
 * @returns void
 */
export function purchaseOrderRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseOrder/${id}`);
}
