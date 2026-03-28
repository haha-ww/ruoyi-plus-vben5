import type { ProductionInspectionItemVO, ProductionInspectionItemForm, ProductionInspectionItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产质检明细列表
* @param params
* @returns 生产质检明细列表
*/
export function productionInspectionItemList(params?: ProductionInspectionItemQuery) {
  return alovaInstance.get<PageResult<ProductionInspectionItemVO>>('/erp/productionInspectionItem/list', { params });
}

/**
 * 导出生产质检明细列表
 * @param params
 * @returns 生产质检明细列表
 */
export function productionInspectionItemExport(params?: ProductionInspectionItemQuery) {
  return commonExport('/erp/productionInspectionItem/export', params ?? {});
}

/**
 * 查询生产质检明细详情
 * @param id id
 * @returns 生产质检明细详情
 */
export function productionInspectionItemInfo(id: ID) {
  return alovaInstance.get<ProductionInspectionItemVO>(`/erp/productionInspectionItem/${id}`);
}

/**
 * 新增生产质检明细
 * @param data
 * @returns void
 */
export function productionInspectionItemAdd(data: ProductionInspectionItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionInspectionItem', data);
}

/**
 * 更新生产质检明细
 * @param data
 * @returns void
 */
export function productionInspectionItemUpdate(data: ProductionInspectionItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionInspectionItem', data);
}

/**
 * 删除生产质检明细
 * @param id id
 * @returns void
 */
export function productionInspectionItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionInspectionItem/${id}`);
}
