import type { CrmCustomerForm, CrmCustomerQuery, CrmCustomerVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户档案列表
 * @param params
 * @returns 客户-客户档案列表
 */
export function crmCustomerList(params?: CrmCustomerQuery) {
  return requestClient.get<PageResult<CrmCustomerVO>>('/crm/crmCustomer/list', {
    params,
  });
}

/**
 * 查询客户下拉列表
 * @param params
 * @returns 客户-客户档案列表
 */
export function crmCustomerSelectList(params?: CrmCustomerQuery) {
  return requestClient.get<PageResult<CrmCustomerVO>>(
    '/crm/crmCustomer/selectList',
    {
      params,
    },
  );
}
/**
 * 导出客户-客户档案列表
 * @param params
 * @returns 客户-客户档案列表
 */
export function crmCustomerExport(params?: CrmCustomerQuery) {
  return commonExport('/crm/crmCustomer/export', params ?? {});
}

/**
 * 查询客户-客户档案详情
 * @param id id
 * @returns 客户-客户档案详情
 */
export function crmCustomerInfo(id: ID) {
  return requestClient.get<CrmCustomerVO>(`/crm/crmCustomer/${id}`);
}

/**
 * 新增客户-客户档案
 * @param data
 * @returns void
 */
export function crmCustomerAdd(data: CrmCustomerForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomer', data);
}

/**
 * 更新客户-客户档案
 * @param data
 * @returns void
 */
export function crmCustomerUpdate(data: CrmCustomerForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomer', data);
}

/**
 * 删除客户-客户档案
 * @param id id
 * @returns void
 */
export function crmCustomerRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomer/${id}`);
}
