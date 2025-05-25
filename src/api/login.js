import request from '@/utils/request'

//  登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

//  退出登录
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}
