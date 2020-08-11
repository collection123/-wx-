// pages/set/set.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    focus2: false,
    focus3: false,
    focus4: false,
    focus5: false,
    focus6:false,
    xqj:0,
    kcmc: "",
    didian:"",
    sksj:"0",
    startzhou:"",
    endzhou:"",
    kcxx:"",
    cahnged:false,
    able:false
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      kcmc: e.detail.value
    })

  },
  bindButtonTap2: function () {
    this.setData({
      focus2: true
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      didian: e.detail.value
    })
  },
  bindButtonTap3: function () {
    this.setData({
      focus3: true
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      sksj: e.detail.value
    })
  },
  bindButtonTap4: function () {
    this.setData({
      focus4: true
    })
  },
  bindKeyInput4: function (e) {
    this.setData({
      startzhou: e.detail.value
    })
  },
  bindButtonTap5: function () {
    this.setData({
      focus5: true
    })
  },
  bindKeyInput5: function (e) {
    this.setData({
      endzhou: e.detail.value
    })
  },
  bindButtonTap6:function(){
    this.setData({
      focus6:true
    })
  },
  bindKeyInput6:function(e){
    this.setData({
      xqj:e.detail.value
    })
  },

  //用于保存修改的数据
  save:function(){
   /**  wx.setStorageSync('kcxx', this.data.kcmc + "  "+ this.data.didian + "  " + this.data.startzhou + "~" + this.data.endzhou + "周");
   wx.setStorageSync('sksj', this.data.sksj);
   wx.setStorageSync('xqj', this.data.xqj)*/
   var that = this
   wx.getStorage({
     key: '_id',
     success(res){
       var id = res.data
      db.collection("user")
      .doc(id)
      .get()
      .then(res=>{
        var h = res.data.schedule
        var i =0
        for(i=0;i<42;i++){
          if(h[i].sksj == that.data.sksj && h[i].xqj == that.data.xqj){
           h[i].kcxx = that.data.kcmc + "  "+ that.data.didian + "  " + that.data.startzhou + "~" + that.data.endzhou + "周"
          }
          }
          db.collection("user")
          .doc(id)
          .update({
            data:{
              schedule:h
            }
          })
      } 
      )
     }
   })
   wx.showToast({
    title: '上传成功',
    icon: 'success',
    duration: 2000
  })
  this.setData({
    able:true
  })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
