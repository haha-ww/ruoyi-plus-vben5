import type { SalesReturnVO, SalesReturnForm, SalesReturnQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询销售退货列表
* @param params
* @returns 销售退货列表
*/
export function salesReturnList(params?: SalesReturnQuery) {
  return alovaInstance.get<PageResult<SalesReturnVO>>('/erp/salesReturn/list', { params });
}

/**
 * 导出销售退货列表
 * @param params
 * @returns 销售退货列表
 */
export function salesReturnExport(params?: SalesReturnQuery) {
  return commonExport('/erp/salesReturn/export', params ?? {});
}

/**
 * 查询销售退货详情
 * @param id id
 * @returns 销售退货详情
 */
export function salesReturnInfo(id: ID) {
  return alovaInstance.get<SalesReturnVO>(`/erp/salesReturn/${id}`);
}

/**
 * 新增销售退货
 * @param data
 * @returns void
 */
export function salesReturnAdd(data: SalesReturnForm) {
  return alovaInstance.postWithMsg<void>('/erp/salesReturn', data);
}

/**
 * 更新销售退货
 * @param data
 * @returns void
 */
export function salesReturnUpdate(data: SalesReturnForm) {
  return alovaInstance.putWithMsg<void>('/erp/salesReturn', data);
}

/**
 * 删除销售退货
 * @param id id
 * @returns void
 */
export function salesReturnRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/salesReturn/${id}`);
}
