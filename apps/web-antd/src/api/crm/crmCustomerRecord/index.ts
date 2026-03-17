import type {
  CrmCustomerRecordForm,
  CrmCustomerRecordQuery,
  CrmCustomerRecordVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户领取记录列表
 * @param params
 * @returns 客户-客户领取记录列表
 */
export function crmCustomerRecordList(params?: CrmCustomerRecordQuery) {
  return requestClient.get<PageResult<CrmCustomerRecordVO>>(
    '/crm/crmCustomerRecord/list',
    { params },
  );
}

/**
 * 导出客户-客户领取记录列表
 * @param params
 * @returns 客户-客户领取记录列表
 */
export function crmCustomerRecordExport(params?: CrmCustomerRecordQuery) {
  return commonExport('/crm/crmCustomerRecord/export', params ?? {});
}

/**
 * 查询客户-客户领取记录详情
 * @param id id
 * @returns 客户-客户领取记录详情
 */
export function crmCustomerRecordInfo(id: ID) {
  return requestClient.get<CrmCustomerRecordVO>(`/crm/crmCustomerRecord/${id}`);
}

/**
 * 新增客户-客户领取记录
 * @param data
 * @returns void
 */
export function crmCustomerRecordAdd(data: CrmCustomerRecordForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomerRecord', data);
}

/**
 * 更新客户-客户领取记录
 * @param data
 * @returns void
 */
export function crmCustomerRecordUpdate(data: CrmCustomerRecordForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomerRecord', data);
}

/**
 * 删除客户-客户领取记录
 * @param id id
 * @returns void
 */
export function crmCustomerRecordRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomerRecord/${id}`);
}
