import type {
  CrmCustomerTeamForm,
  CrmCustomerTeamQuery,
  CrmCustomerTeamVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询客户-客户映射人员列表
 * @param params
 * @returns 客户-客户映射人员列表
 */
export function crmCustomerTeamList(params?: CrmCustomerTeamQuery) {
  return requestClient.get<PageResult<CrmCustomerTeamVO>>(
    '/crm/crmCustomerTeam/list',
    { params },
  );
}

/**
 * 导出客户-客户映射人员列表
 * @param params
 * @returns 客户-客户映射人员列表
 */
export function crmCustomerTeamExport(params?: CrmCustomerTeamQuery) {
  return commonExport('/crm/crmCustomerTeam/export', params ?? {});
}

/**
 * 查询客户-客户映射人员详情
 * @param id id
 * @returns 客户-客户映射人员详情
 */
export function crmCustomerTeamInfo(id: ID) {
  return requestClient.get<CrmCustomerTeamVO>(`/crm/crmCustomerTeam/${id}`);
}

/**
 * 新增客户-客户映射人员
 * @param data
 * @returns void
 */
export function crmCustomerTeamAdd(data: CrmCustomerTeamForm) {
  return requestClient.postWithMsg<void>('/crm/crmCustomerTeam', data);
}

/**
 * 更新客户-客户映射人员
 * @param data
 * @returns void
 */
export function crmCustomerTeamUpdate(data: CrmCustomerTeamForm) {
  return requestClient.putWithMsg<void>('/crm/crmCustomerTeam', data);
}

/**
 * 修改关注状态
 * @param data
 * @returns void
 */
export function followEdit(data: CrmCustomerTeamForm) {
  return requestClient.putWithMsg<void>(
    '/crm/crmCustomerTeam/followEdit',
    data,
  );
}
/**
 * 删除客户-客户映射人员
 * @param id id
 * @returns void
 */
export function crmCustomerTeamRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/crm/crmCustomerTeam/${id}`);
}
