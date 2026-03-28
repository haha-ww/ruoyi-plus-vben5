import type { MaterialBomSubVO, MaterialBomSubForm, MaterialBomSubQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询物料bom子项列表
* @param params
* @returns 物料bom子项列表
*/
export function materialBomSubList(params?: MaterialBomSubQuery) {
  return alovaInstance.get<PageResult<MaterialBomSubVO>>('/erp/materialBomSub/list', { params });
}

/**
 * 导出物料bom子项列表
 * @param params
 * @returns 物料bom子项列表
 */
export function materialBomSubExport(params?: MaterialBomSubQuery) {
  return commonExport('/erp/materialBomSub/export', params ?? {});
}

/**
 * 查询物料bom子项详情
 * @param id id
 * @returns 物料bom子项详情
 */
export function materialBomSubInfo(id: ID) {
  return alovaInstance.get<MaterialBomSubVO>(`/erp/materialBomSub/${id}`);
}

/**
 * 新增物料bom子项
 * @param data
 * @returns void
 */
export function materialBomSubAdd(data: MaterialBomSubForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialBomSub', data);
}

/**
 * 更新物料bom子项
 * @param data
 * @returns void
 */
export function materialBomSubUpdate(data: MaterialBomSubForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialBomSub', data);
}

/**
 * 删除物料bom子项
 * @param id id
 * @returns void
 */
export function materialBomSubRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialBomSub/${id}`);
}
