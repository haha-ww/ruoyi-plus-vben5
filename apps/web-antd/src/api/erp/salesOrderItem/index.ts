import type { SalesOrderItemVO, SalesOrderItemForm, SalesOrderItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询销售订单明细列表
* @param params
* @returns 销售订单明细列表
*/
export function salesOrderItemList(params?: SalesOrderItemQuery) {
  return alovaInstance.get<PageResult<SalesOrderItemVO>>('/erp/salesOrderItem/list', { params });
}

/**
 * 导出销售订单明细列表
 * @param params
 * @returns 销售订单明细列表
 */
export function salesOrderItemExport(params?: SalesOrderItemQuery) {
  return commonExport('/erp/salesOrderItem/export', params ?? {});
}

/**
 * 查询销售订单明细详情
 * @param id id
 * @returns 销售订单明细详情
 */
export function salesOrderItemInfo(id: ID) {
  return alovaInstance.get<SalesOrderItemVO>(`/erp/salesOrderItem/${id}`);
}

/**
 * 新增销售订单明细
 * @param data
 * @returns void
 */
export function salesOrderItemAdd(data: SalesOrderItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/salesOrderItem', data);
}

/**
 * 更新销售订单明细
 * @param data
 * @returns void
 */
export function salesOrderItemUpdate(data: SalesOrderItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/salesOrderItem', data);
}

/**
 * 删除销售订单明细
 * @param id id
 * @returns void
 */
export function salesOrderItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/salesOrderItem/${id}`);
}
