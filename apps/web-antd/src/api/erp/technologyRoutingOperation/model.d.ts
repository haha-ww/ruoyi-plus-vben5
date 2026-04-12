import type { PageQuery, BaseEntity } from '#/api/common';

export interface TechnologyRoutingOperationVO {
  /**
   * 工序ID
   */
  id: string | number;

  /**
   * 所属工艺路线ID
   */
  routingId: string | number;

  /**
   * 工序id
   */
  operationId: string | number;

  /**
   * 工序编码
   */
  operationCode: string;

  /**
   * 工序名称
   */
  operationName: string;

  /**
   * 工序顺序
   */
  sequence: number;

  /**
   * 工作中心ID
   */
  deptId: string | number;

  /**
   * 标准工价（元/件）
   */
  wage: number;

  /**
   * 废品工价（元）
   */
  waste: number;

  /**
   * 准备时间（小时）
   */
  setupTime: number;

  /**
   * 单件加工时间(小时)
   */
  runTime: number;

  /**
   * 工序说明
   */
  memo: string;

}

export interface TechnologyRoutingOperationForm extends BaseEntity {
  /**
   * 工序ID
   */
  id?: string | number;

  /**
   * 所属工艺路线ID
   */
  routingId?: string | number;

  /**
   * 工序id
   */
  operationId?: string | number;

  /**
   * 工序编码
   */
  operationCode?: string;

  /**
   * 工序名称
   */
  operationName?: string;

  /**
   * 工序顺序
   */
  sequence?: number;

  /**
   * 工作中心ID
   */
  deptId?: string | number;

  /**
   * 标准工价（元/件）
   */
  wage?: number;

  /**
   * 废品工价（元）
   */
  waste?: number;

  /**
   * 准备时间（小时）
   */
  setupTime?: number;

  /**
   * 单件加工时间(小时)
   */
  runTime?: number;

  /**
   * 工序说明
   */
  memo?: string;

}

export interface TechnologyRoutingOperationQuery extends PageQuery {
  /**
   * 所属工艺路线ID
   */
  routingId?: string | number;

  /**
   * 工序id
   */
  operationId?: string | number;

  /**
   * 工序编码
   */
  operationCode?: string;

  /**
   * 工序名称
   */
  operationName?: string;

  /**
   * 工序顺序
   */
  sequence?: number;

  /**
   * 工作中心ID
   */
  deptId?: string | number;

  /**
   * 标准工价（元/件）
   */
  wage?: number;

  /**
   * 废品工价（元）
   */
  waste?: number;

  /**
   * 准备时间（小时）
   */
  setupTime?: number;

  /**
   * 单件加工时间(小时)
   */
  runTime?: number;

  /**
   * 工序说明
   */
  memo?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
