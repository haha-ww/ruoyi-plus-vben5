import type {
  PersonnelArrangeRecordForm,
  PersonnelArrangeRecordQuery,
  PersonnelArrangeRecordVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-考勤排版记录列表
 * @param params
 * @returns 人事-考勤排版记录列表
 */
export function personnelArrangeRecordList(
  params?: PersonnelArrangeRecordQuery,
) {
  return requestClient.get<PageResult<PersonnelArrangeRecordVO>>(
    '/personnel/personnelArrangeRecord/list',
    { params },
  );
}

/**
 * 导出人事-考勤排版记录列表
 * @param params
 * @returns 人事-考勤排版记录列表
 */
export function personnelArrangeRecordExport(
  params?: PersonnelArrangeRecordQuery,
) {
  return commonExport('/personnel/personnelArrangeRecord/export', params ?? {});
}

/**
 * 查询人事-考勤排版记录详情
 * @param id id
 * @returns 人事-考勤排版记录详情
 */
export function personnelArrangeRecordInfo(id: ID) {
  return requestClient.get<PersonnelArrangeRecordVO>(
    `/personnel/personnelArrangeRecord/${id}`,
  );
}

/**
 * 新增人事-考勤排版记录
 * @param data
 * @returns void
 */
export function personnelArrangeRecordAdd(data: PersonnelArrangeRecordForm) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelArrangeRecord',
    data,
  );
}

/**
 * 更新人事-考勤排版记录
 * @param data
 * @returns void
 */
export function personnelArrangeRecordUpdate(data: PersonnelArrangeRecordForm) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelArrangeRecord',
    data,
  );
}

/**
 * 删除人事-考勤排版记录
 * @param id id
 * @returns void
 */
export function personnelArrangeRecordRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelArrangeRecord/${id}`,
  );
}
