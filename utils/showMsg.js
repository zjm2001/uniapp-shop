const $showMsg = function(title = '数据加载失败！', duration = 1500)  {
 return uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
export default $showMsg