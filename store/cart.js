const state = {
  // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
  cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
}
const mutations = {
  //添加商品函数
  addToCart(state, goods) {
    const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
    if (!findResult) {
      state.cart.push(goods)
    } else {
      findResult.goods_count++
    }
    // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
    this.commit('m_cart/saveToStorage')
  },
  //持久化处理
  saveToStorage(state) {
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  },
  //更新购物车选中数据状态
  updateGoodsState(state, goods) {
    const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
    if (findResult) {
      findResult.goods_state = goods.goods_state // 更新对应商品的勾选状态
      this.commit('m_cart/saveToStorage') // 持久化存储到本地
    }
  },
  // 更新购物车中商品的数量
  updateGoodsCount(state, goods) {
    const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
    if (findResult) {
      findResult.goods_count = goods.goods_count
      this.commit('m_cart/saveToStorage')
    }
  },
  // 根据 Id 从购物车中删除对应的商品信息
  removeGoodsById(state, goods_id) {
    // 调用数组的 filter 方法进行过滤
    state.cart = state.cart.filter(x => x.goods_id !== goods_id)
    // 持久化存储到本地
    this.commit('m_cart/saveToStorage')
  },
  //更新全选状态
  updateAllGoodsState(state, newState) {
    state.cart.forEach(item => item.goods_state = newState)
    this.commit('m_cart/saveToStorage')
  }
}
const getters = {
  // 勾选的商品的总数量
  checkedCount(state) {
    // 先使用 filter 方法，从购物车中过滤器已勾选的商品
    // 再使用 reduce 方法，将已勾选的商品总数量进行累加
    // reduce() 的返回值就是已勾选的商品的总数量
    return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
  },
  //统计勾选商品总价个
  checkedGoodsAmount(state) {
    return state.cart.filter(x => x.goods_state)
                      .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
                      .toFixed(2)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}