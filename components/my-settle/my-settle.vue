<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'checkedGoodsAmount']), //勾选的商品的总数量和统计勾选商品总价个
      ...mapGetters(['total','cart']), //store中的getters导出total和addstr详细地址
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']), // token 是用户登录成功之后的 token 字符串
      //是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      },
    },
    data() {
      return {
        seconds: 5, // 倒计时的秒数
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      //全选按钮点点击事件
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      //点击结算
      settlement() {
        //第一步判断是否有商品待结算然后判断是否有收获地址再判断用户是否登录
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
        if (!this.addstr) return uni.$showMsg('请选择收货地址！')
        // if (!this.token) return uni.$showMsg('请先登录！')
        if (!this.token) return this.delayNavigate()
          this.payOrder()      // 4. 实现微信支付功能
      },
      // 展示倒计时的提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          icon: 'none', // 不展示任何图标
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页', // 提示的消息
          mask: true, // 为页面添加透明遮罩，防止点击穿透
          duration: 1500 // 1.5 秒后自动消失
        })
      },
      //实现点击展示消息然后跳转登录
      delayNavigate() {
        this.seconds = 5
        this.showTips(this.seconds) // 1. 展示提示消息，此时 seconds 的值等于 3
        this.timer = setInterval(() => { // 创建定时器，每隔 1 秒执行一次
          this.seconds--
          if (this.seconds <= 0) {

            clearInterval(this.timer) // 清除定时器 跳转到 my 页面
            uni.switchTab({
              url: '/pages/my/my',
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updateRedirectInfo({
                  // 跳转的方式
                  openType: 'switchTab',
                  // 从哪个页面跳转过去的
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds) // 再根据最新的秒数，进行消息提示
        }, 1000)
      },
      //支付功能
   async payOrder() {
     const orderInfo = {
       // 开发期间，注释掉真实的订单价格， // 写死订单总价为 1 分钱   // order_price: this.checkedGoodsAmount,
       order_price: 0.01,
       consignee_addr: this.addstr,
       goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
     }
     const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)    // 1.2 发起请求创建订单
     if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
     const orderNumber = res.message.order_number       // 1.3 得到服务器响应的“订单编号”
      // 2. 订单预支付
    const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
     if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
     const payInfo = res2.message.pay
      // 3. 发起微信支付
      const [err, succ] = await uni.requestPayment(payInfo)
       if (err) return uni.$showMsg('订单未支付！')
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
          if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
          uni.showToast({
               title: '支付完成！',
               icon: 'success'
             })
    }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    // 将背景色从 cyan 改为 white
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>