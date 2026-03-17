import type {
  AttendanceStatisticsQuery,
  AttendanceStatisticsVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询月度统计列表
 * @param params
 * @returns 人事-月度统计列表
 */
export function mounthList(params?: AttendanceStatisticsQuery) {
  return requestClient.get<PageResult<AttendanceStatisticsVO>>(
    '/personnel/attendanceStatistics/mounthList',
    { params },
  );
}

/**
 * 导出人事-考勤排班列表
 * @param params
 * @returns 人事-考勤排班列表
 */
export function personnelArrangeExport(params?: PersonnelArrangeQuery) {
  return commonExport('/personnel/personnelArrange/export', params ?? {});
}

/**
 * 查询人事-考勤排班详情
 * @param id id
 * @returns 人事-考勤排班详情
 */
export function personnelArrangeInfo(id: ID) {
  return requestClient.get<PersonnelArrangeVO>(
    `/personnel/personnelArrange/${id}`,
  );
}

/**
 * 新增人事-考勤排班
 * @param data
 * @returns void
 */
export function personnelArrangeAdd(data: PersonnelArrangeForm) {
  return requestClient.postWithMsg<void>('/personnel/personnelArrange', data);
}

/**
 * 更新人事-考勤排班
 * @param data
 * @returns void
 */
export function personnelArrangeUpdate(data: PersonnelArrangeForm) {
  return requestClient.putWithMsg<void>('/personnel/personnelArrange', data);
}

/**
 * 删除人事-考勤排班
 * @param id id
 * @returns void
 */
export function personnelArrangeRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/personnel/personnelArrange/${id}`);
}
// 获取排班信息
export function getArrangeRecordList(params?: PersonnelArrangeQuery) {
  return requestClient.get<PersonnelArrangeVO[]>(
    '/personnel/personnelArrange/getArrangeRecordList',
    { params },
  );
}
