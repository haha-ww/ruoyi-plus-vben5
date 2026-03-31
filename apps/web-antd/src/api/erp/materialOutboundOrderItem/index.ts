import type { MaterialOutboundOrderItemVO, MaterialOutboundOrderItemForm, MaterialOutboundOrderItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询领料出库单明细列表
* @param params
* @returns 领料出库单明细列表
*/
export function materialOutboundOrderItemList(params?: MaterialOutboundOrderItemQuery) {
  return alovaInstance.get<PageResult<MaterialOutboundOrderItemVO>>('/erp/materialOutboundOrderItem/list', { params });
}

/**
 * 导出领料出库单明细列表
 * @param params
 * @returns 领料出库单明细列表
 */
export function materialOutboundOrderItemExport(params?: MaterialOutboundOrderItemQuery) {
  return commonExport('/erp/materialOutboundOrderItem/export', params ?? {});
}

/**
 * 查询领料出库单明细详情
 * @param id id
 * @returns 领料出库单明细详情
 */
export function materialOutboundOrderItemInfo(id: ID) {
  return alovaInstance.get<MaterialOutboundOrderItemVO>(`/erp/materialOutboundOrderItem/${id}`);
}

/**
 * 新增领料出库单明细
 * @param data
 * @returns void
 */
export function materialOutboundOrderItemAdd(data: MaterialOutboundOrderItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialOutboundOrderItem', data);
}

/**
 * 更新领料出库单明细
 * @param data
 * @returns void
 */
export function materialOutboundOrderItemUpdate(data: MaterialOutboundOrderItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialOutboundOrderItem', data);
}

/**
 * 删除领料出库单明细
 * @param id id
 * @returns void
 */
export function materialOutboundOrderItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialOutboundOrderItem/${id}`);
}
