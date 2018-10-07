var URL = "http://120.76.205.241:8000/news/wangyi?pageToken=0&catid=T1348649580692&apikey=ScceUDpXIP7oKjSqGgQhbKOKvn5kfpbmeChXz0Ojjota8XxPLIXAvuqNiMY9U7fS";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsList: [],
        pageToken: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.showLoading({
            title: '加载中...',
        })
        wx.request({
            url: URL,
            success: function (res) {
                wx.stopPullDownRefresh();
                wx.hideLoading();

                console.log(res.data.data);

                //对返回数据进行预处理，对于没有图片地址的予以删除操作
                var arr = [];
                for (var i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].imageUrls != null) {
                        arr.push(res.data.data[i]);
                    }
                    // console.log(res.data.data[i].publishDateStr);
                    res.data.data[i].publishDateStr = res.data.data[i].publishDateStr.slice(11, 16);
                    // console.log(res.data.data[i].publishDateStr);
                }

                // str.replace('2018-06-21T', '')；

                console.log(res.data.data)

                that.setData({
                    newsList: arr
                })

                console.log(that.data.newsList.length);

                var newsLength = that.data.newsList.length;
                // var _that = that;
                if (newsLength < 6) {
                    setTimeout(function () {
                        wx.request({
                            url: URL,
                            data: {
                                pageToken: that.data.pageToken + 10
                            },
                            success: function (res) {
                                //对返回数据进行预处理，对于没有图片地址的予以删除操作
                                var arr = [];
                                for (var i = 0; i < res.data.data.length; i++) {
                                    if (res.data.data[i].imageUrls != null) {
                                        arr.push(res.data.data[i]);
                                    }
                                    // console.log(res.data.data[i].publishDateStr);
                                    res.data.data[i].publishDateStr = res.data.data[i].publishDateStr.slice(11, 16);
                                    // console.log(res.data.data[i].publishDateStr);
                                }

                                that.setData({
                                    newsList: that.data.newsList.concat(arr)
                                })
                                console.log(res);
                            }
                        })
                    }, 1000)
                }

            }
        })

        // console.log(this.data.newsList.length);
        // console.log('okkkkkkk');
        console.log('页面加载');
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
        console.log('页面显示')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('页面隐藏')
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
        this.onLoad();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("到底啦");
        var that = this;
        wx.showLoading({
            title: '加载中...',
        })
        this.setData({
            pageToken: this.data.pageToken + 10
        })
        wx.request({
            url: URL,
            data: {
                pageToken: that.data.pageToken
            },
            success: function (res) {
                wx.hideLoading();
                //对返回数据进行预处理，对于没有图片地址的予以删除操作
                var arr = [];
                for (var i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].imageUrls != null) {
                        arr.push(res.data.data[i]);
                    }
                    res.data.data[i].publishDateStr = res.data.data[i].publishDateStr.slice(11, 16);

                }

                that.setData({
                    newsList: that.data.newsList.concat(arr)
                })
                console.log(res);
            }
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '新闻app',
            path: '/pages/index/index'
        }
    }
})