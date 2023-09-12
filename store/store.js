// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import m_cart from '@/store/cart.js'
import m_user from '@/store/user.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  modules: {
    m_cart,
    m_user
  },
  getters:{
    cart:state => state.m_cart.cart,
     // 统计购物车中商品的总数量
     total:state=> {
          let c = 0
          state.m_cart.cart.forEach(goods => c += goods.goods_count)
          return c
       },
     address:state=> state.m_user.address,
  }
})

// 4. 向外共享 Store 的实例对象
export default store