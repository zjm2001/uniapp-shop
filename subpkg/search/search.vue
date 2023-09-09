<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title" v-if="historys.length !== 0">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <view class=" txt" v-else >
        没有历史记录了~~~~
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
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
        searchResults: [], //搜索列表数据
        historyList: [], //搜索历史
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed: {
      historys() {
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    },
    methods: {
      input(e) {
        clearTimeout(this.timer) //进入先清除定时器 //防抖实现
        this.timer = setTimeout(() => {
          this.kw = e.value // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.getSearchList() //发送请求获取关键词搜索列表
        }, 500)
      },
      //根据关键词获取搜索列表数据函数
      async getSearchList() {
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory() //查询到数据后进行加入到历史
      },
      //点击搜索item项跳转到对应的商品界面
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      saveSearchHistory() {
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList) // 1. 将 Array 数组转化为 Set 对象
        set.delete(this.kw) // 2. 调用 Set 对象的 delete 方法，移除对应的元素
        set.add(this.kw) // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
        this.historyList = Array.from(set) // 4. 将 Set 对象转化为 Array 数组
        uni.setStorageSync('kw', JSON.stringify(this.historyList)) //持久化存储
      },
      //点击删除搜索历史
      cleanHistory() {
       uni.showModal({
       		title: '提示',
       		content: '确认清空历史记录吗？',
       		success: (res) =>{
       		if (res.confirm) {
       		    // 执行确认后的操作
              this.historyList = [] // 清空 data 中保存的搜索历史
              uni.setStorageSync('kw', '[]') // 清空本地存储中记录的搜索历史
       		} 
       		else {
       			// 执行取消后的操作
       		}
       	}
       })
      },
      //历史搜索跳转
      gotoGoodsList(kw){
         uni.navigateTo({
            url: '/subpkg/goods_list/goods_list?query=' + kw
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
      padding: 13px 8px;
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

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
    .txt{
      text-align: center;
      margin-top: 20px;
      
    }
  }
</style>