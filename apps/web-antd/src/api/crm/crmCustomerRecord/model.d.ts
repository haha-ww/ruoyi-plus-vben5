import type { BaseEntity, PageQuery } from '#/api/common';

export interface CrmCustomerRecordVO {
  /**
   *
   */
  id: number | string;

  /**
   * 客户ID
   */
  customerId: number | string;

  /**
   * 记录类型 1、退回公海；2、领取；3、流失；4、取消流失；5、移交同事；
   */
  type: number;

  /**
   * 业务员ID
   */
  uid: number | string;

  /**
   * 记录版本
   */
  recordVersion: number;

  /**
   * 原因
   */
  reason: string;

  /**
   * 备注
   */
  remark: string;
}

export interface CrmCustomerRecordForm extends BaseEntity {
  /**
   *
   */
  id?: number | string;

  /**
   * 客户ID
   */
  customerId?: number | string;

  /**
   * 记录类型 1、退回公海；2、领取；3、流失；4、取消流失；5、移交同事；
   */
  type?: number;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   * 记录版本
   */
  recordVersion?: number;

  /**
   * 原因
   */
  reason?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface CrmCustomerRecordQuery extends PageQuery {
  /**
   * 客户ID
   */
  customerId?: number | string;

  /**
   * 记录类型 1、退回公海；2、领取；3、流失；4、取消流失；5、移交同事；
   */
  type?: number;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   * 记录版本
   */
  recordVersion?: number;

  /**
   * 原因
   */
  reason?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
