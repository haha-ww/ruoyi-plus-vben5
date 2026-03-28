import type { OtherInboundItemVO, OtherInboundItemForm, OtherInboundItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询其他入库单明细列表
* @param params
* @returns 其他入库单明细列表
*/
export function otherInboundItemList(params?: OtherInboundItemQuery) {
  return alovaInstance.get<PageResult<OtherInboundItemVO>>('/erp/otherInboundItem/list', { params });
}

/**
 * 导出其他入库单明细列表
 * @param params
 * @returns 其他入库单明细列表
 */
export function otherInboundItemExport(params?: OtherInboundItemQuery) {
  return commonExport('/erp/otherInboundItem/export', params ?? {});
}

/**
 * 查询其他入库单明细详情
 * @param id id
 * @returns 其他入库单明细详情
 */
export function otherInboundItemInfo(id: ID) {
  return alovaInstance.get<OtherInboundItemVO>(`/erp/otherInboundItem/${id}`);
}

/**
 * 新增其他入库单明细
 * @param data
 * @returns void
 */
export function otherInboundItemAdd(data: OtherInboundItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/otherInboundItem', data);
}

/**
 * 更新其他入库单明细
 * @param data
 * @returns void
 */
export function otherInboundItemUpdate(data: OtherInboundItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/otherInboundItem', data);
}

/**
 * 删除其他入库单明细
 * @param id id
 * @returns void
 */
export function otherInboundItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/otherInboundItem/${id}`);
}
