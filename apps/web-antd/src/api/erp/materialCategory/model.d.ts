import type { PageQuery, BaseEntity } from '#/api/common';

export interface MaterialCategoryVO {
  /**
   * 主键
   */
  id: string | number;

  /**
   * 上级分类id
   */
  parentId: string | number;

  /**
   * 分类编码
   */
  categoryCode: string;

  /**
   * 分类名称
   */
  categoryName: string;

  /**
   * 分类状态（字典 sys_normal_disable）
   */
  status: number;

  /**
   * 序列值
   */
  number: number;

  /**
   * 备注
   */
  remark: string;

}

export interface MaterialCategoryForm extends BaseEntity {
  /**
   * 主键
   */
  id?: string | number;

  /**
   * 上级分类id
   */
  parentId?: string | number;

  /**
   * 分类编码
   */
  categoryCode?: string;

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 分类状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
   * 序列值
   */
  number?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface MaterialCategoryQuery extends PageQuery {
  /**
   * 上级分类id
   */
  parentId?: string | number;

  /**
   * 分类编码
   */
  categoryCode?: string;

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 分类状态（字典 sys_normal_disable）
   */
  status?: number;

  /**
   * 序列值
   */
  number?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
