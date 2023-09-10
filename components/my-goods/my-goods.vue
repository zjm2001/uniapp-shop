<template>
  <view class="goods-item">
    <!-- 左侧图片 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler" ></radio>
      <image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-pic"></image>
    </view>
    <!-- 右侧信息 -->
    <view class="goods-item-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
         <!-- 商品数量 -->
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        defaul: {},
      },
      showRadio: {
        type: Boolean, // 是否展示图片左侧的 radio
        default: false,
      },
     showNum: {  // 是否展示价格右侧的 NumberBox 组件
            type: Boolean,
            default: false,
       },
    },
    data() {
      return {
        defaultPic: 'https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=ee323c6c71cf3bc7e855c5eae1309699/3801213fb80e7becdddcc3802e2eb9389b506b49.jpg',
      }
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods:{
      //点击单选框事件
      radioClickHandler(){
         this.$emit('radio-change', {
              goods_id: this.goods.goods_id,               // 商品的 Id
              goods_state: !this.goods.goods_state              // 商品最新的勾选状态
            })
      },
      //数字框加减改变事件
      numChangeHandler(val){
        this.$emit('num-change', {  //触发自定义事件发送数据到父组件
             goods_id: this.goods.goods_id,
             goods_count: +val   //隐式转化为数字
           })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 10px;
    margin: 10px;
    border: 1px solid #efefef;
    box-shadow: 0px 5px 5px silver;

    .goods-item-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px;

      .goods-name {
        font-size: 13px;
      }
    .goods-info-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>