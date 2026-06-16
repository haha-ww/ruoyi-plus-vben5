import type { BaseEntity, PageQuery } from '#/api/common';

export interface MaterialInfoVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 分类（表erp_material_category）
   */
  categoryId: number | string;

  /**
   * 物料编码
   */
  materialCode: string;

  /**
   * 物料名称
   */
  materialName: string;

  /**
   * 物料简称
   */
  materialShortName: string;

  /**
   * 规格型号
   */
  model: string;

  /**
   * 计量单位id（表 erp_material_unit）
   */
  unitId: number | string;

  /**
   * 供应商id（表 erp_supplier）
   */
  supplierId: number | string;

  /**
   * 成本计价方式（字典 pricing_type）
   */
  costPricingType: number;

  /**
   * 成本价格
   */
  costPrice: number;

  /**
   * 供应方式(字典 supply_type)
   */
  supplyMode: number;

  /**
   * 销售单价（含税）
   */
  salesTaxPrice: number;

  /**
   * 销售单价（不含税）
   */
  salesPrice: number;

  /**
   * 采购单价
   */
  purchasePrice: number;

  /**
   * 税率(字典 tax_rate)
   */
  taxRate: number;

  /**
   * 图纸号
   */
  drawingNumber: string;

  /**
   * 图纸ossid
   */
  drawingOssid: number | string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status: number | string;

  /**
   * 备注
   */
  remark: string;

}

export interface MaterialInfoForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 分类（表erp_material_category）
   */
  categoryId?: number | string;

  /**
   * 物料编码
   */
  materialCode?: string;

  /**
   * 物料名称
   */
  materialName?: string;

  /**
   * 物料简称
   */
  materialShortName?: string;

  /**
   * 规格型号
   */
  model?: string;

  /**
   * 计量单位id（表 erp_material_unit）
   */
  unitId?: number | string;

  /**
   * 供应商id（表 erp_supplier）
   */
  supplierId?: number | string;

  /**
   * 成本计价方式（字典 pricing_type）
   */
  costPricingType?: number;

  /**
   * 成本价格
   */
  costPrice?: number;

  /**
   * 供应方式(字典 supply_type)
   */
  supplyMode?: number;

  /**
   * 销售单价（含税）
   */
  salesTaxPrice?: number;

  /**
   * 销售单价（不含税）
   */
  salesPrice?: number;

  /**
   * 采购单价
   */
  purchasePrice?: number;

  /**
   * 税率(字典 tax_rate)
   */
  taxRate?: number;

  /**
   * 图纸号
   */
  drawingNumber?: string;

  /**
   * 图纸ossid
   */
  drawingOssid?: number | string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number | string;

  /**
   * 备注
   */
  remark?: string;

}

export interface MaterialInfoQuery extends PageQuery {
  /**
   * 分类（表erp_material_category）
   */
  categoryId?: number | string;

  /**
   * 物料编码
   */
  materialCode?: string;

  /**
   * 物料名称
   */
  materialName?: string;

  /**
   * 物料简称
   */
  materialShortName?: string;

  /**
   * 规格型号
   */
  model?: string;

  /**
   * 计量单位id（表 erp_material_unit）
   */
  unitId?: number | string;

  /**
   * 供应商id（表 erp_supplier）
   */
  supplierId?: number | string;

  /**
   * 成本计价方式（字典 pricing_type）
   */
  costPricingType?: number;

  /**
   * 成本价格
   */
  costPrice?: number;

  /**
   * 供应方式(字典 supply_type)
   */
  supplyMode?: number;

  /**
   * 销售单价（含税）
   */
  salesTaxPrice?: number;

  /**
   * 销售单价（不含税）
   */
  salesPrice?: number;

  /**
   * 采购单价
   */
  purchasePrice?: number;

  /**
   * 税率(字典 tax_rate)
   */
  taxRate?: number;

  /**
   * 图纸号
   */
  drawingNumber?: string;

  /**
   * 图纸ossid
   */
  drawingOssid?: number | string;

  /**
   * 启用状态（字典 sys_normal_disable）
   */
  status?: number | string;

  /**
    * 日期范围参数
    */
  params?: any;
}
