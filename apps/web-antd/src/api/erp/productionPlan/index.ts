import type { ProductionPlanVO, ProductionPlanForm, ProductionPlanQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
* 查询生产计划列表
* @param params
* @returns 生产计划列表
*/
export function productionPlanList(params?: ProductionPlanQuery) {
  return alovaInstance.get<PageResult<ProductionPlanVO>>('/erp/productionPlan/list', { params });
}

/**
 * 导出生产计划列表
 * @param params
 * @returns 生产计划列表
 */
export function productionPlanExport(params?: ProductionPlanQuery) {
  return commonExport('/erp/productionPlan/export', params ?? {});
}

/**
 * 查询生产计划详情
 * @param id id
 * @returns 生产计划详情
 */
export function productionPlanInfo(id: ID) {
  return alovaInstance.get<ProductionPlanVO>(`/erp/productionPlan/${id}`);
}

/**
 * 新增生产计划
 * @param data
 * @returns void
 */
export function productionPlanAdd(data: ProductionPlanForm) {
  return alovaInstance.postWithMsg<void>('/erp/productionPlan', data);
}

/**
 * 更新生产计划
 * @param data
 * @returns void
 */
export function productionPlanUpdate(data: ProductionPlanForm) {
  return alovaInstance.putWithMsg<void>('/erp/productionPlan', data);
}

/**
 * 删除生产计划
 * @param id id
 * @returns void
 */
export function productionPlanRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/erp/productionPlan/${id}`);
}

/**
 * 更新生产计划时间（甘特图拖拽）
 */
export function productionPlanUpdateTime(data: { id: ID; planStartTime: string; planEndTime: string }) {
  return alovaInstance.putWithMsg<void>('/erp/productionPlan/updateTime', data);
}

/**
 * 从销售订单明细构建生产计划
 * @param salesOrderItemIds 销售订单明细ID列表
 */
export function productionPlanBuildFromSalesOrder(salesOrderItemIds: (string | number)[]) {
  return alovaInstance.postWithMsg<void>('/erp/productionPlan/buildFromSalesOrder', { salesOrderItemIds });
}
