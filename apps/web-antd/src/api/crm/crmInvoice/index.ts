import type { CrmInvoiceForm, CrmInvoiceQuery, CrmInvoiceVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-发票管理列表
 * @param params
 * @returns 客户-发票管理列表
 */
export function crmInvoiceList(params?: CrmInvoiceQuery) {
  return requestClient.get<PageResult<CrmInvoiceVO>>('/crm/crmInvoice/list', {
    params,
  });
}

/**
 * 导出客户-发票管理列表
 * @param params
 * @returns 客户-发票管理列表
 */
export function crmInvoiceExport(params?: CrmInvoiceQuery) {
  return commonExport('/crm/crmInvoice/export', params ?? {});
}

/**
 * 查询客户-发票管理详情
 * @param id id
 * @returns 客户-发票管理详情
 */
export function crmInvoiceInfo(id: ID) {
  return requestClient.get<CrmInvoiceVO>(`/crm/crmInvoice/${id}`);
}

/**
 * 新增客户-发票管理
 * @param data
 * @returns void
 */
export function crmInvoiceAdd(data: CrmInvoiceForm) {
  return requestClient.postWithMsg<void>('/crm/crmInvoice', data);
}

/**
 * 更新客户-发票管理
 * @param data
 * @returns void
 */
export function crmInvoiceUpdate(data: CrmInvoiceForm) {
  return requestClient.putWithMsg<void>('/crm/crmInvoice', data);
}

/**
 * 删除客户-发票管理
 * @param id id
 * @returns void
 */
export function crmInvoiceRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmInvoice/${id}`);
}
