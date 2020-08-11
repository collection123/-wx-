// pages/more/more.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:19,
    bt:1

  },
  bt1(){
    this.setData({
      bt:1
    })
  },
  bt2(){
    this.setData({
     bt:2
    })
  },
  bt3(){
    this.setData({
     bt:3
    })
  },
  bt4(){
    this.setData({
     bt:4
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
    //更新周次显示
    const time = new Date()
    var timeday = time.getDay()
    if(timeday == 1){
      this.setData({
        week:(this.data.week+1)
      })
    }
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