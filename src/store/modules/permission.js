import { asyncRouterMap, constantRouterMap } from '@/router/index'
// import { constantRouterMap } from '@/router'
// import router from '@/router'
// import { getMenuList } from '@/api/login'
import Layout from '@/pages/rop/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        const routerMap = asyncRouterMap.slice()
        commit('SET_ROUTERS', routerMap)
        console.log(routerMap, '路由')
        resolve()
      })
    }
  }
}
export default permission
