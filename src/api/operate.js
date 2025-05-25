import request from '@/utils/request'

//  删除学员
export function deleteStudent(params) {
  return request({
    url: '/studentInfo/delete',
    method: 'get',
    params
  })
}

//  查询学员信息详情
export function getStudentInfoDetail(params) {
  return request({
    url: '/studentInfo/getStudentInfoDetail',
    method: 'get',
    params
  })
}

//  分页查询学员信息
export function getStudentList(data) {
  return request({
    url: '/studentInfo/pageStudentInfo',
    method: 'post',
    data
  })
}

//  保存学员信息
export function studentSave(data) {
  return request({
    url: '/studentInfo/save',
    method: 'post',
    data
  })
}

//  修改学员信息
export function studentUpdate(data) {
  return request({
    url: '/studentInfo/update',
    method: 'post',
    data
  })
}

//  查询老师列表
export function getTeacherList(data) {
  return request({
    url: '/teacherInfo/pageTeacherInfo',
    method: 'post',
    data
  })
}

//  删除老师
export function deleteTeacher(params) {
  return request({
    url: '/teacherInfo/delete',
    method: 'get',
    params
  })
}

//  新增老师
export function addEditTeacher(data) {
  return request({
    url: '/teacherInfo/save',
    method: 'post',
    data
  })
}

//  编辑老师
export function teacherUpdate(data) {
  return request({
    url: '/teacherInfo/update',
    method: 'post',
    data
  })
}

//  查看老师详情
export function getTeacherDetail(params) {
  return request({
    url: '/teacherInfo/getTeacherInfoDetail',
    method: 'get',
    params
  })
}

//  删除订单信息
export function orderDelete(params) {
  return request({
    url: '/reservationOrder/delete',
    method: 'get',
    params
  })
}

//  查询订单详情
export function getOrderDetail(params) {
  return request({
    url: '/reservationOrder/getReservationOrderInfoDetail',
    method: 'get',
    params
  })
}

//  分页查询订单信息
export function getOrderList(data) {
  return request({
    url: '/reservationOrder/pageReservationOrderInfo',
    method: 'post',
    data
  })
}

//  保存订单信息
export function orderSave(data) {
  return request({
    url: '/reservationOrder/save',
    method: 'post',
    data
  })
}

//  修改订单信息
export function orderUpdate(data) {
  return request({
    url: '/reservationOrder/update',
    method: 'post',
    data
  })
}

//  查询年级信息
export function getListGradeInfo(data) {
  return request({
    url: '/gradeInfo/listGradeInfo',
    method: 'post',
    data
  })
}

//  根据年级编码查询科目
export function getGradeSubject(params) {
  return request({
    url: '/gradeSubjectRel/getGradeSubject',
    method: 'get',
    params
  })
}

//  文件上传
export function upload(data) {
  return request({
    url: '/attachment/upload',
    method: 'post',
    data,
    dataType: 'file'
  })
}
