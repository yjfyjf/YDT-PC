import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/pages/rop/layout/Layout';

// import Layout from '@/pages/rop/layout/Layout'
import layouth5 from '@/pages/h5/layout/Layout'
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/pages/rop/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/rop/login/index'),
    hidden: true
  },
  {
    path: '/automatic',
    component: () => import('@/pages/rop/login/automatic'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/pages/rop/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/pages/rop/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/pages/rop/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'workplace',
    children: [
      {
        path: '/workplace',
        component: () => import('@/pages/rop/workplace/index'),
        name: 'Workplace',
        meta: { title: '一点通', icon: 'index', noCache: true, roles: [] }
      }
    ]
  },
  {
    path: '/h5',
    component: layouth5,
    redirect: '/h5/setTeacher',
    name: 'h5',
    hidden: true,
    alwaysShow: false,
    children: [
      {
        path: 'setTeacher',
        component: () => import('@/pages/h5/setTeacher'),
        name: 'setTeacher',
        meta: {
          title: '教师入驻',
          keepAlive: false,
          show: false,
          roles: []
        }
      },
    ]
  },
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/operate',
    component: Layout,
    redirect: '/operate/teacher',
    name: 'operate',
    alwaysShow: true,
    meta: { title: '运营管理', icon: 'component', roles: ['super_admin'] },
    children: [
      {
        path: 'teacher',
        component: () => import('@/pages/rop/operate/teacher/index'),
        name: 'teacherList',
        meta: {
          title: '老师',
          keepAlive: false,
          show: true,
          roles: []
        }
      },
      {
        path: 'student',
        component: () => import('@/pages/rop/operate/student/index'),
        name: 'studentList',
        meta: {
          title: '学生',
          keepAlive: false,
          show: true,
          roles: []
        }
      },
      {
        path: 'order',
        component: () => import('@/pages/rop/operate/order/index'),
        name: 'orderList',
        meta: {
          title: '订单',
          keepAlive: false,
          show: true,
          roles: []
        },
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
