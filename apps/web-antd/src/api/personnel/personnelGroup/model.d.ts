import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelGroupVO {
  /**
   * 自增ID
   */
  id: number | string;

  /**
   * 考勤组名称
   */
  name: string;

  /**
   * 考勤类型:0、人员；1、部门；
   */
  type: number;

  /**
   * 详细地址
   */
  address: string;

  /**
   * 纬度
   */
  lat: string;

  /**
   * 经度
   */
  lng: string;

  /**
   * 有效范围
   */
  effectiveRange: number;

  /**
   * 考勤地点名称
   */
  locationName: string;

  /**
   * 允许补卡
   */
  repairAllowed: number;

  /**
   * 补卡类型:1、缺卡;2、迟到;3、严重迟到;4、早退；
   */
  repairType: string;

  /**
   * 补卡时间限制:0、不限制；1、限制；
   */
  isLimitTime: number;

  /**
   * 补卡时间
   */
  limitTime: number;

  /**
   * 补卡次数限制:0、不限制；1、限制；
   */
  isLimitNumber: number;

  /**
   * 补卡次数
   */
  limitNumber: number;

  /**
   * 拍照打卡:0、不限制；1、限制；
   */
  isPhoto: number;

  /**
   * 外勤打卡:0、不限制；1、限制；
   */
  isExternal: number;

  /**
   * 外勤打卡备注:0、不限制；1、限制；
   */
  isExternalNote: number;

  /**
   * 外勤打卡拍照:0、不限制；1、限制；
   */
  isExternalPhoto: number;

  /**
   * 业务员ID
   */
  uid: number | string;

  /**
   *
   */
  createdAt: string;

  /**
   * 备注
   */
  remark: string;
}

export interface PersonnelGroupForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: number | string;

  /**
   * 考勤组名称
   */
  name?: string;

  /**
   * 考勤类型:0、人员；1、部门；
   */
  type?: number;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 纬度
   */
  lat?: string;

  /**
   * 经度
   */
  lng?: string;

  /**
   * 有效范围
   */
  effectiveRange?: number;

  /**
   * 考勤地点名称
   */
  locationName?: string;

  /**
   * 允许补卡
   */
  repairAllowed?: number;

  /**
   * 补卡类型:1、缺卡;2、迟到;3、严重迟到;4、早退；
   */
  repairType?: string;

  /**
   * 补卡时间限制:0、不限制；1、限制；
   */
  isLimitTime?: number;

  /**
   * 补卡时间
   */
  limitTime?: number;

  /**
   * 补卡次数限制:0、不限制；1、限制；
   */
  isLimitNumber?: number;

  /**
   * 补卡次数
   */
  limitNumber?: number;

  /**
   * 拍照打卡:0、不限制；1、限制；
   */
  isPhoto?: number;

  /**
   * 外勤打卡:0、不限制；1、限制；
   */
  isExternal?: number;

  /**
   * 外勤打卡备注:0、不限制；1、限制；
   */
  isExternalNote?: number;

  /**
   * 外勤打卡拍照:0、不限制；1、限制；
   */
  isExternalPhoto?: number;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   *
   */
  createdAt?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 考勤部门数组
   */
  deptArr?: Array;
  /**
   * 考勤人员数组
   */
  userArr?: Array;
  /**
   * 班次数组
   */
  shiftArr?: Array;
}

export interface PersonnelGroupQuery extends PageQuery {
  /**
   * 考勤组名称
   */
  name?: string;

  /**
   * 考勤类型:0、人员；1、部门；
   */
  type?: number;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 纬度
   */
  lat?: string;

  /**
   * 经度
   */
  lng?: string;

  /**
   * 有效范围
   */
  effectiveRange?: number;

  /**
   * 考勤地点名称
   */
  locationName?: string;

  /**
   * 允许补卡
   */
  repairAllowed?: number;

  /**
   * 补卡类型:1、缺卡;2、迟到;3、严重迟到;4、早退；
   */
  repairType?: string;

  /**
   * 补卡时间限制:0、不限制；1、限制；
   */
  isLimitTime?: number;

  /**
   * 补卡时间
   */
  limitTime?: number;

  /**
   * 补卡次数限制:0、不限制；1、限制；
   */
  isLimitNumber?: number;

  /**
   * 补卡次数
   */
  limitNumber?: number;

  /**
   * 拍照打卡:0、不限制；1、限制；
   */
  isPhoto?: number;

  /**
   * 外勤打卡:0、不限制；1、限制；
   */
  isExternal?: number;

  /**
   * 外勤打卡备注:0、不限制；1、限制；
   */
  isExternalNote?: number;

  /**
   * 外勤打卡拍照:0、不限制；1、限制；
   */
  isExternalPhoto?: number;

  /**
   * 业务员ID
   */
  uid?: number | string;

  /**
   *
   */
  createdAt?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
