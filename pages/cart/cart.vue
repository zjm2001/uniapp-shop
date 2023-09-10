<template>
  <view>
  <!-- 购物车商品列表的标题区域 -->
  <view class="cart-title">
    <!-- 左侧的图标 -->
    <uni-icons type="shop" size="18"></uni-icons>
    <!-- 描述文本 -->
    <text class="cart-title-text">购物车</text>
  </view>
<!-- 商品列表区域 -->
<block  v-for="(goods, i) in cart" :key="i"  >
  <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
</block >

  </view>
</template>

<script>
  import {mapGetters,mapMutations } from 'vuex'
 import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
      mixins: [badgeMix],
      computed:{
        ...mapGetters(['cart'])
      },
    data() {
      return {
        
      };
    },
    methods:{
       ...mapMutations('m_cart', ['updateGoodsState']),
      //自定义点击单选框事件触发
      radioChangeHandler(e){
       this.updateGoodsState(e)
      },
      //数量发生变化函数
      numberChangeHandler(e){
        console.log(e);
      }
    }
  }
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}

</style>
