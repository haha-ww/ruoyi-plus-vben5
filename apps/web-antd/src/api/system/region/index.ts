import type { RegionForm, RegionQuery, RegionVO } from './model';

import type { ID, IDS } from '#/api/common';

import { alovaInstance as requestClient } from '#/utils/http';

/**
 * 查询省市区域管理列表
 * @param params
 * @returns 省市区域管理列表
 */
export function regionList(params?: RegionQuery) {
  return requestClient.get<RegionVO[]>(`/system/region/list`, { params });
}

/**
 * 查询省市区域管理详情
 * @param id id
 * @returns 省市区域管理详情
 */
export function regionInfo(id: ID) {
  return requestClient.get<RegionVO>(`/system/region/${id}`);
}

/**
 * 新增省市区域管理
 * @param data
 * @returns void
 */
export function regionAdd(data: RegionForm) {
  return requestClient.postWithMsg<void>('/system/region', data);
}

/**
 * 更新省市区域管理
 * @param data
 * @returns void
 */
export function regionUpdate(data: RegionForm) {
  return requestClient.putWithMsg<void>('/system/region', data);
}

/**
 * 删除省市区域管理
 * @param id id
 * @returns void
 */
export function regionRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/system/region/${id}`);
}
