import type { ProductionReturnVO, ProductionReturnForm, ProductionReturnQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询领料退货列表
* @param params
* @returns 领料退货列表
*/
export function productionReturnList(params?: ProductionReturnQuery) {
  return alovaInstance.get<PageResult<ProductionReturnVO>>('/erp/productionReturn/list', { params });
}

/**
 * 导出领料退货列表
 * @param params
 * @returns 领料退货列表
 */
export function productionReturnExport(params?: ProductionReturnQuery) {
  return commonExport('/erp/productionReturn/export', params ?? {});
}

/**
 * 查询领料退货详情
 * @param id id
 * @returns 领料退货详情
 */
export function productionReturnInfo(id: ID) {
  return alovaInstance.get<ProductionReturnVO>(`/erp/productionReturn/${id}`);
}

/**
 * 新增领料退货
 * @param data
 * @returns void
 */
export function productionReturnAdd(data: ProductionReturnForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionReturn', data);
}

/**
 * 更新领料退货
 * @param data
 * @returns void
 */
export function productionReturnUpdate(data: ProductionReturnForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionReturn', data);
}

/**
 * 删除领料退货
 * @param id id
 * @returns void
 */
export function productionReturnRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionReturn/${id}`);
}
