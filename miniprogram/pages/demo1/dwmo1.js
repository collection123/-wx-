// pages/demo1/dwmo1.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  btnNum(){
    db.collection("demolist").count()
    .then(res=>{
      console.log(res)
    })
  },

  //获取输入的内容
  Input(res){

    var vlu=res.detail.value;
    console.log(vlu)


  },
  //更新数据
  updateData(){
    //把update换成set更新数据时，会只留下上传的数据
    db.collection("demolist").doc("9abbc6f45ef613ef0004701c2925e373").update({
      data:{
        author:"陈宇昌"
      }
    }).then(res=>{
      console.log(res)
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