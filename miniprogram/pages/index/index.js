const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    button:1,
    number:0,
    picture:[],
    feilid:[],
    blog:{},
    page:0,
    dz:0
 
  },
  
  //点赞
  zan(e){
    var docid = e.currentTarget.dataset.index;
    var tips  =0
    db.collection("blog")
    .doc(docid)
    .get()
    .then(res=>{
      tips = res.data.tip
      tips = tips+1
      db.collection("blog")
      .doc(docid)
      .update({
        data:{
          tip: tips
        }
      })
      this.setData({
        dz:1
      })
    })
    
  },
  //预览功能
  PreviewImg: function (e) {
    let index = e.target.dataset.index;
    let lb  = this.data.feilid[index]
    //console.log(that.data.tempFilePaths[index]);
    //console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: lb.picid[0],
      urls: lb.picid,
    })
  },
  btn1(){
    this.setData({
      button:1
    })
    this.onPullDownRefresh()
   
  },
  btn2(){
    this.setData({
      button:2
    })
    this.onPullDownRefresh()

  },
  //获取博客信息
  getbk(page,type){
    var type = this.data.button;
    if(type == 1){
      var mode = 'time'
    }
    else{
      var mode = 'tip'
    }
    db.collection("blog")
    .orderBy(mode, 'desc')
    .skip(page)
    .limit(5)
    .get()
    .then(res=>{
      var long = res.data.length
      
      this.setData({
        blog:res.data,
        number:long
      })
  
    var i =0;
    var j =0;;
    var feil1 = []
    for(i=0;i<res.data.length;i++){
      var lj='cloud://tcu-h0jcu.7463-tcu-h0jcu-1302480324/blogPicture/'+res.data[i]._id+'/'
      var feil =[]
      if(res.data[i].picture > 0){
       for(j=0;j<res.data[i].picture;j++){
        var fei = lj+j.toString()+'.jpeg'
        feil.push(fei)
      }
      feil1.push({picid:feil})
      }
      else{
        feil1.push({picid:[]})
      }
    }
    //console.log(feil1)
    this.setData({
      feilid:feil1
    })
    })

    

  },

  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.getbk(0,1)

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
    var type = this.data.button;
      this.getbk(0,type)
      this.setData({
        page:0
      })
      
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(){
    var type = this.data.button;
    wx.showLoading({
      title: '加载中'
    })
   this.getbk(this.data.page+1,type)
   this.setData({
     page:(this.data.page+1)
   })
   wx.hideLoading({
     complete: (res) => {},
   })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})