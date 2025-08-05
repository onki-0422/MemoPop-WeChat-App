Page({
  data: { memos: [] },
  
  onShow() {
    // 从缓存加载数据
    this.setData({
      memos: wx.getStorageSync('memoList') || []
    });
    
    // 如果有全局刷新标志则重新加载
    if (getApp().globalData.needRefresh) {
      this.loadData();
      getApp().globalData.needRefresh = false;
    }
  },
  
  loadData() {
    this.setData({
      memos: wx.getStorageSync('memoList') || []
    });
  }
})