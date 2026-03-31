import type { ProductionInspectionVO, ProductionInspectionForm, ProductionInspectionQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产质检列表
* @param params
* @returns 生产质检列表
*/
export function productionInspectionList(params?: ProductionInspectionQuery) {
  return alovaInstance.get<PageResult<ProductionInspectionVO>>('/erp/productionInspection/list', { params });
}

/**
 * 导出生产质检列表
 * @param params
 * @returns 生产质检列表
 */
export function productionInspectionExport(params?: ProductionInspectionQuery) {
  return commonExport('/erp/productionInspection/export', params ?? {});
}

/**
 * 查询生产质检详情
 * @param id id
 * @returns 生产质检详情
 */
export function productionInspectionInfo(id: ID) {
  return alovaInstance.get<ProductionInspectionVO>(`/erp/productionInspection/${id}`);
}

/**
 * 新增生产质检
 * @param data
 * @returns void
 */
export function productionInspectionAdd(data: ProductionInspectionForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionInspection', data);
}

/**
 * 更新生产质检
 * @param data
 * @returns void
 */
export function productionInspectionUpdate(data: ProductionInspectionForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionInspection', data);
}

/**
 * 删除生产质检
 * @param id id
 * @returns void
 */
export function productionInspectionRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionInspection/${id}`);
}
