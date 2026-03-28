import type { PageQuery, BaseEntity } from '#/api/common';

export interface WarehouseInventoryTransactionVO {
  /**
   * 事务ID
   */
  id: string | number;

  /**
   * 事务单号(业务单据号)
   */
  transactionNo: string;

  /**
   * 单据日期
   */
  transactionDate: string;

  /**
   * 单据类型：1-入库单，2-出库单
   */
  type: number;

  /**
   * 事务类型(字典 transaction_type)
   */
  subType: number;

  /**
   * 关联仓库ID
   */
  warehouseId: string | number;

  /**
   * 业务伙伴ID（供应商或客户）
   */
  businessPartnerId: string | number;

  /**
   * 物料ID
   */
  materialId: string | number;

  /**
   * 批次号
   */
  batchNo: string;

  /**
   * 变动数量
   */
  quantity: number;

  /**
   * 状态
   */
  status: number;

  /**
   * 备注
   */
  remark: string;

}

export interface WarehouseInventoryTransactionForm extends BaseEntity {
  /**
   * 事务ID
   */
  id?: string | number;

  /**
   * 事务单号(业务单据号)
   */
  transactionNo?: string;

  /**
   * 单据日期
   */
  transactionDate?: string;

  /**
   * 单据类型：1-入库单，2-出库单
   */
  type?: number;

  /**
   * 事务类型(字典 transaction_type)
   */
  subType?: number;

  /**
   * 关联仓库ID
   */
  warehouseId?: string | number;

  /**
   * 业务伙伴ID（供应商或客户）
   */
  businessPartnerId?: string | number;

  /**
   * 物料ID
   */
  materialId?: string | number;

  /**
   * 批次号
   */
  batchNo?: string;

  /**
   * 变动数量
   */
  quantity?: number;

  /**
   * 状态
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface WarehouseInventoryTransactionQuery extends PageQuery {
  /**
   * 事务单号(业务单据号)
   */
  transactionNo?: string;

  /**
   * 单据日期
   */
  transactionDate?: string;

  /**
   * 单据类型：1-入库单，2-出库单
   */
  type?: number;

  /**
   * 事务类型(字典 transaction_type)
   */
  subType?: number;

  /**
   * 关联仓库ID
   */
  warehouseId?: string | number;

  /**
   * 业务伙伴ID（供应商或客户）
   */
  businessPartnerId?: string | number;

  /**
   * 物料ID
   */
  materialId?: string | number;

  /**
   * 批次号
   */
  batchNo?: string;

  /**
   * 变动数量
   */
  quantity?: number;

  /**
   * 状态
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
