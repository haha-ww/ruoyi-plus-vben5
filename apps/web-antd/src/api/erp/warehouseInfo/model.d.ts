import type { PageQuery, BaseEntity } from '#/api/common';

export interface WarehouseInfoVO {
  /**
   * 仓库ID
   */
  id: string | number;

  /**
   * 仓库编码
   */
  warehouseCode: string;

  /**
   * 仓库名称
   */
  warehouseName: string;

  /**
   * 仓库类型(字典 warehouse_type)
   */
  warehouseType: number;

  /**
   * 仓库地址
   */
  location: string;

  /**
   * 负责人
   */
  userId: string | number;

  /**
   * 显示顺序
   */
  orderNum: number;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status: number;

  /**
   * 备注
   */
  remark: string;

}

export interface WarehouseInfoForm extends BaseEntity {
  /**
   * 仓库ID
   */
  id?: string | number;

  /**
   * 仓库编码
   */
  warehouseCode?: string;

  /**
   * 仓库名称
   */
  warehouseName?: string;

  /**
   * 仓库类型(字典 warehouse_type)
   */
  warehouseType?: number;

  /**
   * 仓库地址
   */
  location?: string;

  /**
   * 负责人
   */
  userId?: string | number;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface WarehouseInfoQuery extends PageQuery {
  /**
   * 仓库编码
   */
  warehouseCode?: string;

  /**
   * 仓库名称
   */
  warehouseName?: string;

  /**
   * 仓库类型(字典 warehouse_type)
   */
  warehouseType?: number;

  /**
   * 仓库地址
   */
  location?: string;

  /**
   * 负责人
   */
  userId?: string | number;

  /**
   * 显示顺序
   */
  orderNum?: number;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
