import type { MaterialInfoVO, MaterialInfoForm, MaterialInfoQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询物料信息列表
* @param params
* @returns 物料信息列表
*/
export function materialInfoList(params?: MaterialInfoQuery) {
  return alovaInstance.get<PageResult<MaterialInfoVO>>('/erp/materialInfo/list', { params });
}

/**
 * 导出物料信息列表
 * @param params
 * @returns 物料信息列表
 */
export function materialInfoExport(params?: MaterialInfoQuery) {
  return commonExport('/erp/materialInfo/export', params ?? {});
}

/**
 * 查询物料信息详情
 * @param id id
 * @returns 物料信息详情
 */
export function materialInfoInfo(id: ID) {
  return alovaInstance.get<MaterialInfoVO>(`/erp/materialInfo/${id}`);
}

/**
 * 新增物料信息
 * @param data
 * @returns void
 */
export function materialInfoAdd(data: MaterialInfoForm) {
  return alovaInstance.postWithMsg<void>('/erp/materialInfo', data);
}

/**
 * 更新物料信息
 * @param data
 * @returns void
 */
export function materialInfoUpdate(data: MaterialInfoForm) {
  return alovaInstance.putWithMsg<void>('/erp/materialInfo', data);
}

/**
 * 删除物料信息
 * @param id id
 * @returns void
 */
export function materialInfoRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/materialInfo/${id}`);
}
