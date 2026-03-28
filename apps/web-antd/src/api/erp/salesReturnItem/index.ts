import type { SalesReturnItemVO, SalesReturnItemForm, SalesReturnItemQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询销售退货明细列表
* @param params
* @returns 销售退货明细列表
*/
export function salesReturnItemList(params?: SalesReturnItemQuery) {
  return alovaInstance.get<PageResult<SalesReturnItemVO>>('/erp/salesReturnItem/list', { params });
}

/**
 * 导出销售退货明细列表
 * @param params
 * @returns 销售退货明细列表
 */
export function salesReturnItemExport(params?: SalesReturnItemQuery) {
  return commonExport('/erp/salesReturnItem/export', params ?? {});
}

/**
 * 查询销售退货明细详情
 * @param id id
 * @returns 销售退货明细详情
 */
export function salesReturnItemInfo(id: ID) {
  return alovaInstance.get<SalesReturnItemVO>(`/erp/salesReturnItem/${id}`);
}

/**
 * 新增销售退货明细
 * @param data
 * @returns void
 */
export function salesReturnItemAdd(data: SalesReturnItemForm) {
  return alovaInstance.postWithMsg<void>('/erp/salesReturnItem', data);
}

/**
 * 更新销售退货明细
 * @param data
 * @returns void
 */
export function salesReturnItemUpdate(data: SalesReturnItemForm) {
  return alovaInstance.putWithMsg<void>('/erp/salesReturnItem', data);
}

/**
 * 删除销售退货明细
 * @param id id
 * @returns void
 */
export function salesReturnItemRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/salesReturnItem/${id}`);
}
