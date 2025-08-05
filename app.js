App({
  onLaunch() {
    // 初始化云开发（如果使用）
    wx.cloud.init({
      env: 'cloud1-7g152bmda6251df1',
      traceUser: true
    });
  },
  globalData: {
    categories: ['工作', '生活', '学习', '其他'], // 全局分类
    needRefresh: false // 添加刷新标志
  }
});