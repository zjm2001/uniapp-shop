<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods,i) in goodsList" :key="i">
          <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
          <my-goods :goods="goods"></my-goods>
      </block>
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
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
       this.getGoodsList()
    },
    methods:{
       async getGoodsList (){
           this.isloading=true  //渲染数据打开节流阀
           const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
           this.isloading=false  //数据加载完毕关闭节流阀
             if (res.meta.status !== 200) return uni.$showMsg()
             // 为数据赋值
             this.goodsList =[...this.goodsList,... res.message.goods]
             this.total = res.message.total
       }
    },
    //触底事件
    onReachBottom() {
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if(this.isloading) return   //判断是否有其他数据在请求
      this.queryObj.pagenum += 1
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">
.goods-list{
  padding-bottom: 10px;
}
</style>
