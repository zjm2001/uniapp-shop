<template>
    <view>
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
         <view class="nav-item" v-for="(item, i) in navList" :key="i">
           <image :src="item.image_src" class="nav-img"></image>
         </view>
      </view>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],  // 轮播图的数据列表，默认为空数组
       navList: [],     // 分类导航的数据列表
      }
    },
    onLoad() {
      this.getSwiperList() // 获取轮播图数据
      this.getNavList() //获取分类导航数据

    },
    methods: {
      // 获取轮播图数据方法
      async getSwiperList() {
         const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
  // 3.2 请求失败
      if (res.meta.status !== 200)   return uni.$showMsg()
      // 3.3 请求成功，为 data 中的数据赋值
      this.swiperList = res.message
      },
      /** 获取分类导航数据*/
     async  getNavList(){
         const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
              if (res.meta.status !== 200) return uni.$showMsg()
              this.navList = res.message
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

</style>