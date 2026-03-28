import type { OtherInboundVO, OtherInboundForm, OtherInboundQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询其他入库列表
* @param params
* @returns 其他入库列表
*/
export function otherInboundList(params?: OtherInboundQuery) {
  return alovaInstance.get<PageResult<OtherInboundVO>>('/erp/otherInbound/list', { params });
}

/**
 * 导出其他入库列表
 * @param params
 * @returns 其他入库列表
 */
export function otherInboundExport(params?: OtherInboundQuery) {
  return commonExport('/erp/otherInbound/export', params ?? {});
}

/**
 * 查询其他入库详情
 * @param id id
 * @returns 其他入库详情
 */
export function otherInboundInfo(id: ID) {
  return alovaInstance.get<OtherInboundVO>(`/erp/otherInbound/${id}`);
}

/**
 * 新增其他入库
 * @param data
 * @returns void
 */
export function otherInboundAdd(data: OtherInboundForm) {
  return alovaInstance.postWithMsg<void>('/erp/otherInbound', data);
}

/**
 * 更新其他入库
 * @param data
 * @returns void
 */
export function otherInboundUpdate(data: OtherInboundForm) {
  return alovaInstance.putWithMsg<void>('/erp/otherInbound', data);
}

/**
 * 删除其他入库
 * @param id id
 * @returns void
 */
export function otherInboundRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/otherInbound/${id}`);
}
