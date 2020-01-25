//导入插件
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import animated from 'animate.css'
import store from './vuex/store'
import cookies from 'vue-cookies'
import qs from 'qs'

import { DatePicker } from 'element-ui'

//Vue全局配置
axios.defaults.baseURL = 'http://localhost:8080/app'
/*axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'*/

Vue.use(animated)
Vue.use(cookies)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.$cookies.config('1d')
Vue.component(DatePicker.name,DatePicker)

//如果cookie中没有记录登陆状态的key，创建默认key
if($cookies.isKey("children_user")===false){
  console.log('false')
  Vue.$cookies.set('children_user',{})
}
if($cookies.isKey("children_isLogin")===false){
  Vue.$cookies.set('children_isLogin','false')
}


//引入的css文件
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/all.css'
import './assets/css/bootstrap.css'
import './assets/css/mdb.css'


//引入的js文件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//全局导航守卫
router.beforeEach((to, from, next) => {
  //确保在未登录状态下只能访问注册和登录两个页面
  let isLogin = $cookies.get('children_isLogin')
  if(to.path !== '/' && to.path !== '/login' && isLogin==='false' && to.path !== '/register'){ return next('/') }
  //确保普通管理员无法访问用户管理页
  else if($cookies.get('children_user').type === 1 && to.path === '/mdb/user'){ return next('/mdb') }
  next()
})
