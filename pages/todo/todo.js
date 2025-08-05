Page({
  data: {
    categories: [],
    todos: []
  },
  
  onLoad() {
    // 使用全局分类
    this.setData({
      categories: getApp().globalData.categories
    });
  },
  
  onShow() {
    this.loadTodos();
  },
  
  loadTodos() {
    const allMemos = wx.getStorageSync('memoList') || [];
    this.setData({
      todos: allMemos.filter(item => !item.done) // 只显示未完成
    });
  },
  
  // 切换待办状态
  toggleTodo(e) {
    const todoId = e.currentTarget.dataset.id;
    const memos = wx.getStorageSync('memoList') || [];
    
    // 根据id找到对应的memo
    const memoIndex = memos.findIndex(memo => memo.id === todoId);
    if (memoIndex !== -1) {
      // 标记为已完成
      memos[memoIndex].done = true;
      wx.setStorageSync('memoList', memos);
      
      // 立即从当前列表中移除该项目
      const currentTodos = this.data.todos.filter(todo => todo.id !== todoId);
      this.setData({
        todos: currentTodos
      });
      
      // 设置全局刷新标志
      getApp().globalData.needRefresh = true;
      
      // 显示完成提示
      wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 1000
      });
    }
  }
})