import type { OtherOutboundVO, OtherOutboundForm, OtherOutboundQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询其他出库列表
* @param params
* @returns 其他出库列表
*/
export function otherOutboundList(params?: OtherOutboundQuery) {
  return alovaInstance.get<PageResult<OtherOutboundVO>>('/erp/otherOutbound/list', { params });
}

/**
 * 导出其他出库列表
 * @param params
 * @returns 其他出库列表
 */
export function otherOutboundExport(params?: OtherOutboundQuery) {
  return commonExport('/erp/otherOutbound/export', params ?? {});
}

/**
 * 查询其他出库详情
 * @param id id
 * @returns 其他出库详情
 */
export function otherOutboundInfo(id: ID) {
  return alovaInstance.get<OtherOutboundVO>(`/erp/otherOutbound/${id}`);
}

/**
 * 新增其他出库
 * @param data
 * @returns void
 */
export function otherOutboundAdd(data: OtherOutboundForm) {
  return alovaInstance.postWithMsg<void>('/erp/otherOutbound', data);
}

/**
 * 更新其他出库
 * @param data
 * @returns void
 */
export function otherOutboundUpdate(data: OtherOutboundForm) {
  return alovaInstance.putWithMsg<void>('/erp/otherOutbound', data);
}

/**
 * 删除其他出库
 * @param id id
 * @returns void
 */
export function otherOutboundRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/otherOutbound/${id}`);
}
