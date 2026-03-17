import type {
  PersonnelArrangeForm,
  PersonnelArrangeQuery,
  PersonnelArrangeVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-考勤排班列表
 * @param params
 * @returns 人事-考勤排班列表
 */
export function personnelArrangeList(params?: PersonnelArrangeQuery) {
  return requestClient.get<PageResult<PersonnelArrangeVO>>(
    '/personnel/personnelArrange/list',
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
export interface ArrangeRecordResult {
  id?: number | string;
  list: any[];
  groupList: Array<{ id: number | string; name: string; color?: string }>;
}

export function getArrangeRecordList(params?: PersonnelArrangeQuery) {
  return requestClient.get<ArrangeRecordResult>(
    '/personnel/personnelArrange/getArrangeRecordList',
    { params },
  );
}
