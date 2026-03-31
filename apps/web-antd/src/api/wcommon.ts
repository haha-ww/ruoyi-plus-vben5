import { alovaInstance } from '#/utils/http';
/**
 * 查询物料分类下拉
 * @param query
 * @returns {*}
 */

export function listMaterialCategorySelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/materialCategory', {
    params: query
  });
};

/**
 * 查询物料单位下拉
 * @param query
 * @returns {*}
 */
export function listMaterialUnitSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/materialUnit', {
    params: query
  });
};

/**
 * 获取客户下拉
 * @param query
 * @returns {*}
 */
export function listCustomerSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/customer', {
    params: query
  });
};
/**
 * 获取供应商下拉
 * @param query
 * @returns {*}
 */
export function listSupplierSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/supplier', {
    params: query
});
};

/**
 * 获取物料下拉
 * @param query
 * @returns {*}
 */
export function listMaterialSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/material', {
    params: query
});
};
/**
 * 获取仓库下拉
 * @param query
 * @returns {*}
 */
export function listWarehouseSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/warehouse', {
    params: query
  });
};
/**
 * 获取库位下拉
 * @param query
 * @returns {*}
 */
export function listWarehouseLocationSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/warehouseLocation', {
    params: query
  });
};
/**
 * 获取员工下拉
 * @param query
 * @returns {*}
 */
export function liststaffSelect (query?: any) {
  return alovaInstance.get<any[]>('/erp/common/staff', {
    params: query
  });
};

