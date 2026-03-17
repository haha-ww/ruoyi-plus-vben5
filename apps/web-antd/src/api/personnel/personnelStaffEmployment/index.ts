import type {
  PersonnelStaffEmploymentForm,
  PersonnelStaffEmploymentQuery,
  PersonnelStaffEmploymentVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';
/**
 * 查询人事-员工任职记录列表
 * @param params
 * @returns 人事-员工任职记录列表
 */
export function personnelStaffEmploymentList(
  params?: PersonnelStaffEmploymentQuery,
) {
  return requestClient.get<PageResult<PersonnelStaffEmploymentVO>>(
    '/personnel/personnelStaffEmployment/list',
    { params },
  );
}

/**
 * 导出人事-员工任职记录列表
 * @param params
 * @returns 人事-员工任职记录列表
 */
export function personnelStaffEmploymentExport(
  params?: PersonnelStaffEmploymentQuery,
) {
  return commonExport(
    '/personnel/personnelStaffEmployment/export',
    params ?? {},
  );
}

/**
 * 查询人事-员工任职记录详情
 * @param id id
 * @returns 人事-员工任职记录详情
 */
export function personnelStaffEmploymentInfo(id: ID) {
  return requestClient.get<PersonnelStaffEmploymentVO>(
    `/personnel/personnelStaffEmployment/${id}`,
  );
}

/**
 * 新增人事-员工任职记录
 * @param data
 * @returns void
 */
export function personnelStaffEmploymentAdd(
  data: PersonnelStaffEmploymentForm,
) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelStaffEmployment',
    data,
  );
}

/**
 * 更新人事-员工任职记录
 * @param data
 * @returns void
 */
export function personnelStaffEmploymentUpdate(
  data: PersonnelStaffEmploymentForm,
) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelStaffEmployment',
    data,
  );
}

/**
 * 删除人事-员工任职记录
 * @param id id
 * @returns void
 */
export function personnelStaffEmploymentRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelStaffEmployment/${id}`,
  );
}
