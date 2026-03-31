import type { ProductionInboundOrderItemVO, ProductionInboundOrderItemForm, ProductionInboundOrderItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产入库单明细列表
* @param params
* @returns 生产入库单明细列表
*/
export function productionInboundOrderItemList(params?: ProductionInboundOrderItemQuery) {
  return alovaInstance.get<PageResult<ProductionInboundOrderItemVO>>('/erp/productionInboundOrderItem/list', { params });
}

/**
 * 导出生产入库单明细列表
 * @param params
 * @returns 生产入库单明细列表
 */
export function productionInboundOrderItemExport(params?: ProductionInboundOrderItemQuery) {
  return commonExport('/erp/productionInboundOrderItem/export', params ?? {});
}

/**
 * 查询生产入库单明细详情
 * @param id id
 * @returns 生产入库单明细详情
 */
export function productionInboundOrderItemInfo(id: ID) {
  return alovaInstance.get<ProductionInboundOrderItemVO>(`/erp/productionInboundOrderItem/${id}`);
}

/**
 * 新增生产入库单明细
 * @param data
 * @returns void
 */
export function productionInboundOrderItemAdd(data: ProductionInboundOrderItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionInboundOrderItem', data);
}

/**
 * 更新生产入库单明细
 * @param data
 * @returns void
 */
export function productionInboundOrderItemUpdate(data: ProductionInboundOrderItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionInboundOrderItem', data);
}

/**
 * 删除生产入库单明细
 * @param id id
 * @returns void
 */
export function productionInboundOrderItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionInboundOrderItem/${id}`);
}
