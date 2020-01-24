import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/common/Login";
import MDB from "../components/common/MDB";
import Register from "../components/common/Register";
import User from "../components/User";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/mdb',
      name: 'MDB',
      component: MDB,
      redirect: '/mdb/user',
      children: [
        {
          path: 'user',
          name: '用户管理',
          component: User
        }
      ]
    }
  ]
})
