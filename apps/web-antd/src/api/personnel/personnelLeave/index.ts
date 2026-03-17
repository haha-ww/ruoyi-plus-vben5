import type {
  PersonnelLeaveForm,
  PersonnelLeaveQuery,
  PersonnelLeaveVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-考勤请假列表
 * @param params
 * @returns 人事-考勤请假列表
 */
export function personnelLeaveList(params?: PersonnelLeaveQuery) {
  return requestClient.get<PageResult<PersonnelLeaveVO>>(
    '/personnel/personnelLeave/list',
    { params },
  );
}

/**
 * 导出人事-考勤请假列表
 * @param params
 * @returns 人事-考勤请假列表
 */
export function personnelLeaveExport(params?: PersonnelLeaveQuery) {
  return commonExport('/personnel/personnelLeave/export', params ?? {});
}

/**
 * 查询人事-考勤请假详情
 * @param id id
 * @returns 人事-考勤请假详情
 */
export function personnelLeaveInfo(id: ID) {
  return requestClient.get<PersonnelLeaveVO>(`/personnel/personnelLeave/${id}`);
}

/**
 * 新增人事-考勤请假
 * @param data
 * @returns void
 */
export function personnelLeaveAdd(data: PersonnelLeaveForm) {
  return requestClient.postWithMsg<void>('/personnel/personnelLeave', data);
}

/**
 * 更新人事-考勤请假
 * @param data
 * @returns void
 */
export function personnelLeaveUpdate(data: PersonnelLeaveForm) {
  return requestClient.putWithMsg<void>('/personnel/personnelLeave', data);
}

/**
 * 删除人事-考勤请假
 * @param id id
 * @returns void
 */
export function personnelLeaveRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/personnel/personnelLeave/${id}`);
}
