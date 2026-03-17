import type {
  PersonnelStaffWorkForm,
  PersonnelStaffWorkQuery,
  PersonnelStaffWorkVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';
/**
 * 查询人事-员工工作经历列表
 * @param params
 * @returns 人事-员工工作经历列表
 */
export function personnelStaffWorkList(params?: PersonnelStaffWorkQuery) {
  return requestClient.get<PageResult<PersonnelStaffWorkVO>>(
    '/personnel/personnelStaffWork/list',
    { params },
  );
}

/**
 * 导出人事-员工工作经历列表
 * @param params
 * @returns 人事-员工工作经历列表
 */
export function personnelStaffWorkExport(params?: PersonnelStaffWorkQuery) {
  return commonExport('/personnel/personnelStaffWork/export', params ?? {});
}

/**
 * 查询人事-员工工作经历详情
 * @param id id
 * @returns 人事-员工工作经历详情
 */
export function personnelStaffWorkInfo(id: ID) {
  return requestClient.get<PersonnelStaffWorkVO>(
    `/personnel/personnelStaffWork/${id}`,
  );
}

/**
 * 新增人事-员工工作经历
 * @param data
 * @returns void
 */
export function personnelStaffWorkAdd(data: PersonnelStaffWorkForm) {
  return requestClient.postWithMsg<void>('/personnel/personnelStaffWork', data);
}

/**
 * 更新人事-员工工作经历
 * @param data
 * @returns void
 */
export function personnelStaffWorkUpdate(data: PersonnelStaffWorkForm) {
  return requestClient.putWithMsg<void>('/personnel/personnelStaffWork', data);
}

/**
 * 删除人事-员工工作经历
 * @param id id
 * @returns void
 */
export function personnelStaffWorkRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelStaffWork/${id}`,
  );
}
