import Vue from 'vue'
import Vuex from 'vuex'
import cookies from "vue-cookies";
Vue.use(cookies)
Vue.$cookies.config('1d')

Vue.use(Vuex)

const actions = {}
const state = {
  user: $cookies.get('children_user'),
  isLogin: $cookies.get('children_isLogin')
}
const getters = {
  type: (state) => state.user.type,
  username: (state)  => state.user.username,
  isLogin: (state) => state.isLogin
}
const mutations = {
  setUser:(state,user) => {
    state.user = user
    $cookies.set('children_user',user)
  },
  setIsLogin:(state,status) => {
    state.isLogin = status
    $cookies.set('children_isLogin',status)
  }
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
