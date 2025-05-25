import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// import { getToken } from '@/utils/auth'
axios.defaults.headers.post['Content-Type'] = 'text/plain'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 120000 // request timeout（标准为30000ms=0.5分钟）, 120000=2分钟
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers = { 'Content-Type': 'application/json', 'token': store.getters.token }
    } else if (getToken()) {
      config.headers = { 'Content-Type': 'application/json', 'token': getToken(), }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code == 401) { // 鉴权失效
      Message({
        message: res.msg,
        type: 'error',
        duration: 2 * 1000
      })
      let timer = setTimeout(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        clearInterval(timer);
      }, 1000);
      return Promise.reject(response)
    } else if (res.code == 0) { // 正常接口
      return response
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      // message: error.message,
      message: '网络异常，请稍后再试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
