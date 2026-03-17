import type {
  CrmCustomerFollowForm,
  CrmCustomerFollowQuery,
  CrmCustomerFollowVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户跟进记录列表
 * @param params
 * @returns 客户-客户跟进记录列表
 */
export function crmCustomerFollowList(params?: CrmCustomerFollowQuery) {
  return requestClient.get<PageResult<CrmCustomerFollowVO>>(
    '/crm/crmCustomerFollow/list',
    { params },
  );
}

/**
 * 导出客户-客户跟进记录列表
 * @param params
 * @returns 客户-客户跟进记录列表
 */
export function crmCustomerFollowExport(params?: CrmCustomerFollowQuery) {
  return commonExport('/crm/crmCustomerFollow/export', params ?? {});
}

/**
 * 查询客户-客户跟进记录详情
 * @param id id
 * @returns 客户-客户跟进记录详情
 */
export function crmCustomerFollowInfo(id: ID) {
  return requestClient.get<CrmCustomerFollowVO>(`/crm/crmCustomerFollow/${id}`);
}

/**
 * 新增客户-客户跟进记录
 * @param data
 * @returns void
 */
export function crmCustomerFollowAdd(data: CrmCustomerFollowForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomerFollow', data);
}

/**
 * 更新客户-客户跟进记录
 * @param data
 * @returns void
 */
export function crmCustomerFollowUpdate(data: CrmCustomerFollowForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomerFollow', data);
}

/**
 * 删除客户-客户跟进记录
 * @param id id
 * @returns void
 */
export function crmCustomerFollowRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomerFollow/${id}`);
}
