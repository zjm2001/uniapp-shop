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
              pagesize: 15
            },
             goodsList: [], //商品列表
             total: 0,
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
           const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
             if (res.meta.status !== 200) return uni.$showMsg()
             // 为数据赋值
             this.goodsList = res.message.goods
             this.total = res.message.total
       }
    }
  }
</script>

<style lang="scss">
.goods-list{
  padding-bottom: 10px;
}
</style>
