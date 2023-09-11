
const state={
  address:{}
}
const mutations={
  //更新收货地址
     updateAddress(state, address) {
        state.address = address
         this.commit('m_user/saveAddressToStorage')
      },
       //  定义将 address 持久化存储到本地 mutations 方法
    saveAddressToStorage(state) {
        uni.setStorageSync('address', JSON.stringify(state.address))
      },

}
const getters={
     // 收货详细地址的计算属性
      addstr(state) {
        if (!state.address.provinceName) return '' 
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo    // 拼接 省，市，区，详细地址 的字符串并返回给用户
      }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}