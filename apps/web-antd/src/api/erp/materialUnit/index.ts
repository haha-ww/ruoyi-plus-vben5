import type { MaterialUnitVO, MaterialUnitForm, MaterialUnitQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询物料计量单位列表
* @param params
* @returns 物料计量单位列表
*/
export function materialUnitList(params?: MaterialUnitQuery) {
  return alovaInstance.get<PageResult<MaterialUnitVO>>('/erp/materialUnit/list', { params });
}

/**
 * 导出物料计量单位列表
 * @param params
 * @returns 物料计量单位列表
 */
export function materialUnitExport(params?: MaterialUnitQuery) {
  return commonExport('/erp/materialUnit/export', params ?? {});
}

/**
 * 查询物料计量单位详情
 * @param id id
 * @returns 物料计量单位详情
 */
export function materialUnitInfo(id: ID) {
  return alovaInstance.get<MaterialUnitVO>(`/erp/materialUnit/${id}`);
}

/**
 * 新增物料计量单位
 * @param data
 * @returns void
 */
export function materialUnitAdd(data: MaterialUnitForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialUnit', data);
}

/**
 * 更新物料计量单位
 * @param data
 * @returns void
 */
export function materialUnitUpdate(data: MaterialUnitForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialUnit', data);
}

/**
 * 删除物料计量单位
 * @param id id
 * @returns void
 */
export function materialUnitRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialUnit/${id}`);
}
