const state = {
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
      cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
}
const mutations = {
  //添加商品函数
  addToCart(state,goods){
  const findResult =  state.cart.find(item=>item.goods_id === goods.goods_id)
  if(!findResult ){
    state.cart.push(goods)
  }else{
        findResult.goods_count++
      }
       // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
       this.commit('m_cart/saveToStorage')
  },
  //持久化处理
  saveToStorage(state){
     uni.setStorageSync('cart', JSON.stringify(state.cart))
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}