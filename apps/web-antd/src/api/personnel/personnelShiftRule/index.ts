import type {
  PersonnelShiftRuleForm,
  PersonnelShiftRuleQuery,
  PersonnelShiftRuleVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询班次规则列表
 * @param params
 * @returns 班次规则列表
 */
export function personnelShiftRuleList(params?: PersonnelShiftRuleQuery) {
  return requestClient.get<PageResult<PersonnelShiftRuleVO>>(
    '/personnel/personnelShiftRule/list',
    { params },
  );
}

/**
 * 导出班次规则列表
 * @param params
 * @returns 班次规则列表
 */
export function personnelShiftRuleExport(params?: PersonnelShiftRuleQuery) {
  return commonExport('/personnel/personnelShiftRule/export', params ?? {});
}

/**
 * 查询班次规则详情
 * @param id id
 * @returns 班次规则详情
 */
export function personnelShiftRuleInfo(id: ID) {
  return requestClient.get<PersonnelShiftRuleVO>(
    `/personnel/personnelShiftRule/${id}`,
  );
}

/**
 * 新增班次规则
 * @param data
 * @returns void
 */
export function personnelShiftRuleAdd(data: PersonnelShiftRuleForm) {
  return requestClient.postWithMsg<void>('/personnel/personnelShiftRule', data);
}

/**
 * 更新班次规则
 * @param data
 * @returns void
 */
export function personnelShiftRuleUpdate(data: PersonnelShiftRuleForm) {
  return requestClient.putWithMsg<void>('/personnel/personnelShiftRule', data);
}

/**
 * 删除班次规则
 * @param id id
 * @returns void
 */
export function personnelShiftRuleRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelShiftRule/${id}`,
  );
}
