import type { ProductionReturnItemVO, ProductionReturnItemForm, ProductionReturnItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询领料退货单明细列表
* @param params
* @returns 领料退货单明细列表
*/
export function productionReturnItemList(params?: ProductionReturnItemQuery) {
  return alovaInstance.get<PageResult<ProductionReturnItemVO>>('/erp/productionReturnItem/list', { params });
}

/**
 * 导出领料退货单明细列表
 * @param params
 * @returns 领料退货单明细列表
 */
export function productionReturnItemExport(params?: ProductionReturnItemQuery) {
  return commonExport('/erp/productionReturnItem/export', params ?? {});
}

/**
 * 查询领料退货单明细详情
 * @param id id
 * @returns 领料退货单明细详情
 */
export function productionReturnItemInfo(id: ID) {
  return alovaInstance.get<ProductionReturnItemVO>(`/erp/productionReturnItem/${id}`);
}

/**
 * 新增领料退货单明细
 * @param data
 * @returns void
 */
export function productionReturnItemAdd(data: ProductionReturnItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionReturnItem', data);
}

/**
 * 更新领料退货单明细
 * @param data
 * @returns void
 */
export function productionReturnItemUpdate(data: ProductionReturnItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionReturnItem', data);
}

/**
 * 删除领料退货单明细
 * @param id id
 * @returns void
 */
export function productionReturnItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionReturnItem/${id}`);
}
