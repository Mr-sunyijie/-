var URL = 'http://120.76.205.241:8000/comment/wangyi?apikey=ScceUDpXIP7oKjSqGgQhbKOKvn5kfpbmeChXz0Ojjota8XxPLIXAvuqNiMY9U7fS'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    id: '',
    pageToken: 1,
    hasNext: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
        id: options.newsID 
    })

    var that = this;
    wx.request({
        url: URL,
        data: {
            id: this.data.id
        },
        success: function (res) {
            console.log(res.data.data);
            that.setData({
                comments: res.data.data
            })
            console.log(res.data);
        }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var that = this;
      wx.showLoading({
          title: '加载中...',
      })
      this.setData({
          pageToken: this.data.pageToken + 1
      })
      wx.request({
          url: URL,
          data: {
              id: this.data.id,
              pageToken: this.data.pageToken
          },
          success: function (res) {

            

              wx.hideLoading();
              

              that.setData({
                  comments: that.data.comments.concat(res.data.data)
              })
              console.log(res);

              if (res.data.pageToken == null) {
                  that.setData({
                      hasNext: true
                  })
                  console.log("没有更多评论了")
              }
          }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})