import type {
  PersonnelClockRecordForm,
  PersonnelClockRecordQuery,
  PersonnelClockRecordVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-考勤打卡记录列表
 * @param params
 * @returns 人事-考勤打卡记录列表
 */
export function personnelClockRecordList(params?: PersonnelClockRecordQuery) {
  return requestClient.get<PageResult<PersonnelClockRecordVO>>(
    '/personnel/personnelClockRecord/list',
    { params },
  );
}

/**
 * 导出人事-考勤打卡记录列表
 * @param params
 * @returns 人事-考勤打卡记录列表
 */
export function personnelClockRecordExport(params?: PersonnelClockRecordQuery) {
  return commonExport('/personnel/personnelClockRecord/export', params ?? {});
}

/**
 * 查询人事-考勤打卡记录详情
 * @param id id
 * @returns 人事-考勤打卡记录详情
 */
export function personnelClockRecordInfo(id: ID) {
  return requestClient.get<PersonnelClockRecordVO>(
    `/personnel/personnelClockRecord/${id}`,
  );
}

/**
 * 新增人事-考勤打卡记录
 * @param data
 * @returns void
 */
export function personnelClockRecordAdd(data: PersonnelClockRecordForm) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelClockRecord',
    data,
  );
}

/**
 * 更新人事-考勤打卡记录
 * @param data
 * @returns void
 */
export function personnelClockRecordUpdate(data: PersonnelClockRecordForm) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelClockRecord',
    data,
  );
}

/**
 * 删除人事-考勤打卡记录
 * @param id id
 * @returns void
 */
export function personnelClockRecordRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelClockRecord/${id}`,
  );
}
