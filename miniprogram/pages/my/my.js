// pages/my/my.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"/image/wdl.png",
    nickname:"",
    logged:false,
    disable:true,
    bindxx:"身份未绑定",
    bind:false,
    name:"",
    sutId:""
  },
//绑定身份信息
  sfbing(res){
    wx.showLoading({
      title:"数据加载中",
      mask:true
    })
    const name = res.detail.value.name;
    const stuId  =res.detail.value.stuId;
    db.collection("user")
    .doc(app.userInfo._id)
    .update({
      data:{
        name:name,
        stuId:stuId
      }
    })
    .then(res=>{
      wx.hideLoading({
        complete: (res) => {},
      })
      this.setData({
        bindxx:"已绑定",
        bind:true
      })
    })
    
  },
  
  onShareAppMessage:function(){

  },
//微信登录
  onGotUserInfo: function (ev) {
    let  userInfo = ev.detail.userInfo;
    if(! this.data.logged && userInfo){
      db.collection("user").add({
        data:{
           userPhoto: userInfo.avatarUrl,
           name:"",
           nickname: userInfo.nickName,
           signature:"",
           links:0,
           stuId:"",
           calss:"",
           sex:"",
           time: new Date(),
           city:"",
           schedule:[
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
        }
      }).then(res=>{
        wx.setStorageSync('_id',res._id)
        db.collection("user").doc(res._id)
        .get()
        .then(res=>{
          app.userInfo =Object.assign(app.userInfo,res.data);
          //console.log(app.userInfo)
            this.setData({
            nickname: ev.detail.userInfo.nickName,
            userPhoto: ev.detail.userInfo.avatarUrl,
            logged:true
          })
        })
      })
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
    //自动登录
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then(res=>{
      db.collection("user").where({
        _openid:res.result._openid
      }).get()
      .then(res=>{
           app.userInfo = Object.assign(app.userInfo , res.data[0])
           if(res.data.length){
        this.setData({
          userPhoto:app.userInfo.userPhoto,
          nickname:app.userInfo.name,
          logged:true,
          bind:true,
          bindxx:"已绑定"
        })
           }
           else{
             this.setData({
               disable : false
             })

           }
      })
    })
    

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
    let that  = this
    var ws = that.data.wlist
    wx.getStorage({
      key: '_id',
      success(res){
        db.collection('user')
        .doc(res.data)
        .update({
          data:{
            schedule:ws
          }
        })
      }
    })
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