import type { PageQuery, BaseEntity } from '#/api/common';

export interface TechnologyOperationVO {
  /**
   * 工序主键ID
   */
  id: string | number;

  /**
   * 工序编码
   */
  operationCode: string;

  /**
   * 工序名称
   */
  operationName: string;

  /**
   * 默认工作中心ID
   */
  deptId: string | number;

  /**
   * 默认准备时间(小时)
   */
  stdSetupTime: number;

  /**
   * 默认单件加工时间(小时)
   */
  stdRunTime: number;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status: number;

  /**
   * 备注/作业指导说明
   */
  remark: string;

}

export interface TechnologyOperationForm extends BaseEntity {
  /**
   * 工序主键ID
   */
  id?: string | number;

  /**
   * 工序编码
   */
  operationCode?: string;

  /**
   * 工序名称
   */
  operationName?: string;

  /**
   * 默认工作中心ID
   */
  deptId?: string | number;

  /**
   * 默认准备时间(小时)
   */
  stdSetupTime?: number;

  /**
   * 默认单件加工时间(小时)
   */
  stdRunTime?: number;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
   * 备注/作业指导说明
   */
  remark?: string;

}

export interface TechnologyOperationQuery extends PageQuery {
  /**
   * 工序编码
   */
  operationCode?: string;

  /**
   * 工序名称
   */
  operationName?: string;

  /**
   * 默认工作中心ID
   */
  deptId?: string | number;

  /**
   * 默认准备时间(小时)
   */
  stdSetupTime?: number;

  /**
   * 默认单件加工时间(小时)
   */
  stdRunTime?: number;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
