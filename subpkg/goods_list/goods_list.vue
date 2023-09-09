<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i"  @click="gotoDetail(goods)">
          <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
          <my-goods :goods="goods"></my-goods>
      </view>
      <view class="txt" v-if="isShow">
        没有更多了~~~~
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
            queryObj: {
              query: '',
              cid: '',
              pagenum: 1,
              pagesize: 10
            },
             goodsList: [], //商品列表
             total: 0,
             isloading: false, //防止多次频繁发起多次请求
             isShow:false
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
       this.getGoodsList()
    },
    methods:{
       async getGoodsList (cb){
           this.isloading=true  //渲染数据打开节流阀
           const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
           this.isloading=false  //数据加载完毕关闭节流阀
           cb && cb()
             if (res.meta.status !== 200) return uni.$showMsg()
             // 为数据赋值
             this.goodsList =[...this.goodsList,... res.message.goods]
             this.total = res.message.total
       },
       //点击跳转到商品详情页面
       gotoDetail(goods){
           uni.navigateTo({
             url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
           })
       }
    },
    //触底事件
    onReachBottom() {
       if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
           this.isShow=true
         return  uni.$showMsg('数据加载完毕！')
       }
      
      if(this.isloading) return   //判断是否有其他数据在请求
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
       // 1. 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        this.getGoodsList(() => uni.stopPullDownRefresh())      //  重新发起请求且停止下啦刷新数据
    }
  }
</script>

<style lang="scss">
.goods-list{
  padding-bottom: 10px;
  .txt{
    text-align: center;
  }
}
</style>
