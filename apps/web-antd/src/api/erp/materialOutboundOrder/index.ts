import type { MaterialOutboundOrderForm, MaterialOutboundOrderQuery, MaterialOutboundOrderVO } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询领料出库列表
* @param params
* @returns 领料出库列表
*/
export function materialOutboundOrderList(params?: MaterialOutboundOrderQuery) {
  return alovaInstance.get<PageResult<MaterialOutboundOrderVO>>('/erp/materialOutboundOrder/list', { params });
}

/**
 * 导出领料出库列表
 * @param params
 * @returns 领料出库列表
 */
export function materialOutboundOrderExport(params?: MaterialOutboundOrderQuery) {
  return commonExport('/erp/materialOutboundOrder/export', params ?? {});
}

/**
 * 查询领料出库详情
 * @param id id
 * @returns 领料出库详情
 */
export function materialOutboundOrderInfo(id: ID) {
  return alovaInstance.get<MaterialOutboundOrderVO>(`/erp/materialOutboundOrder/${id}`);
}

/**
 * 新增领料出库
 * @param data
 * @returns void
 */
export function materialOutboundOrderAdd(data: MaterialOutboundOrderForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialOutboundOrder', data);
}

/**
 * 更新领料出库
 * @param data
 * @returns void
 */
export function materialOutboundOrderUpdate(data: MaterialOutboundOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialOutboundOrder', data);
}

/**
 * 删除领料出库
 * @param id id
 * @returns void
 */
export function materialOutboundOrderRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialOutboundOrder/${id}`);
}

/**
 * 出库
 * @param data
 * @returns void
 */
export function materialOutboundOrderOutbound(data: MaterialOutboundOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialOutboundOrder/confirm', data);
}
