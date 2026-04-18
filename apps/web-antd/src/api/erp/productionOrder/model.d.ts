import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductionOrderVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 生产订单编码
   */
  orderCode: string;

  /**
   * 生产类型(字典 production_type)
   */
  productionType: number;

  /**
   * 工厂/车间
   */
  deptId: string | number;

  /**
   * 生产负责人
   */
  productionManager: number;

  /**
   * 订单状态（字典 production_order_status）
   */
  orderStatus: number;

  /**
   * 物料id
   */
  materialId: string | number;

  /**
   * 物料名称
   */
  materialName: string;

  /**
   * 物料编码
   */
  materialCode: string;

  /**
   * bom版本号
   */
  bomVersion: string;

  /**
   * 工艺路线ID
   */
  routingId: string | number;

  /**
   * 工艺路线名称
   */
  routingName: string;

  /**
   * 工艺路线明细列表
   */
  routingOperationList: any[];

  /**
   * 生产计划id
   */
  planId: string | number;

  /**
   * 生产计划单号
   */
  planCode: string;

  /**
   * 销售订单id
   */
  salesOrderId: string | number;

  /**
   * 销售订单编码
   */
  salesOrderCode: string;

  /**
   * 生产数量
   */
  orderQuantity: number;

  /**
   * 剩余质检数量
   */
  remainQuantity: number;

  /**
   * 销售订单数量
   */
  salesOrderQuantity: number;

  /**
   * 要求交货日期
   */
  requiredDeliveryDate: string;

  /**
   * 实际开工日期
   */
  actualStartDate: string;

  /**
   * 计划完成日期
   */
  plannedCompletionDate: string;

  /**
   * 是否已领料（0否1是）
   */
  isPick: number;

  /**
   * 生产进度
   */
  progress: number;

  /**
   * 单据日期
   */
  orderDate: string;

  /**
   * 作废日期
   */
  cancelDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductionOrderForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 生产订单编码
   */
  orderCode?: string;

  /**
   * 生产类型(字典 production_type)
   */
  productionType?: number;

  /**
   * 工厂/车间
   */
  deptId?: string | number;

  /**
   * 生产负责人
   */
  productionManager?: number;

  /**
   * 订单状态（字典 production_order_status）
   */
  orderStatus?: number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * 物料名称
   */
  materialName?: string;

  /**
   * 物料编码
   */
  materialCode?: string;

  /**
   * bom版本号
   */
  bomVersion?: string;

  /**
   * 工艺路线ID
   */
  routingId?: string | number;

  /**
   * 工艺路线名称
   */
  routingName?: string;

  /**
   * 工艺路线明细列表
   */
  routingOperationList?: any[];

  /**
   * 生产计划id
   */
  planId?: string | number;

  /**
   * 生产计划单号
   */
  planCode?: string;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 销售订单编码
   */
  salesOrderCode?: string;

  /**
   * 生产数量
   */
  orderQuantity?: number;

  /**
   * 剩余质检数量
   */
  remainQuantity?: number;

  /**
   * 销售订单数量
   */
  salesOrderQuantity?: number;

  /**
   * 要求交货日期
   */
  requiredDeliveryDate?: string;

  /**
   * 实际开工日期
   */
  actualStartDate?: string;

  /**
   * 计划完成日期
   */
  plannedCompletionDate?: string;

  /**
   * 是否已领料（0否1是）
   */
  isPick?: number;

  /**
   * 生产进度
   */
  progress?: number;

  /**
   * 单据日期
   */
  orderDate?: string;

  /**
   * 作废日期
   */
  cancelDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductionOrderQuery extends PageQuery {
  /**
   * 生产订单编码
   */
  orderCode?: string;

  /**
   * 生产类型(字典 production_type)
   */
  productionType?: number;

  /**
   * 工厂/车间
   */
  deptId?: string | number;

  /**
   * 生产负责人
   */
  productionManager?: number;

  /**
   * 订单状态（字典 production_order_status）
   */
  orderStatus?: number;

  /**
   * 物料id
   */
  materialId?: string | number;

  /**
   * bom版本号
   */
  bomVersion?: string;

  /**
   * 生产计划id
   */
  planId?: string | number;

  /**
   * 生产计划单号
   */
  planCode?: string;

  /**
   * 销售订单id
   */
  salesOrderId?: string | number;

  /**
   * 销售订单编码
   */
  salesOrderCode?: string;

  /**
   * 生产数量
   */
  orderQuantity?: number;

  /**
   * 剩余质检数量
   */
  remainQuantity?: number;

  /**
   * 销售订单数量
   */
  salesOrderQuantity?: number;

  /**
   * 要求交货日期
   */
  requiredDeliveryDate?: string;

  /**
   * 实际开工日期
   */
  actualStartDate?: string;

  /**
   * 计划完成日期
   */
  plannedCompletionDate?: string;

  /**
   * 是否已领料（0否1是）
   */
  isPick?: number;

  /**
   * 生产进度
   */
  progress?: number;

  /**
   * 单据日期
   */
  orderDate?: string;

  /**
   * 作废日期
   */
  cancelDate?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
