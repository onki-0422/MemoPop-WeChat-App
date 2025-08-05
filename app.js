App({
  onLaunch() {
    // 初始化云开发
    wx.cloud.init({
      env: '***',
      traceUser: true
    });
  },
  globalData: {
    categories: ['工作', '生活', '学习', '其他'], // 全局分类
    needRefresh: false // 添加刷新标志
  }
});
