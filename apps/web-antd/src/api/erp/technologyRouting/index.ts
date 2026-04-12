import type { TechnologyRoutingVO, TechnologyRoutingForm, TechnologyRoutingQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询erp-工艺路线列表
* @param params
* @returns erp-工艺路线列表
*/
export function technologyRoutingList(params?: TechnologyRoutingQuery) {
  return alovaInstance.get<PageResult<TechnologyRoutingVO>>('/erp/technologyRouting/list', { params });
}

/**
 * 导出erp-工艺路线列表
 * @param params
 * @returns erp-工艺路线列表
 */
export function technologyRoutingExport(params?: TechnologyRoutingQuery) {
  return commonExport('/erp/technologyRouting/export', params ?? {});
}

/**
 * 查询erp-工艺路线详情
 * @param id id
 * @returns erp-工艺路线详情
 */
export function technologyRoutingInfo(id: ID) {
  return alovaInstance.get<TechnologyRoutingVO>(`/erp/technologyRouting/${id}`);
}

/**
 * 新增erp-工艺路线
 * @param data
 * @returns void
 */
export function technologyRoutingAdd(data: TechnologyRoutingForm) {
  return alovaInstance.postWithMsg<void>('/erp/technologyRouting', data);
}

/**
 * 更新erp-工艺路线
 * @param data
 * @returns void
 */
export function technologyRoutingUpdate(data: TechnologyRoutingForm) {
  return alovaInstance.putWithMsg<void>('/erp/technologyRouting', data);
}

/**
 * 删除erp-工艺路线
 * @param id id
 * @returns void
 */
export function technologyRoutingRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/technologyRouting/${id}`);
}
