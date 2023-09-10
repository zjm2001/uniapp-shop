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
<!-- uni-swipe-action 是最外层包裹性质的容器 -->
<uni-swipe-action>
<block  v-for="(goods, i) in cart" :key="i"  >
    <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
      <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
  <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
  </uni-swipe-action-item>
</block >
</uni-swipe-action>

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
          options: [{
              text: '删除', // 显示的文本内容
              style: {
                backgroundColor: '#C00000', // 按钮的背景颜色
              }
            }]
      };
    },
    methods:{
       ...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount', 'removeGoodsById']),
      //自定义点击单选框事件触发
      radioChangeHandler(e){
       this.updateGoodsState(e)
      },
      //数量发生变化函数
      numberChangeHandler(e){
       this.updateGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
          this.removeGoodsById(goods.goods_id)
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
