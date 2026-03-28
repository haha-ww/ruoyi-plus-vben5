import type { PurchaseInboundItemVO, PurchaseInboundItemForm, PurchaseInboundItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询采购入库明细列表
* @param params
* @returns 采购入库明细列表
*/
export function purchaseInboundItemList(params?: PurchaseInboundItemQuery) {
  return alovaInstance.get<PageResult<PurchaseInboundItemVO>>('/erp/purchaseInboundItem/list', { params });
}

/**
 * 导出采购入库明细列表
 * @param params
 * @returns 采购入库明细列表
 */
export function purchaseInboundItemExport(params?: PurchaseInboundItemQuery) {
  return commonExport('/erp/purchaseInboundItem/export', params ?? {});
}

/**
 * 查询采购入库明细详情
 * @param id id
 * @returns 采购入库明细详情
 */
export function purchaseInboundItemInfo(id: ID) {
  return alovaInstance.get<PurchaseInboundItemVO>(`/erp/purchaseInboundItem/${id}`);
}

/**
 * 新增采购入库明细
 * @param data
 * @returns void
 */
export function purchaseInboundItemAdd(data: PurchaseInboundItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/purchaseInboundItem', data);
}

/**
 * 更新采购入库明细
 * @param data
 * @returns void
 */
export function purchaseInboundItemUpdate(data: PurchaseInboundItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/purchaseInboundItem', data);
}

/**
 * 删除采购入库明细
 * @param id id
 * @returns void
 */
export function purchaseInboundItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/purchaseInboundItem/${id}`);
}
