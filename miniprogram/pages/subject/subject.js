// pages/subject/subject.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
     //上课长度全部默认为两节课
      { "xqj": 1, "sksj": '1', "skcd":'2',"kcxx":""},
      { "xqj": 1, "sksj": '3', "skcd": '2', "kcxx": ""},
      { "xqj": 1, "sksj": '6', "skcd": '2', "kcxx": ""},
      { "xqj": 1, "sksj": '8', "skcd": '2', "kcxx":""},
      { "xqj": 1, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 1, "sksj": '12', "skcd": '2', "kcxx": "" },
      { "xqj": 2, "sksj": '1', "skcd": '2', "kcxx": "" },
      { "xqj": 2, "sksj": '3', "skcd":'2', "kcxx": "" },
      { "xqj": 2, "sksj": '6', "skcd": '2', "kcxx": "" },
      { "xqj": 2, "sksj": '8', "skcd": '2', "kcxx": "" },
      { "xqj": 2, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 2, "sksj": '12', "skcd": '2', "kcxx": "" },
      { "xqj": 3, "sksj": '1', "skcd": '2', "kcxx": "" },
      { "xqj": 3, "sksj": '3', "skcd": '2', "kcxx": "" },
      { "xqj": 3, "sksj": '6', "skcd": '2', "kcxx": "" },
      { "xqj": 3, "sksj": '8', "skcd": '2', "kcxx": "" },
      { "xqj": 3, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 3, "sksj": '12', "skcd": '2', "kcxx": "" },
      { "xqj": 4, "sksj": '1', "skcd": '2', "kcxx": "" },
      { "xqj": 4, "sksj": '3', "skcd": '2', "kcxx": "" },
      { "xqj": 4, "sksj": '6', "skcd": '2', "kcxx": "" },
      { "xqj": 4, "sksj": '8', "skcd": '2', "kcxx": "" },
      { "xqj": 4, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 4, "sksj": '12', "skcd": '2', "kcxx": "" },
      { "xqj": 5, "sksj": '1', "skcd": '2', "kcxx": "" },
      { "xqj": 5, "sksj": '3', "skcd": '2', "kcxx": "" },
      { "xqj": 5, "sksj": '6', "skcd": '2', "kcxx": "" },
      { "xqj": 5, "sksj": '8', "skcd": '2', "kcxx": "" },
      { "xqj": 5, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 5, "sksj": '12', "skcd": '2', "kcxx": "" },
      { "xqj": 6, "sksj": '1', "skcd": '2', "kcxx": "" },
      { "xqj": 6, "sksj": '3', "skcd": '2', "kcxx": "" },
      { "xqj": 6, "sksj": '6', "skcd": '2', "kcxx": "" },
      { "xqj": 6, "sksj": '8', "skcd": '2', "kcxx": "" },
      { "xqj": 6, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 6, "sksj": '12', "skcd": '2', "kcxx": " " },
      { "xqj": 7, "sksj": '1', "skcd": '2', "kcxx": " " },
      { "xqj": 7, "sksj": '3', "skcd": '2', "kcxx": " " },
      { "xqj": 7, "sksj": '6', "skcd": '2', "kcxx": " " },
      { "xqj": 7, "sksj": '8', "skcd": '2', "kcxx": "" },
      { "xqj": 7, "sksj": '10', "skcd": '2', "kcxx": "" },
      { "xqj": 7, "sksj": '12', "skcd": '2', "kcxx": " " }
    ]
  },
  showCardView: function (e) {
    wx.navigateTo({
      url: '/pages/set/set?id=' + e.currentTarget.id
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    /**
     
    let that = this
    wx.getStorage({
      key: 'kcxx',
      success(res){
        var hkcxx = res.data
        wx.getStorage({
          key: 'sksj',
          success(res){
            var hsksj = res.data
            wx.getStorage({
              key: 'xqj',
              success(res){
                var hxqj = res.data
                var i = 0;
                var wl = that.data.wlist
                for(i=0;i<42;i++){
                if(wl[i].sksj == hsksj && wl[i].xqj == hxqj){
                 wl[i].kcxx = hkcxx
                }
                }
                 that.setData({
                   wlist:wl
                   })
              }
            })
          }
        })
      }
    })*/

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.getStorage({
      key:'_id',
      success(res){
        var id = res.data
        db.collection("user")
        .doc(id)
        .get()
        .then(res=>{
          that.setData({
            wlist:res.data.schedule
          })
        })
      },
      fail(){
        wx.showToast({
          title: '加载失败',
          icon:"loading",
          duration:2000
        })

      }
    })
   
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
