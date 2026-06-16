import type { SalesOrderForm, SalesOrderQuery, SalesOrderStepVo,SalesOrderVO } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询销售订单列表
* @param params
* @returns 销售订单列表
*/
export function salesOrderList(params?: SalesOrderQuery) {
  return alovaInstance.get<PageResult<SalesOrderVO>>('/erp/salesOrder/list', { params });
}

/**
 * 导出销售订单列表
 * @param params
 * @returns 销售订单列表
 */
export function salesOrderExport(params?: SalesOrderQuery) {
  return commonExport('/erp/salesOrder/export', params ?? {});
}

/**
 * 查询销售订单详情
 * @param id id
 * @returns 销售订单详情
 */
export function salesOrderInfo(id: ID) {
  return alovaInstance.get<SalesOrderVO>(`/erp/salesOrder/${id}`);
}

/**
 * 新增销售订单
 * @param data
 * @returns void
 */
export function salesOrderAdd(data: SalesOrderForm) {
  return alovaInstance.postWithMsg<void>('/erp/salesOrder', data);
}

/**
 * 更新销售订单
 * @param data
 * @returns void
 */
export function salesOrderUpdate(data: SalesOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/salesOrder', data);
}

/**
 * 删除销售订单
 * @param id id
 * @returns void
 */
export function salesOrderRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/salesOrder/${id}`);
}

/**
 * 审批销售订单
 * @param id id
 * @returns void
 */
export function salesOrderApprove(data?: SalesOrderForm) {
  return alovaInstance.putWithMsg<void>(`/erp/salesOrder/approval`, data);
}

/**
 * 反审批销售订单
 * @param id id
 * @returns void
 */
export function salesOrderUnApprove(data?: SalesOrderForm) {
  return alovaInstance.putWithMsg<void>(`/erp/salesOrder/reverseApproval`, data);
}

/**
 * 查询销售订单全流程跟踪步骤
 * @param id id
 * @returns void
 */
export function salesOrderWorkflow(salesOrderItemId?: number) {
  return alovaInstance.getWithMsg<SalesOrderStepVo[]>(`/erp/salesOrder/workflow`, { params: { salesOrderItemId } });
}

