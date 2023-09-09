<template>
  <view class="goods-item">
          <!-- 左侧图片 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" mode=""  class="goods-pic"></image>
          </view>
          <!-- 右侧信息 -->
          <view class="goods-item-right">
            <view class="goods-name">{{goods.goods_name}}</view>
          <view class="goods-info-box">
            <view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
          </view>
          </view>
        </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
        goods: {
              type: Object,
              defaul: {},
            },
    },
    data() {
      return {
         defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    padding: 10px 10px;
    margin: 10px;
     border: 1px solid #efefef;
     box-shadow: 0px 5px 5px silver;
 .goods-item-left {
    margin-right: 5px;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
     justify-content: space-between;
    padding: 5px;
        .goods-name {
          font-size: 13px;
        }
    
        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
  }
  }
</style>