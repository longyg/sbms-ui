import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Intro from '@/views/Intro/Intro'
import api from '@/http/api'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: Home,
    children: [
      {
        path: '',
        name: '系统介绍',
        component: Intro,
        meta: {
          icon: 'fa fa-home fa-lg',
          index: 0
        }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/404',
    name: 'noFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, _, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    if (userName) {
      // 当访问登录页面时，如果已登录，直接跳转到主页
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 当访问其他页面，如果没有登录，跳转到登录页面
      next({path: '/login'})
    } else {
      // 如果已经登录，加载菜单和路由
      addDynamicMenuAndRoutes(userName)
      // 跳转到指定页
      next()
    }
  }
})

function addDynamicMenuAndRoutes(userName) {
  if (store.state.app.menuRouteLoaded) {
    console.log("动态菜单和路由已经存在")
    return
  }
  api.menu.findNavTree({'userName': userName}).then(
    res => {
      // 添加动态路由
      let dynamicRoutes = addDynamicRoutes(res.data)
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.addRoutes(router.options.routes)
      console.log(router.options)
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      // 保存菜单树
      store.commit('setNavTree', res.data)
    }
  ).then(() => {
    api.user.findPermissions({'name': userName}).then(res => {
      // 保存用户权限标识集合
      store.commit('setPerms', res.data)
    })
  }).catch(err => {
    console.log('获取导航菜单失败', err)
  })
}

function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/Sys/User.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = ''
        for (let i = 0; i < array.length; i++) {
          url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
        }
        url = url.substring(0, url.length - 1)
        route['component'] = resolve => require([`@/views/${url}`], resolve)
      } catch(e) {
        console.error(e)
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    // 递归加载子菜单
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
