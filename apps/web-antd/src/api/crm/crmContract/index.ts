import type { CrmContractForm, CrmContractQuery, CrmContractVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-合同管理列表
 * @param params
 * @returns 客户-合同管理列表
 */
export function crmContractList(params?: CrmContractQuery) {
  return requestClient.get<PageResult<CrmContractVO>>('/crm/crmContract/list', {
    params,
  });
}

/**
 * 查询客户-合同下拉列表
 * @param params
 * @returns 客户-合同管理列表
 */
export function crmContractSelectList(params?: CrmContractQuery) {
  return requestClient.get<PageResult<CrmContractVO>>(
    '/crm/crmContract/selectList',
    {
      params,
    },
  );
}

/**
 * 导出客户-合同管理列表
 * @param params
 * @returns 客户-合同管理列表
 */
export function crmContractExport(params?: CrmContractQuery) {
  return commonExport('/crm/crmContract/export', params ?? {});
}

/**
 * 查询客户-合同管理详情
 * @param id id
 * @returns 客户-合同管理详情
 */
export function crmContractInfo(id: ID) {
  return requestClient.get<CrmContractVO>(`/crm/crmContract/${id}`);
}

/**
 * 新增客户-合同管理
 * @param data
 * @returns void
 */
export function crmContractAdd(data: CrmContractForm) {
  return requestClient.postWithMsg<void>('/crm/crmContract', data);
}

/**
 * 更新客户-合同管理
 * @param data
 * @returns void
 */
export function crmContractUpdate(data: CrmContractForm) {
  return requestClient.putWithMsg<void>('/crm/crmContract', data);
}

/**
 * 删除客户-合同管理
 * @param id id
 * @returns void
 */
export function crmContractRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmContract/${id}`);
}
