const app = new App();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    question:[]
  },
  
  
  /**
 * 新增评论
 */
    tjpl(res){
      var ans = []
      var newpl = res.detail.value.pl
      var id =res.detail.target.dataset.id
      db.collection('question')
      .doc(id)
      .get()
      .then(res=>{
        if(res.data.answer !=""){
          ans = res.data.answer
        }
      ans.push(newpl)
      db.collection('question')
      .doc(id)
      .update({
        data:{
          answer:ans
        }
      })
      wx.showToast({
        title:'发送成功',
        icon:'success',
        duration:1500
      })
      this.onShow()
      })
    },
   tjbd(res){
    if(res.detail.value.nr == ""){
      wx.showToast({
        title: '内容不能为空!',
        duration:1500,
        icon:"none"
      })
    }
    else{
      db.collection("question")
      .add({
        data:{
          tiwen:res.detail.value.nr,
          answer:""
        }
      })
      this.onShow()
    }


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
    db.collection("question")
    .skip(this.data.page)
    .limit(5)
    .get()
    .then(res=>{
      this.setData({
        question:res.data
      })
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
    this.onShow()
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