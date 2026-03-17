import type {
  CrmCustomerLiaisonForm,
  CrmCustomerLiaisonQuery,
  CrmCustomerLiaisonVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户联系人列表
 * @param params
 * @returns 客户-客户联系人列表
 */
export function crmCustomerLiaisonList(params?: CrmCustomerLiaisonQuery) {
  return requestClient.get<PageResult<CrmCustomerLiaisonVO>>(
    '/crm/crmCustomerLiaison/list',
    { params },
  );
}

/**
 * 导出客户-客户联系人列表
 * @param params
 * @returns 客户-客户联系人列表
 */
export function crmCustomerLiaisonExport(params?: CrmCustomerLiaisonQuery) {
  return commonExport('/crm/crmCustomerLiaison/export', params ?? {});
}

/**
 * 查询客户-客户联系人详情
 * @param id id
 * @returns 客户-客户联系人详情
 */
export function crmCustomerLiaisonInfo(id: ID) {
  return requestClient.get<CrmCustomerLiaisonVO>(
    `/crm/crmCustomerLiaison/${id}`,
  );
}

/**
 * 新增客户-客户联系人
 * @param data
 * @returns void
 */
export function crmCustomerLiaisonAdd(data: CrmCustomerLiaisonForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomerLiaison', data);
}

/**
 * 更新客户-客户联系人
 * @param data
 * @returns void
 */
export function crmCustomerLiaisonUpdate(data: CrmCustomerLiaisonForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomerLiaison', data);
}

/**
 * 删除客户-客户联系人
 * @param id id
 * @returns void
 */
export function crmCustomerLiaisonRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomerLiaison/${id}`);
}
