import type {
  PersonnelStaffMaterialForm,
  PersonnelStaffMaterialQuery,
  PersonnelStaffMaterialVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询人事-员工资料附件列表
 * @param params
 * @returns 人事-员工资料附件列表
 */
export function personnelStaffMaterialList(
  params?: PersonnelStaffMaterialQuery,
) {
  return requestClient.get<PageResult<PersonnelStaffMaterialVO>>(
    '/personnel/personnelStaffMaterial/list',
    { params },
  );
}

/**
 * 导出人事-员工资料附件列表
 * @param params
 * @returns 人事-员工资料附件列表
 */
export function personnelStaffMaterialExport(
  params?: PersonnelStaffMaterialQuery,
) {
  return commonExport('/personnel/personnelStaffMaterial/export', params ?? {});
}

/**
 * 查询人事-员工资料附件详情
 * @param id id
 * @returns 人事-员工资料附件详情
 */
export function personnelStaffMaterialInfo(id: ID) {
  return requestClient.get<PersonnelStaffMaterialVO>(
    `/personnel/personnelStaffMaterial/${id}`,
  );
}

/**
 * 新增人事-员工资料附件
 * @param data
 * @returns void
 */
export function personnelStaffMaterialAdd(data: PersonnelStaffMaterialForm) {
  return requestClient.postWithMsg<void>(
    '/personnel/personnelStaffMaterial',
    data,
  );
}

/**
 * 更新人事-员工资料附件
 * @param data
 * @returns void
 */
export function personnelStaffMaterialUpdate(data: PersonnelStaffMaterialForm) {
  return requestClient.putWithMsg<void>(
    '/personnel/personnelStaffMaterial',
    data,
  );
}

/**
 * 删除人事-员工资料附件
 * @param id id
 * @returns void
 */
export function personnelStaffMaterialRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(
    `/personnel/personnelStaffMaterial/${id}`,
  );
}
