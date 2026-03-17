import type {
  PersonnelStaffForm,
  PersonnelStaffQuery,
  PersonnelStaffVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
 * 查询人事-员工信息列表
 * @param params
 * @returns 人事-员工信息列表
 */
export function personnelStaffList(params?: PersonnelStaffQuery) {
  return alovaInstance.get<PageResult<PersonnelStaffVO>>(
    '/personnel/personnelStaff/list',
    { params },
  );
}

/**
 * 查询人事-员工下拉列表
 * @param params
 * @returns 人事-员工信息列表
 */
export function staffSelectList(params?: PersonnelStaffQuery) {
  return alovaInstance.get<PageResult<PersonnelStaffVO>>(
    '/personnel/personnelStaff/selectList',
    { params },
  );
}

/**
 * 导出人事-员工信息列表
 * @param params
 * @returns 人事-员工信息列表
 */
export function personnelStaffExport(params?: PersonnelStaffQuery) {
  return commonExport('/personnel/personnelStaff/export', params ?? {});
}

/**
 * 查询人事-员工信息详情
 * @param id id
 * @returns 人事-员工信息详情
 */
export function personnelStaffInfo(id: ID) {
  return alovaInstance.get<PersonnelStaffVO>(`/personnel/personnelStaff/${id}`);
}

/**
 * 新增人事-员工信息
 * @param data
 * @returns void
 */
export function personnelStaffAdd(data: PersonnelStaffForm) {
  return alovaInstance.postWithMsg<void>('/personnel/personnelStaff', data);
}

/**
 * 更新人事-员工信息
 * @param data
 * @returns void
 */
export function personnelStaffUpdate(data: PersonnelStaffForm) {
  return alovaInstance.putWithMsg<void>('/personnel/personnelStaff', data);
}

/**
 * 删除人事-员工信息
 * @param id id
 * @returns void
 */
export function personnelStaffRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/personnel/personnelStaff/${id}`);
}

export function getQRCodeData() {
  return alovaInstance.get<void>(`/personnel/personnelStaff/getQRCodeData`);
}

export function checkQRCodeData(code: string) {
  return alovaInstance.get<void>(
    `/personnel/personnelStaff/checkQRCodeData?code=${code}`,
  );
}

export function scanCodeEntry(data: PersonnelStaffForm) {
  return alovaInstance.postWithMsg<void>(
    '/personnel/personnelStaff/scanCodeEntry',
    data,
  );
}
