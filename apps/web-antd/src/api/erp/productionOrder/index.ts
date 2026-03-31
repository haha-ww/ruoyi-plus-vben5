import type { ProductionOrderVO, ProductionOrderForm, ProductionOrderQuery } from './model';

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
