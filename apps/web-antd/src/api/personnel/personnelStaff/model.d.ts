import type { BaseEntity, PageQuery } from '#/api/common';

export interface PersonnelStaffVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 姓名
   */
  name: string;

  /**
   * 工号
   */
  jobNumber: string;

  /**
   * 手机号
   */
  phone: string;

  /**
   * 身份证号
   */
  idCard: number | string;

  /**
   * 出生日期
   */
  birthday: string;

  /**
   * 年龄
   */
  age: number;

  /**
   * 用户性别（0男 1女 2未知）
   */
  sex: string;

  /**
   * 籍贯
   */
  nativePlace: string;

  /**
   * 现居住地址
   */
  address: string;

  /**
   * 学历（字典degree_type）
   */
  degree: number;

  /**
   * 民族（字典nation_type）
   */
  nation: number;

  /**
   * 政治面貌（字典political_status）
   */
  politicalStatus: number;

  /**
   * 婚姻状况（字典marital_status）
   */
  maritalStatus: number;

  /**
   * 岗位（sys_post表）
   */
  postId: number | string;

  /**
   * 部门（sys_dept表）
   */
  deptId: number | string;

  /**
   * 开户人姓名
   */
  depositPerson: string;

  /**
   * 银行卡号
   */
  bankCard: string;

  /**
   * 开户行
   */
  depositBank: string;

  /**
   * 职称
   */
  title: string;

  /**
   * 人员类型（字典person_type）
   */
  personType: number;

  /**
   * 入职日期
   */
  entryDate: string;

  /**
   * 转正日期
   */
  conversionDate: string;

  /**
   * 离职日期
   */
  departureDate: string;

  /**
   * 试用期(天)
   */
  probationPeriod: number;

  /**
   * 人员状态（字典person_status）
   */
  personStatus: number;

  /**
   * 备注
   */
  remark: string;
}

export interface PersonnelStaffForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 姓名
   */
  name?: string;

  /**
   * 工号
   */
  jobNumber?: string;

  /**
   * 手机号
   */
  phone?: string;

  /**
   * 身份证号
   */
  idCard?: number | string;

  /**
   * 出生日期
   */
  birthday?: string;

  /**
   * 年龄
   */
  age?: number;

  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;

  /**
   * 籍贯
   */
  nativePlace?: string;

  /**
   * 现居住地址
   */
  address?: string;

  /**
   * 学历（字典degree_type）
   */
  degree?: number;

  /**
   * 民族（字典nation_type）
   */
  nation?: number;

  /**
   * 政治面貌（字典political_status）
   */
  politicalStatus?: number;

  /**
   * 婚姻状况（字典marital_status）
   */
  maritalStatus?: number;

  /**
   * 岗位（sys_post表）
   */
  postId?: number | string;

  /**
   * 部门（sys_dept表）
   */
  deptId?: number | string;

  /**
   * 开户人姓名
   */
  depositPerson?: string;

  /**
   * 银行卡号
   */
  bankCard?: string;

  /**
   * 开户行
   */
  depositBank?: string;

  /**
   * 职称
   */
  title?: string;

  /**
   * 人员类型（字典person_type）
   */
  personType?: number;

  /**
   * 入职日期
   */
  entryDate?: string;

  /**
   * 转正日期
   */
  conversionDate?: string;

  /**
   * 离职日期
   */
  departureDate?: string;

  /**
   * 试用期(天)
   */
  probationPeriod?: number;

  /**
   * 人员状态（字典person_status）
   */
  personStatus?: number;

  /**
   * 备注
   */
  remark?: string;
  openAccount?: boolean;

  /**
   * 账号
   */
  userName?: string;

  /**
   * 姓名
   */
  password?: string;
}

export interface PersonnelStaffQuery extends PageQuery {
  /**
   * 姓名
   */
  name?: string;

  /**
   * 工号
   */
  jobNumber?: string;

  /**
   * 手机号
   */
  phone?: string;

  /**
   * 身份证号
   */
  idCard?: number | string;

  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;

  /**
   * 学历（字典degree_type）
   */
  degree?: number;

  /**
   * 岗位（sys_post表）
   */
  postId?: number | string;

  /**
   * 部门（sys_dept表）
   */
  deptId?: number | string;

  /**
   * 人员类型（字典person_type）
   */
  personType?: number;

  /**
   * 入职日期
   */
  entryDate?: string;

  /**
   * 转正日期
   */
  conversionDate?: string;

  /**
   * 离职日期
   */
  departureDate?: string;

  /**
   * 人员状态（字典person_status）
   */
  personStatus?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
