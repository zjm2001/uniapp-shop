const state = {
  address: JSON.parse(uni.getStorageSync('address') || '{}'), //收获地址
  token: uni.getStorageSync('token') || '', //登录成功后的token
  userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'), //用户基本信息
  redirectInfo: null   // 重定向的 object 对象 { openType, from }
}
const mutations = {
  //更新收货地址
  updateAddress(state, address) {
    state.address = address
    this.commit('m_user/saveAddressToStorage')
  },
  //  定义将 address 持久化存储到本地 mutations 方法
  saveAddressToStorage(state) {
    uni.setStorageSync('address', JSON.stringify(state.address))
  },
  // 更新用户的基本信息
  updateUserInfo(state, userinfo) {
    state.userinfo = userinfo
    this.commit('m_user/saveUserInfoToStorage')
  },
  // 将 userinfo 持久化存储到本地
  saveUserInfoToStorage(state) {
    uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
  },
  // 更新 token 字符串
  updateToken(state, token) {
    state.token = token
    this.commit('m_user/saveTokenToStorage')
  },
  // 将 token 字符串持久化存储到本地
  saveTokenToStorage(state) {
    uni.setStorageSync('token', state.token)
  },
   // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }

}
const getters = {
  // 收货详细地址的计算属性
  addstr(state) {
    if (!state.address.provinceName) return ''
    return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
      .detailInfo // 拼接 省，市，区，详细地址 的字符串并返回给用户
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}