import type { MaterialBomForm, MaterialBomQuery, MaterialBomVO } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询物料bom列表
* @param params
* @returns 物料bom列表
*/
export function materialBomList(params?: MaterialBomQuery) {
  return alovaInstance.get<PageResult<MaterialBomVO>>('/erp/materialBom/list', { params });
}

/**
 * 导出物料bom列表
 * @param params
 * @returns 物料bom列表
 */
export function materialBomExport(params?: MaterialBomQuery) {
  return commonExport('/erp/materialBom/export', params ?? {});
}

/**
 * 查询物料bom详情
 * @param id id
 * @returns 物料bom详情
 */
export function materialBomInfo(id: ID) {
  return alovaInstance.get<MaterialBomVO>(`/erp/materialBom/${id}`);
}

/**
 * 新增物料bom
 * @param data
 * @returns void
 */
export function materialBomAdd(data: MaterialBomForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialBom', data);
}

/**
 * 更新物料bom
 * @param data
 * @returns void
 */
export function materialBomUpdate(data: MaterialBomForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialBom', data);
}

/**
 * 删除物料bom
 * @param id id
 * @returns void
 */
export function materialBomRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialBom/${id}`);
}

/**
 * 获取bom树
 * @param query
 */
export function getMaterialBomTree(query: MaterialBomQuery) {
  return alovaInstance.get<MaterialBomVO[]>('/erp/materialBom/getBomTree', {
    params: query
  });
};
