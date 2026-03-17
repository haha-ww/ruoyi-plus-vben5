import type {
  PersonnelStaffContractForm,
  PersonnelStaffContractQuery,
  PersonnelStaffContractVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-员工合同列表
 * @param params
 * @returns 人事-员工合同列表
 */
export function personnelStaffContractList(
  params?: PersonnelStaffContractQuery,
) {
  return requestClient.get<PageResult<PersonnelStaffContractVO>>(
    '/personnel/personnelStaffContract/list',
    { params },
  );
}

/**
 * 导出人事-员工合同列表
 * @param params
 * @returns 人事-员工合同列表
 */
export function personnelStaffContractExport(
  params?: PersonnelStaffContractQuery,
) {
  return commonExport('/personnel/personnelStaffContract/export', params ?? {});
}

/**
 * 查询人事-员工合同详情
 * @param id id
 * @returns 人事-员工合同详情
 */
export function personnelStaffContractInfo(id: ID) {
  return requestClient.get<PersonnelStaffContractVO>(
    `/personnel/personnelStaffContract/${id}`,
  );
}

/**
 * 新增人事-员工合同
 * @param data
 * @returns void
 */
export function personnelStaffContractAdd(data: PersonnelStaffContractForm) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelStaffContract',
    data,
  );
}

/**
 * 更新人事-员工合同
 * @param data
 * @returns void
 */
export function personnelStaffContractUpdate(data: PersonnelStaffContractForm) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelStaffContract',
    data,
  );
}

/**
 * 删除人事-员工合同
 * @param id id
 * @returns void
 */
export function personnelStaffContractRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelStaffContract/${id}`,
  );
}
