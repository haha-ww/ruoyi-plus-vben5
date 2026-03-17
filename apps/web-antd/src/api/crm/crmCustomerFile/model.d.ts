import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerFileVO {
  /**
   *
   */
  id: number | string;

  /**
   * 客户id
   */
  customerId: number | string;

  /**
   * ossid
   */
  ossId: number | string;

  /**
   * 备注
   */
  remark: string;
}

export interface CrmCustomerFileForm extends BaseEntity {
  /**
   *
   */
  id?: number | string;

  /**
   * 客户id
   */
  customerId?: number | string;

  /**
   * ossid
   */
  ossId?: number | string;

  /**
   * 备注
   */
  remark?: string;
}

export interface CrmCustomerFileQuery extends PageQuery {
  /**
   * 客户id
   */
  customerId?: number | string;

  /**
   * 日期范围参数
   */
  params?: any;
}
