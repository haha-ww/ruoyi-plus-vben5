import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionPlanVO {
  /** 主键 */
  id: string | number;
  /** 计划单号 */
  planCode: string;
  /** 产品ID */
  materialId: string | number;
  /** 产品名称 */
  materialName: string;
  /** 产品编码 */
  materialCode: string;
  /** 计划生产数量 */
  planQty: number;
  /** 实际完成数量 */
  actualQty: number;
  /** 计划开始时间 */
  planStartTime: string;
  /** 计划结束时间 */
  planEndTime: string;
  /** 来源类型 1-手动 2-销售订单 3-MRP */
  sourceType: string;
  /** 销售订单id */
  salesOrderId: string | number;
  /** 销售订单编号 */
  salesOrderCode: string;
  /** 生产部门ID */
  deptId: string | number;
  /** 生产部门名称 */
  deptName: string;
  /** 负责人ID */
  principalId: string | number;
  /** 负责人名称 */
  principalName: string;
  /** 优先级 1-紧急 2-高 3-中 4-低 */
  priority: string;
  /** 状态 10-草稿 20-已下达 30-生产中 40-已完成 50-已关闭 */
  status: number;
  /** 备注 */
  remark: string;
}

export interface ProductionPlanForm extends BaseEntity {
  id?: string | number;
  planCode?: string;
  materialId?: string | number;
  materialName?: string;
  materialCode?: string;
  planQty?: number;
  actualQty?: number;
  planStartTime?: string;
  planEndTime?: string;
  sourceType?: string;
  salesOrderId?: string | number;
  deptId?: string | number;
  principalId?: string | number;
  priority?: string;
  status?: number;
  remark?: string;
}

export interface ProductionPlanQuery extends PageQuery {
  planCode?: string;
  materialId?: string | number;
  sourceType?: string;
  priority?: string;
  status?: number;
  params?: any;
}
