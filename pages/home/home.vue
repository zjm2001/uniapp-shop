<template>
  <view>
<!-- 使用自定义的搜索组件 -->
<view class="search-box">
  <my-search @click="gotoSearch"></my-search>
</view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 渲染楼层区域 -->
    <view class="floot-list">
       <view class="floot-item" v-for="(item,i) in floorList " :key="i">
         <image :src="item.floor_title.image_src" mode="widthFix" class="floor-title"></image>
         <!-- 楼层图片区域 -->
         <view class="floor-img-box">
           <navigator  class="left-img-box" :url="item.product_list[0].url">
             <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
           </navigator >
           <view class="right-img-box">
             <navigator  class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
               <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
             </navigator >
           </view>
         </view>
       </view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {  
    mixins: [badgeMix],
    data() {
      return {
        swiperList: [], // 轮播图的数据列表，默认为空数组
        navList: [], // 分类导航的数据列表
        floorList: [] //楼层数据列表
      }
    },
    onLoad() {
      this.getSwiperList() // 获取轮播图数据
      this.getNavList() //获取分类导航数据
      this.getFloorList() //获取楼层方法

    },
    methods: {
      // 获取轮播图数据方法
      async getSwiperList() {
        const { data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      /** 获取分类导航数据*/
      async getNavList() {
        const {  data: res} = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      //分类点击事件
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }else{
          uni.navigateTo({
            url:'/subpkg/goods_list/goods_list?query='+item.name.substring(0,2)
          })
        }
      },
      //获取楼层数据
      async getFloorList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        // 通过双层 forEach 循环，处理 URL 地址
          res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
        this.floorList = res.message
      },
      //搜索组件跳转
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }

    }

  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  .floot-item{
    margin: 25px 0;
  }
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}

</style>