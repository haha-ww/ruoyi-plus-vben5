import type { PageQuery, BaseEntity } from '#/api/common';

export interface PersonnelClockRecordVO {
  /**
   * 自增ID
   */
  id: string | number;

  /**
   * 部门ID
   */
  deptId: string | number;

  /**
   * 考勤组ID
   */
  groupId: string | number;

  /**
   * 考勤组名称
   */
  group: string;

  /**
   * 考勤班次ID
   */
  shiftId: string | number;

  /**
   * 班次数据
   */
  shiftData: string;

  /**
   * 打卡地址
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
   * 备注
   */
  remark: string;

  /**
   * 图片
   */
  image: string;

  /**
   * 考勤人员ID
   */
  uid: string | number;

  /**
   * 外勤打卡:0、考勤打卡；1、外勤打卡；
   */
  isExternal: number;

}

export interface PersonnelClockRecordForm extends BaseEntity {
  /**
   * 自增ID
   */
  id?: string | number;

  /**
   * 部门ID
   */
  deptId?: string | number;

  /**
   * 考勤组ID
   */
  groupId?: string | number;

  /**
   * 考勤组名称
   */
  group?: string;

  /**
   * 考勤班次ID
   */
  shiftId?: string | number;

  /**
   * 班次数据
   */
  shiftData?: string;

  /**
   * 打卡地址
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
   * 备注
   */
  remark?: string;

  /**
   * 图片
   */
  image?: string;

  /**
   * 考勤人员ID
   */
  uid?: string | number;

  /**
   * 外勤打卡:0、考勤打卡；1、外勤打卡；
   */
  isExternal?: number;

}

export interface PersonnelClockRecordQuery extends PageQuery {
  /**
   * 部门ID
   */
  deptId?: string | number;

  /**
   * 考勤组ID
   */
  groupId?: string | number;

  /**
   * 考勤组名称
   */
  group?: string;

  /**
   * 考勤班次ID
   */
  shiftId?: string | number;

  /**
   * 班次数据
   */
  shiftData?: string;

  /**
   * 打卡地址
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
   * 图片
   */
  image?: string;

  /**
   * 考勤人员ID
   */
  uid?: string | number;

  /**
   * 外勤打卡:0、考勤打卡；1、外勤打卡；
   */
  isExternal?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
