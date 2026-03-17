import type { BaseEntity } from '#/api/common';

export interface RegionVO {
  /**
   * id
   */
  id: number | string;

  /**
   * 行政区划代码
   */
  code: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 上级id
   */
  parentId: number | string;

  /**
   * level_id
   */
  levelId: number | string;

  /**
   * 子对象
   */
  children: RegionVO[];
}

export interface RegionForm extends BaseEntity {
  /**
   * id
   */
  id?: number | string;

  /**
   * 行政区划代码
   */
  code?: number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 上级id
   */
  parentId?: number | string;

  /**
   * level_id
   */
  levelId?: number | string;
}

export interface RegionQuery {
  /**
   * 行政区划代码
   */
  code?: number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 上级id
   */
  parentId?: number | string;

  /**
   * level_id
   */
  levelId?: number | string;

  /**
   * 日期范围参数
   */
  params?: any;
}
