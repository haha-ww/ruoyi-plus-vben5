import type { ProductionInboundOrderVO, ProductionInboundOrderForm, ProductionInboundOrderQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产入库列表
* @param params
* @returns 生产入库列表
*/
export function productionInboundOrderList(params?: ProductionInboundOrderQuery) {
  return alovaInstance.get<PageResult<ProductionInboundOrderVO>>('/erp/productionInboundOrder/list', { params });
}

/**
 * 导出生产入库列表
 * @param params
 * @returns 生产入库列表
 */
export function productionInboundOrderExport(params?: ProductionInboundOrderQuery) {
  return commonExport('/erp/productionInboundOrder/export', params ?? {});
}

/**
 * 查询生产入库详情
 * @param id id
 * @returns 生产入库详情
 */
export function productionInboundOrderInfo(id: ID) {
  return alovaInstance.get<ProductionInboundOrderVO>(`/erp/productionInboundOrder/${id}`);
}

/**
 * 新增生产入库
 * @param data
 * @returns void
 */
export function productionInboundOrderAdd(data: ProductionInboundOrderForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionInboundOrder', data);
}

/**
 * 更新生产入库
 * @param data
 * @returns void
 */
export function productionInboundOrderUpdate(data: ProductionInboundOrderForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionInboundOrder', data);
}

/**
 * 删除生产入库
 * @param id id
 * @returns void
 */
export function productionInboundOrderRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionInboundOrder/${id}`);
}
