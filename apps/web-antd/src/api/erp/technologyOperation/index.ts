import type { TechnologyOperationVO, TechnologyOperationForm, TechnologyOperationQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询erp-标准工序库列表
* @param params
* @returns erp-标准工序库列表
*/
export function technologyOperationList(params?: TechnologyOperationQuery) {
  return alovaInstance.get<PageResult<TechnologyOperationVO>>('/erp/technologyOperation/list', { params });
}

/**
 * 导出erp-标准工序库列表
 * @param params
 * @returns erp-标准工序库列表
 */
export function technologyOperationExport(params?: TechnologyOperationQuery) {
  return commonExport('/erp/technologyOperation/export', params ?? {});
}

/**
 * 查询erp-标准工序库详情
 * @param id id
 * @returns erp-标准工序库详情
 */
export function technologyOperationInfo(id: ID) {
  return alovaInstance.get<TechnologyOperationVO>(`/erp/technologyOperation/${id}`);
}

/**
 * 新增erp-标准工序库
 * @param data
 * @returns void
 */
export function technologyOperationAdd(data: TechnologyOperationForm) {
  return alovaInstance.postWithMsg<void>('/erp/technologyOperation', data);
}

/**
 * 更新erp-标准工序库
 * @param data
 * @returns void
 */
export function technologyOperationUpdate(data: TechnologyOperationForm) {
  return alovaInstance.putWithMsg<void>('/erp/technologyOperation', data);
}

/**
 * 删除erp-标准工序库
 * @param id id
 * @returns void
 */
export function technologyOperationRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/technologyOperation/${id}`);
}
