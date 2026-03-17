import type {
  CrmCustomerFileForm,
  CrmCustomerFileQuery,
  CrmCustomerFileVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户附件列表
 * @param params
 * @returns 客户-客户附件列表
 */
export function crmCustomerFileList(params?: CrmCustomerFileQuery) {
  return requestClient.get<PageResult<CrmCustomerFileVO>>(
    '/crm/crmCustomerFile/list',
    { params },
  );
}

/**
 * 导出客户-客户附件列表
 * @param params
 * @returns 客户-客户附件列表
 */
export function crmCustomerFileExport(params?: CrmCustomerFileQuery) {
  return commonExport('/crm/crmCustomerFile/export', params ?? {});
}

/**
 * 查询客户-客户附件详情
 * @param id id
 * @returns 客户-客户附件详情
 */
export function crmCustomerFileInfo(id: ID) {
  return requestClient.get<CrmCustomerFileVO>(`/crm/crmCustomerFile/${id}`);
}

/**
 * 新增客户-客户附件
 * @param data
 * @returns void
 */
export function crmCustomerFileAdd(data: CrmCustomerFileForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomerFile', data);
}

/**
 * 更新客户-客户附件
 * @param data
 * @returns void
 */
export function crmCustomerFileUpdate(data: CrmCustomerFileForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomerFile', data);
}

/**
 * 删除客户-客户附件
 * @param id id
 * @returns void
 */
export function crmCustomerFileRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomerFile/${id}`);
}
