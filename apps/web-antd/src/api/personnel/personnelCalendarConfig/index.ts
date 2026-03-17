import type { PersonnelCalendarConfigVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 查询人事-考勤休班时间设置列表
 * @param params
 * @returns 人事-考勤休班时间设置列表
 */
export function personnelCalendarConfigList(params) {
  return alovaInstance.get<PageResult<PersonnelCalendarConfigVO>>(
    '/personnel/personnelCalendarConfig/list',
    { params },
  );
}

/**
 * 新增人事-考勤休班时间设置
 * @param data
 * @returns void
 */
export function personnelCalendarConfigAdd(date: string) {
  return alovaInstance.postWithMsg<void>(
    `/personnel/personnelCalendarConfig?date=${date}`,
  );
}

/**
 * 删除人事-考勤休班时间设置
 * @param id id
 * @returns void
 */
export function personnelCalendarConfigRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(
    `/personnel/personnelCalendarConfig/delete?date=${id}`,
  );
}
