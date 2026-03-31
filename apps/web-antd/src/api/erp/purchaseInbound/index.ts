import type { PurchaseInboundVO, PurchaseInboundForm, PurchaseInboundQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购入库列表
* @param params
* @returns 采购入库列表
*/
export function purchaseInboundList(params?: PurchaseInboundQuery) {
  return alovaInstance.get<PageResult<PurchaseInboundVO>>('/erp/purchaseInbound/list', { params });
}

/**
 * 导出采购入库列表
 * @param params
 * @returns 采购入库列表
 */
export function purchaseInboundExport(params?: PurchaseInboundQuery) {
  return commonExport('/erp/purchaseInbound/export', params ?? {});
}

/**
 * 查询采购入库详情
 * @param id id
 * @returns 采购入库详情
 */
export function purchaseInboundInfo(id: ID) {
  return alovaInstance.get<PurchaseInboundVO>(`/erp/purchaseInbound/${id}`);
}

/**
 * 新增采购入库
 * @param data
 * @returns void
 */
export function purchaseInboundAdd(data: PurchaseInboundForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseInbound', data);
}

/**
 * 更新采购入库
 * @param data
 * @returns void
 */
export function purchaseInboundUpdate(data: PurchaseInboundForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseInbound', data);
}

/**
 * 删除采购入库
 * @param id id
 * @returns void
 */
export function purchaseInboundRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseInbound/${id}`);
}
