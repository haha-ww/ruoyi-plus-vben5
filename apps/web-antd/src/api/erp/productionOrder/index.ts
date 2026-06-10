import type { ProductionOrderForm, ProductionOrderQuery, ProductionOrderVO } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产订单列表
* @param params
* @returns 生产订单列表
*/
export function productionOrderList(params?: ProductionOrderQuery) {
  return alovaInstance.get<PageResult<ProductionOrderVO>>('/erp/productionOrder/list', { params });
}

/**
 * 导出生产订单列表
 * @param params
 * @returns 生产订单列表
 */
export function productionOrderExport(params?: ProductionOrderQuery) {
  return commonExport('/erp/productionOrder/export', params ?? {});
}

/**
 * 查询生产订单详情
 * @param id id
 * @returns 生产订单详情
 */
export function productionOrderInfo(id: ID) {
  return alovaInstance.get<ProductionOrderVO>(`/erp/productionOrder/${id}`);
}

/**
 * 新增生产订单
 * @param data
 * @returns void
 */
export function productionOrderAdd(data: ProductionOrderForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionOrder', data);
}

/**
 * 更新生产订单
 * @param data
 * @returns void
 */
export function productionOrderUpdate(data: ProductionOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionOrder', data);
}

/**
 * 删除生产订单
 * @param id id
 * @returns void
 */
export function productionOrderRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionOrder/${id}`);
}

/**
 * 根据生产订单ID查询领料数据（用于生成领料单）
 * @param id 生产订单ID
 * @returns 领料数据列表
 */
export function getProductionOrderPickList(id: ID) {
  return alovaInstance.get<any>(`/erp/productionOrder/pickList/${id}`);
}
