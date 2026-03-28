import type { SalesOutboundOrderItemVO, SalesOutboundOrderItemForm, SalesOutboundOrderItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询销售出库单明细列表
* @param params
* @returns 销售出库单明细列表
*/
export function salesOutboundOrderItemList(params?: SalesOutboundOrderItemQuery) {
  return alovaInstance.get<PageResult<SalesOutboundOrderItemVO>>('/erp/salesOutboundOrderItem/list', { params });
}

/**
 * 导出销售出库单明细列表
 * @param params
 * @returns 销售出库单明细列表
 */
export function salesOutboundOrderItemExport(params?: SalesOutboundOrderItemQuery) {
  return commonExport('/erp/salesOutboundOrderItem/export', params ?? {});
}

/**
 * 查询销售出库单明细详情
 * @param id id
 * @returns 销售出库单明细详情
 */
export function salesOutboundOrderItemInfo(id: ID) {
  return alovaInstance.get<SalesOutboundOrderItemVO>(`/erp/salesOutboundOrderItem/${id}`);
}

/**
 * 新增销售出库单明细
 * @param data
 * @returns void
 */
export function salesOutboundOrderItemAdd(data: SalesOutboundOrderItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/salesOutboundOrderItem', data);
}

/**
 * 更新销售出库单明细
 * @param data
 * @returns void
 */
export function salesOutboundOrderItemUpdate(data: SalesOutboundOrderItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/salesOutboundOrderItem', data);
}

/**
 * 删除销售出库单明细
 * @param id id
 * @returns void
 */
export function salesOutboundOrderItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/salesOutboundOrderItem/${id}`);
}
