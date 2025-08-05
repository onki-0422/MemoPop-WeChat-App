// pages/input/input.js
Page({
  data: {
    currentContent: '',
    categories: [],
    currentCategoryIndex: 0
  },

  onLoad() {
    // 使用全局分类
    this.setData({
      categories: getApp().globalData.categories
    });
  },

  onInput(e) {
    this.setData({ 
      currentContent: e.detail.value 
    });
  },

  onCategoryChange(e) {
    this.setData({
      currentCategoryIndex: e.detail.value
    });
  },

  saveMemo() {
    if (!this.data.currentContent.trim()) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      return;
    }

    const newMemo = {
      content: this.data.currentContent,
      category: this.data.categories[this.data.currentCategoryIndex],
      time: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      done: false,
      id: Date.now()
    };

    try {
      const memos = wx.getStorageSync('memoList') || [];
      memos.unshift(newMemo);
      
      wx.setStorageSync('memoList', memos);
      this.setData({ currentContent: '' });
      
      wx.showToast({ title: '保存成功' });
      getApp().globalData.needRefresh = true;
      

    } catch (err) {
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      });
      console.error('存储失败:', err);
    }
  }
});