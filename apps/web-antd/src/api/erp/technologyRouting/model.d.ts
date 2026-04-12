import type { PageQuery, BaseEntity } from '#/api/common';

export interface TechnologyRoutingVO {
  /**
   * 工艺路线ID
   */
  id: string | number;

  /**
   * 工艺路线编码
   */
  routingCode: string;

  /**
   * 工艺路线名称
   */
  routingName: string;

  /**
   * 物料编码
   */
  materialCode: string;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 工艺描述
   */
  routingDescribe: string;

}

export interface TechnologyRoutingForm extends BaseEntity {
  /**
   * 工艺路线ID
   */
  id?: string | number;

  /**
   * 工艺路线编码
   */
  routingCode?: string;

  /**
   * 工艺路线名称
   */
  routingName?: string;

  /**
   * 物料编码
   */
  materialCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 工艺描述
   */
  routingDescribe?: string;

}

export interface TechnologyRoutingQuery extends PageQuery {
  /**
   * 工艺路线编码
   */
  routingCode?: string;

  /**
   * 工艺路线名称
   */
  routingName?: string;

  /**
   * 物料编码
   */
  materialCode?: string;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 工艺描述
   */
  routingDescribe?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
