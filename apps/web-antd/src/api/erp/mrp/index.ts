import type { MrpCalculateForm, MrpGenerateForm, MrpQuery, MrpResultVO, MrpVO } from './model';

import type { ID } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
 * 分页查询 MRP 运算记录列表
 * @param params
 * @returns MRP 运算记录列表
 */
export function mrpList(params?: MrpQuery) {
  return alovaInstance.get<PageResult<MrpVO>>('/erp/mrp/list', { params });
}

/**
 * 导出 MRP 运算记录列表
 * @param params
 */
export function mrpExport(params?: MrpQuery) {
  return commonExport('/erp/mrp/export', params ?? {});
}

/**
 * 获取 MRP 运算结果详情
 * @param batchNo 批次号
 * @returns MRP 运算结果
 */
export function mrpResult(batchNo: string) {
  return alovaInstance.get<MrpResultVO>(`/erp/mrp/result/${batchNo}`);
}

/**
 * 执行 MRP 运算（同步，实时返回结果）
 * @param data 运算参数
 * @returns MRP 运算结果
 */
export function mrpCalculateSync(data: MrpCalculateForm) {
  return alovaInstance.postWithMsg<MrpResultVO>('/erp/mrp/calculate', data);
}

/**
 * 执行 MRP 运算（异步，轮询进度）
 * @param data 运算参数
 * @returns 运算任务ID
 */
export function mrpCalculateAsync(data: MrpCalculateForm) {
  return alovaInstance.post<{ taskId: string }>('/erp/mrp/calculate/async', data);
}

/**
 * 查询 MRP 运算进度
 * @param taskId 任务ID
 * @returns 进度信息
 */
export function mrpProgress(taskId: string) {
  return alovaInstance.get<{ taskId: string; progress: number; status: number; message: string; batchNo: string }>(
    `/erp/mrp/progress/${taskId}`,
  );
}

/**
 * 生成采购订单/生产计划
 * @param data 生成参数
 * @returns 生成结果
 */
export function mrpGenerate(data: MrpGenerateForm) {
  return alovaInstance.postWithMsg<{ purchaseOrderIds: ID[]; productionPlanIds: ID[] }>('/erp/mrp/generate', data);
}

/**
 * 取消 MRP 运算任务
 * @param taskId 任务ID
 */
export function mrpCancel(taskId: string) {
  return alovaInstance.deleteWithMsg<void>(`/erp/mrp/cancel/${taskId}`);
}
