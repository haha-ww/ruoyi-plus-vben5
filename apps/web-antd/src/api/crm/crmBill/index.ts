import type { CrmBillForm, CrmBillQuery, CrmBillVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-账目记录列表
 * @param params
 * @returns 客户-账目记录列表
 */
export function crmBillList(params?: CrmBillQuery) {
  return requestClient.get<PageResult<CrmBillVO>>('/crm/crmBill/list', {
    params,
  });
}

/**
 * 导出客户-账目记录列表
 * @param params
 * @returns 客户-账目记录列表
 */
export function crmBillExport(params?: CrmBillQuery) {
  return commonExport('/crm/crmBill/export', params ?? {});
}

/**
 * 查询客户-账目记录详情
 * @param id id
 * @returns 客户-账目记录详情
 */
export function crmBillInfo(id: ID) {
  return requestClient.get<CrmBillVO>(`/crm/crmBill/${id}`);
}

/**
 * 新增客户-账目记录
 * @param data
 * @returns void
 */
export function crmBillAdd(data: CrmBillForm) {
  return requestClient.postWithMsg<void>('/crm/crmBill', data);
}

/**
 * 更新客户-账目记录
 * @param data
 * @returns void
 */
export function crmBillUpdate(data: CrmBillForm) {
  return requestClient.putWithMsg<void>('/crm/crmBill', data);
}

/**
 * 删除客户-账目记录
 * @param id id
 * @returns void
 */
export function crmBillRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmBill/${id}`);
}

/**
 * 查询累计收款和支出金额
 */
export function crmBillSum(customerId: number) {
  return requestClient.get<CrmBillVO>('/crm/crmBill/sum', {
    customerId,
  });
}
