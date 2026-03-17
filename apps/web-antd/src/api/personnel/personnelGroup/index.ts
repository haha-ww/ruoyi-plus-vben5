import type {
  PersonnelGroupForm,
  PersonnelGroupQuery,
  PersonnelGroupVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询考勤组列表
 * @param params
 * @returns 考勤组列表
 */
export function personnelGroupList(params?: PersonnelGroupQuery) {
  return requestClient.get<PageResult<PersonnelGroupVO>>(
    '/personnel/personnelGroup/list',
    { params },
  );
}

/**
 * 导出考勤组列表
 * @param params
 * @returns 考勤组列表
 */
export function personnelGroupExport(params?: PersonnelGroupQuery) {
  return commonExport('/personnel/personnelGroup/export', params ?? {});
}

/**
 * 查询考勤组详情
 * @param id id
 * @returns 考勤组详情
 */
export function personnelGroupInfo(id: ID) {
  return requestClient.get<PersonnelGroupVO>(`/personnel/personnelGroup/${id}`);
}

/**
 * 新增考勤组
 * @param data
 * @returns void
 */
export function personnelGroupAdd(data: PersonnelGroupForm) {
  return requestClient.postWithMsg<void>('/personnel/personnelGroup', data);
}

/**
 * 更新考勤组
 * @param data
 * @returns void
 */
export function personnelGroupUpdate(data: PersonnelGroupForm) {
  return requestClient.putWithMsg<void>('/personnel/personnelGroup', data);
}

/**
 * 删除考勤组
 * @param id id
 * @returns void
 */
export function personnelGroupRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/personnel/personnelGroup/${id}`);
}
/**
 * 查询考勤组列表
 * @param params
 * @returns 考勤组下拉列表
 */
export function groupSelectList() {
  return requestClient.get<PageResult<PersonnelGroupVO>>(
    '/personnel/personnelGroup/selectList',
  );
}
