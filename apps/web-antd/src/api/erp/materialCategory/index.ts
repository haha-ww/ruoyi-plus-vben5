import type { MaterialCategoryVO, MaterialCategoryForm, MaterialCategoryQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询物料分类列表
* @param params
* @returns 物料分类列表
*/
export function materialCategoryList(params?: MaterialCategoryQuery) {
  return alovaInstance.get<PageResult<MaterialCategoryVO>>('/erp/materialCategory/list', { params });
}

/**
 * 导出物料分类列表
 * @param params
 * @returns 物料分类列表
 */
export function materialCategoryExport(params?: MaterialCategoryQuery) {
  return commonExport('/erp/materialCategory/export', params ?? {});
}

/**
 * 查询物料分类详情
 * @param id id
 * @returns 物料分类详情
 */
export function materialCategoryInfo(id: ID) {
  return alovaInstance.get<MaterialCategoryVO>(`/erp/materialCategory/${id}`);
}

/**
 * 新增物料分类
 * @param data
 * @returns void
 */
export function materialCategoryAdd(data: MaterialCategoryForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialCategory', data);
}

/**
 * 更新物料分类
 * @param data
 * @returns void
 */
export function materialCategoryUpdate(data: MaterialCategoryForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialCategory', data);
}

/**
 * 删除物料分类
 * @param id id
 * @returns void
 */
export function materialCategoryRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialCategory/${id}`);
}
