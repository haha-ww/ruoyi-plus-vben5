import type { TechnologyRoutingOperationVO, TechnologyRoutingOperationForm, TechnologyRoutingOperationQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询erp-工艺路线明细列表
* @param params
* @returns erp-工艺路线明细列表
*/
export function technologyRoutingOperationList(params?: TechnologyRoutingOperationQuery) {
  return alovaInstance.get<PageResult<TechnologyRoutingOperationVO>>('/erp/technologyRoutingOperation/list', { params });
}

/**
 * 导出erp-工艺路线明细列表
 * @param params
 * @returns erp-工艺路线明细列表
 */
export function technologyRoutingOperationExport(params?: TechnologyRoutingOperationQuery) {
  return commonExport('/erp/technologyRoutingOperation/export', params ?? {});
}

/**
 * 查询erp-工艺路线明细详情
 * @param id id
 * @returns erp-工艺路线明细详情
 */
export function technologyRoutingOperationInfo(id: ID) {
  return alovaInstance.get<TechnologyRoutingOperationVO>(`/erp/technologyRoutingOperation/${id}`);
}

/**
 * 新增erp-工艺路线明细
 * @param data
 * @returns void
 */
export function technologyRoutingOperationAdd(data: TechnologyRoutingOperationForm) {
  return alovaInstance.postWithMsg<void>('/erp/technologyRoutingOperation', data);
}

/**
 * 更新erp-工艺路线明细
 * @param data
 * @returns void
 */
export function technologyRoutingOperationUpdate(data: TechnologyRoutingOperationForm) {
  return alovaInstance.putWithMsg<void>('/erp/technologyRoutingOperation', data);
}

/**
 * 删除erp-工艺路线明细
 * @param id id
 * @returns void
 */
export function technologyRoutingOperationRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/technologyRoutingOperation/${id}`);
}
