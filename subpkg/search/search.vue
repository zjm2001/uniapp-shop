<template>
  <view >
  <view class="search-box">
    <!-- 使用 uni-ui 提供的搜索组件 -->
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
  </view>
  <!-- 搜索建议列表 -->
  <view class="sugg-list">
    <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </view>
</view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null, // 延时器的 timerId
        kw: '', // 搜索关键词
        searchResults: [] //搜索列表数据
      };
    },
    methods: {
      input(e) {
        clearTimeout(this.timer) //进入先清除定时器 //防抖实现
        this.timer = setTimeout(() => {
          this.kw = e.value  // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.getSearchList() //发送请求获取关键词搜索列表
        }, 500)
      },
      //根据关键词获取搜索列表数据函数
     async getSearchList(){
        if (this.kw === '') {
           this.searchResults = []
           return
         }
      const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
     },
     //点击搜索item项跳转到对应的商品界面
     gotoDetail(goods_id) {
       uni.navigateTo({
         // 指定详情页面的 URL 地址，并传递 goods_id 参数
         url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
       })
     }

    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .sugg-list {
    padding: 0 5px;
  
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

</style>