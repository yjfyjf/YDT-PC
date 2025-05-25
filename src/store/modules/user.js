import { login, logout } from '@/api/login'
// import * as userService from '@/api/admin'
import { getToken, setToken, removeToken, getName, setName, getUser, setUser, getUId, setUId } from '@/utils/auth'

const user = {
  state: {
    status: '',
    code: '',
    user: getUser(),
    token: getToken(),
    name: getName(),
    uid: getUId(),
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          var result = response.data
          if (result.code == 0) {
            console.log('登录成功', result.data)
            commit('SET_NAME', result.data.nickName)
            commit('SET_USER', JSON.stringify(result.data))
            commit('SET_TOKEN', result.data.token)
            setToken(result.data.token)
            setName(result.data.nickName)
            setUser(JSON.stringify(result.data))
            resolve(result)
          } else {
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', [])
        resolve({roles: []})
        // return getUserInfo(state.token)
        //   .then(response => {
        //     if (response.code !== '0') reject('error')
        //     const data = response.data
        //     // console.log(111111, data)
        //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //       commit('SET_ROLES', data.roles)
        //     } else {
        //       reject('getInfo: roles must be a non-null array !')
        //     }
        //     resolve(response)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })

        const user = JSON.parse(getUser())
        commit('SET_ROLES', user.roles)
        commit('SET_USER', JSON.stringify(user))
        setUser(JSON.stringify(user))
        resolve(user)
      })
    },

    // 获取用户权限
    // GetRoleInfo({ commit, state }) {
    //   return userService.queryResource({})
    //     .then(res => {
    //       console.log('GetRoleInfo then', res)
    //     })
    //     .catch(err => {
    //       console.log('GetRoleInfo catch', err)
    //     })
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出(无论返回结果如何，一律清除cookie退出)
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).finally(res => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

    // 动态修改权限
    // ChangeRoles({ commit, dispatch }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
