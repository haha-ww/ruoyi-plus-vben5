import type { OtherOutboundItemVO, OtherOutboundItemForm, OtherOutboundItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询其他出库单明细列表
* @param params
* @returns 其他出库单明细列表
*/
export function otherOutboundItemList(params?: OtherOutboundItemQuery) {
  return alovaInstance.get<PageResult<OtherOutboundItemVO>>('/erp/otherOutboundItem/list', { params });
}

/**
 * 导出其他出库单明细列表
 * @param params
 * @returns 其他出库单明细列表
 */
export function otherOutboundItemExport(params?: OtherOutboundItemQuery) {
  return commonExport('/erp/otherOutboundItem/export', params ?? {});
}

/**
 * 查询其他出库单明细详情
 * @param id id
 * @returns 其他出库单明细详情
 */
export function otherOutboundItemInfo(id: ID) {
  return alovaInstance.get<OtherOutboundItemVO>(`/erp/otherOutboundItem/${id}`);
}

/**
 * 新增其他出库单明细
 * @param data
 * @returns void
 */
export function otherOutboundItemAdd(data: OtherOutboundItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/otherOutboundItem', data);
}

/**
 * 更新其他出库单明细
 * @param data
 * @returns void
 */
export function otherOutboundItemUpdate(data: OtherOutboundItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/otherOutboundItem', data);
}

/**
 * 删除其他出库单明细
 * @param id id
 * @returns void
 */
export function otherOutboundItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/otherOutboundItem/${id}`);
}
