import type {
  PersonnelCycleForm,
  PersonnelCycleQuery,
  PersonnelCycleVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询考勤组周期列表
 * @param params
 * @returns 考勤组周期列表
 */
export function personnelCycleList(params?: PersonnelCycleQuery) {
  return requestClient.get<PageResult<PersonnelCycleVO>>(
    '/personnel/personnelCycle/list',
    { params },
  );
}

/**
 * 导出考勤组周期列表
 * @param params
 * @returns 考勤组周期列表
 */
export function personnelCycleExport(params?: PersonnelCycleQuery) {
  return commonExport('/personnel/personnelCycle/export', params ?? {});
}

/**
 * 查询考勤组周期详情
 * @param id id
 * @returns 考勤组周期详情
 */
export function personnelCycleInfo(id: ID) {
  return requestClient.get<PersonnelCycleVO>(`/personnel/personnelCycle/${id}`);
}

/**
 * 新增考勤组周期
 * @param data
 * @returns void
 */
export function personnelCycleAdd(data: PersonnelCycleForm) {
  return requestClient.postWithMsg<void>('/personnel/personnelCycle', data);
}

/**
 * 更新考勤组周期
 * @param data
 * @returns void
 */
export function personnelCycleUpdate(data: PersonnelCycleForm) {
  return requestClient.putWithMsg<void>('/personnel/personnelCycle', data);
}

/**
 * 删除考勤组周期
 * @param id id
 * @returns void
 */
export function personnelCycleRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/personnel/personnelCycle/${id}`);
}
