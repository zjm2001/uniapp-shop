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
  },
  //更新购物车数据状态
  updateGoodsState(state,goods){
    const findResult = state.cart.find(item=>item.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state         // 更新对应商品的勾选状态
        this.commit('m_cart/saveToStorage')         // 持久化存储到本地
      }
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}