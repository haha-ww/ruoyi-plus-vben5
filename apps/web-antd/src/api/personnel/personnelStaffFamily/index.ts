import type {
  PersonnelStaffFamilyForm,
  PersonnelStaffFamilyQuery,
  PersonnelStaffFamilyVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-员工家庭成员列表
 * @param params
 * @returns 人事-员工家庭成员列表
 */
export function personnelStaffFamilyList(params?: PersonnelStaffFamilyQuery) {
  return requestClient.get<PageResult<PersonnelStaffFamilyVO>>(
    '/personnel/personnelStaffFamily/list',
    { params },
  );
}

/**
 * 导出人事-员工家庭成员列表
 * @param params
 * @returns 人事-员工家庭成员列表
 */
export function personnelStaffFamilyExport(params?: PersonnelStaffFamilyQuery) {
  return commonExport('/personnel/personnelStaffFamily/export', params ?? {});
}

/**
 * 查询人事-员工家庭成员详情
 * @param id id
 * @returns 人事-员工家庭成员详情
 */
export function personnelStaffFamilyInfo(id: ID) {
  return requestClient.get<PersonnelStaffFamilyVO>(
    `/personnel/personnelStaffFamily/${id}`,
  );
}

/**
 * 新增人事-员工家庭成员
 * @param data
 * @returns void
 */
export function personnelStaffFamilyAdd(data: PersonnelStaffFamilyForm) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelStaffFamily',
    data,
  );
}

/**
 * 更新人事-员工家庭成员
 * @param data
 * @returns void
 */
export function personnelStaffFamilyUpdate(data: PersonnelStaffFamilyForm) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelStaffFamily',
    data,
  );
}

/**
 * 删除人事-员工家庭成员
 * @param id id
 * @returns void
 */
export function personnelStaffFamilyRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelStaffFamily/${id}`,
  );
}
