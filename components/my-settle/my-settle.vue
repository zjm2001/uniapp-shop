<template>
 <!-- 最外层的容器 -->
  <view class="my-settle-container">
 <!-- 全选区域 -->
  <label class="radio" @click="changeAllState">
    <radio color="#C00000" :checked="isFullCheck"  /><text>全选</text>
  </label>

  <!-- 合计区域 -->
  <view class="amount-box">
    合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
  </view>

  <!-- 结算按钮 -->
  <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import { mapGetters,mapMutations,mapState  } from 'vuex'
  export default {
    name:"my-settle",
      computed: {
        ...mapGetters('m_cart', ['checkedCount','checkedGoodsAmount']),  //勾选的商品的总数量和统计勾选商品总价个
        ...mapGetters(['total']),  //store中的getters导出total和addstr详细地址
         ...mapGetters('m_user', ['addstr']),
         ...mapState('m_user', ['token']),  // token 是用户登录成功之后的 token 字符串
        //是否全选
            isFullCheck() {
              return this.total === this.checkedCount
            },
      },
    data() {
      return {
        
      };
    },
    methods:{
         ...mapMutations('m_cart', ['updateAllGoodsState']),
      //全选按钮点点击事件
      changeAllState(){
           this.updateAllGoodsState(!this.isFullCheck)
      },
      //点击结算
      settlement(){
        //第一步判断是否有商品待结算然后判断是否有收获地址再判断用户是否登录
        console.log(!this.addstr);
        if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
         if (!this.addstr) return uni.$showMsg('请选择收货地址！')
         if (!this.token) return uni.$showMsg('请先登录！')
      },
    }
  }
</script>

<style lang="scss">

.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}

</style>