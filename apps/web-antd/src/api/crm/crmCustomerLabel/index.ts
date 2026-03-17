import type {
  CrmCustomerLabelForm,
  CrmCustomerLabelQuery,
  CrmCustomerLabelVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户标签列表
 * @param params
 * @returns 客户-客户标签列表
 */
export function crmCustomerLabelList(params?: CrmCustomerLabelQuery) {
  return requestClient.get<PageResult<CrmCustomerLabelVO>>(
    '/crm/crmCustomerLabel/list',
    { params },
  );
}

/**
 * 查询客户-客户标签下拉列表
 * @param params
 * @returns 客户-客户标签下拉列表
 */
export function labelSelectList(params?: CrmCustomerLabelQuery) {
  return requestClient.get<CrmCustomerLabelVO>(
    '/crm/crmCustomerLabel/selectList',
    { params },
  );
}

/**
 * 导出客户-客户标签列表
 * @param params
 * @returns 客户-客户标签列表
 */
export function crmCustomerLabelExport(params?: CrmCustomerLabelQuery) {
  return commonExport('/crm/crmCustomerLabel/export', params ?? {});
}

/**
 * 查询客户-客户标签详情
 * @param id id
 * @returns 客户-客户标签详情
 */
export function crmCustomerLabelInfo(id: ID) {
  return requestClient.get<CrmCustomerLabelVO>(`/crm/crmCustomerLabel/${id}`);
}

/**
 * 新增客户-客户标签
 * @param data
 * @returns void
 */
export function crmCustomerLabelAdd(data: CrmCustomerLabelForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomerLabel', data);
}

/**
 * 更新客户-客户标签
 * @param data
 * @returns void
 */
export function crmCustomerLabelUpdate(data: CrmCustomerLabelForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomerLabel', data);
}

/**
 * 删除客户-客户标签
 * @param id id
 * @returns void
 */
export function crmCustomerLabelRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomerLabel/${id}`);
}
