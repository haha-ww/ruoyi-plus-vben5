import type {
  PersonnelStaffEducationForm,
  PersonnelStaffEducationQuery,
  PersonnelStaffEducationVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-员工教育经历列表
 * @param params
 * @returns 人事-员工教育经历列表
 */
export function personnelStaffEducationList(
  params?: PersonnelStaffEducationQuery,
) {
  return requestClient.get<PageResult<PersonnelStaffEducationVO>>(
    '/personnel/personnelStaffEducation/list',
    { params },
  );
}

/**
 * 导出人事-员工教育经历列表
 * @param params
 * @returns 人事-员工教育经历列表
 */
export function personnelStaffEducationExport(
  params?: PersonnelStaffEducationQuery,
) {
  return commonExport(
    '/personnel/personnelStaffEducation/export',
    params ?? {},
  );
}

/**
 * 查询人事-员工教育经历详情
 * @param id id
 * @returns 人事-员工教育经历详情
 */
export function personnelStaffEducationInfo(id: ID) {
  return requestClient.get<PersonnelStaffEducationVO>(
    `/personnel/personnelStaffEducation/${id}`,
  );
}

/**
 * 新增人事-员工教育经历
 * @param data
 * @returns void
 */
export function personnelStaffEducationAdd(data: PersonnelStaffEducationForm) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelStaffEducation',
    data,
  );
}

/**
 * 更新人事-员工教育经历
 * @param data
 * @returns void
 */
export function personnelStaffEducationUpdate(
  data: PersonnelStaffEducationForm,
) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelStaffEducation',
    data,
  );
}

/**
 * 删除人事-员工教育经历
 * @param id id
 * @returns void
 */
export function personnelStaffEducationRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelStaffEducation/${id}`,
  );
}
