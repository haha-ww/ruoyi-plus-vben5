import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerLabelVO {
  /**
   * 主键id
   */
  id: number | string;

  /**
   * 标签名称
   */
  name: string;

  /**
   * 排序
   */
  sort: number;

  /**
   * 上级ID
   */
  pid: number | string;

  /**
   * 备注
   */
  remark: string;
}

export interface CrmCustomerLabelForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: number | string;

  /**
   * 标签名称
   */
  name?: string;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 上级ID
   */
  pid?: number | string;

  /**
   * 备注
   */
  remark?: string;
}

export interface CrmCustomerLabelQuery extends PageQuery {
  /**
   * 标签名称
   */
  name?: string;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 上级ID
   */
  pid?: number | string;

  /**
   * 日期范围参数
   */
  params?: any;
}
