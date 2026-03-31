import type { SalesOutboundOrderVO, SalesOutboundOrderForm, SalesOutboundOrderQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询销售出库列表
* @param params
* @returns 销售出库列表
*/
export function salesOutboundOrderList(params?: SalesOutboundOrderQuery) {
  return alovaInstance.get<PageResult<SalesOutboundOrderVO>>('/erp/salesOutboundOrder/list', { params });
}

/**
 * 导出销售出库列表
 * @param params
 * @returns 销售出库列表
 */
export function salesOutboundOrderExport(params?: SalesOutboundOrderQuery) {
  return commonExport('/erp/salesOutboundOrder/export', params ?? {});
}

/**
 * 查询销售出库详情
 * @param id id
 * @returns 销售出库详情
 */
export function salesOutboundOrderInfo(id: ID) {
  return alovaInstance.get<SalesOutboundOrderVO>(`/erp/salesOutboundOrder/${id}`);
}

/**
 * 新增销售出库
 * @param data
 * @returns void
 */
export function salesOutboundOrderAdd(data: SalesOutboundOrderForm) {
  return alovaInstance.postWithMsg<void>('/erp/salesOutboundOrder', data);
}

/**
 * 更新销售出库
 * @param data
 * @returns void
 */
export function salesOutboundOrderUpdate(data: SalesOutboundOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/salesOutboundOrder', data);
}

/**
 * 删除销售出库
 * @param id id
 * @returns void
 */
export function salesOutboundOrderRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/salesOutboundOrder/${id}`);
}
