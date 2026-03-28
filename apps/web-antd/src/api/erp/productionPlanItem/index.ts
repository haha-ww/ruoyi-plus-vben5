import type { ProductionPlanItemVO, ProductionPlanItemForm, ProductionPlanItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产计划明细列表
* @param params
* @returns 生产计划明细列表
*/
export function productionPlanItemList(params?: ProductionPlanItemQuery) {
  return alovaInstance.get<PageResult<ProductionPlanItemVO>>('/erp/productionPlanItem/list', { params });
}

/**
 * 导出生产计划明细列表
 * @param params
 * @returns 生产计划明细列表
 */
export function productionPlanItemExport(params?: ProductionPlanItemQuery) {
  return commonExport('/erp/productionPlanItem/export', params ?? {});
}

/**
 * 查询生产计划明细详情
 * @param id id
 * @returns 生产计划明细详情
 */
export function productionPlanItemInfo(id: ID) {
  return alovaInstance.get<ProductionPlanItemVO>(`/erp/productionPlanItem/${id}`);
}

/**
 * 新增生产计划明细
 * @param data
 * @returns void
 */
export function productionPlanItemAdd(data: ProductionPlanItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionPlanItem', data);
}

/**
 * 更新生产计划明细
 * @param data
 * @returns void
 */
export function productionPlanItemUpdate(data: ProductionPlanItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionPlanItem', data);
}

/**
 * 删除生产计划明细
 * @param id id
 * @returns void
 */
export function productionPlanItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionPlanItem/${id}`);
}
