import type {
  PersonnelShiftForm,
  PersonnelShiftQuery,
  PersonnelShiftVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
 * 查询班次配置列表
 * @param params
 * @returns 班次配置列表
 */
export function personnelShiftList(params?: PersonnelShiftQuery) {
  return alovaInstance.get<PageResult<PersonnelShiftVO>>(
    '/personnel/personnelShift/list',
    { params },
  );
}

/**
 * 导出班次配置列表
 * @param params
 * @returns 班次配置列表
 */
export function personnelShiftExport(params?: PersonnelShiftQuery) {
  return commonExport('/personnel/personnelShift/export', params ?? {});
}

/**
 * 查询班次配置详情
 * @param id id
 * @returns 班次配置详情
 */
export function personnelShiftInfo(id: ID) {
  return alovaInstance.get<PersonnelShiftVO>(`/personnel/personnelShift/${id}`);
}

/**
 * 新增班次配置
 * @param data
 * @returns void
 */
export function personnelShiftAdd(data: PersonnelShiftForm) {
  return alovaInstance.postWithMsg<void>('/personnel/personnelShift', data);
}

/**
 * 更新班次配置
 * @param data
 * @returns void
 */
export function personnelShiftUpdate(data: PersonnelShiftForm) {
  return alovaInstance.putWithMsg<void>('/personnel/personnelShift', data);
}

/**
 * 删除班次配置
 * @param id id
 * @returns void
 */
export function personnelShiftRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/personnel/personnelShift/${id}`);
}

/**
 * 查询班次下拉列表
 * @param params
 * @returns 班次配置列表
 */
export function shiftList(params?: PersonnelShiftQuery) {
  return alovaInstance.get<PageResult<PersonnelShiftVO>>(
    '/personnel/personnelShift/selectList',
    { params },
  );
}
