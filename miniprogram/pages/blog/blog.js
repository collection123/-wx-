const db = wx.cloud.database();
const app = getApp();

Page({

  data: {
    hour : 0,
    content :['平凡的瞬间也值得被放大...',"值得纪念的小事...","独处，但并不孤独...","瞬间的思绪也值得被留下..."],
    tempFilePaths:[],
    docid:"",
    postpicture:false,
    btndis:false,

    //以下为上传图片至云存储
    images_fileID: [],

  },
  blogsub(res){
    var title1 =  res.detail.value.title;
    var author1 = res.detail.value.author;
    var content1 = res.detail.value.content;
    var count = 0;
    var h = this.data.tempFilePaths.length;
    if (h != 0) {
      this.setData({
        images_fileID: [],
        postpicture:true
      })
    }
    if(this.data.postpicture != false)
    {
      var time = new Date()
      var year = time.getFullYear().toString();
      var month= time.getMonth().toString();
      var day = time.getDay().toString();
      var hour = time.getHours().toString();
      var miutin = time.getMinutes().toString();
      var st = year+'年'+month+'月'+day+"日"+hour+'时'+miutin+'分'
      db.collection("blog")
    .add({
      data:{
      time:st,
      picture:h,
      tip:0,
      title:title1,
      author:author1,
      content:content1,
      }
    })
    .then(res=>{
      this.setData({
        docid:res._id,
        
      })
      for (var i = 0; i < h; i++) {
        //上传文件
        var num= i.toString();
        var imageUrl = this.data.tempFilePaths[i].split("/");
        //var name =""+ imageUrl[imageUrl.length - 1];
        var name = "blogPicture/"+res._id+"/"+num+".jpeg"
        var images_fileID = this.data.images_fileID;
        wx.cloud.uploadFile({
          cloudPath: name,    //自定义云存储路径
          filePath: this.data.tempFilePaths[i],
          success: res => {
            this.setData({
              btndis:true
            })
            wx.showToast({
              title: '正在发送...',
              icon: 'loading',
              mask: true,
              duration: 1000
            })
            images_fileID.push(res.fileID);
            this.setData({
              images_fileID: images_fileID        //更新data中的 fileID
            })
           
            fail: res => {
              count++;
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          }
        });
      }
    })
    }
    
  
    //---------
    
    else{
      var time = new Date()
      var year = time.getFullYear().toString();
      var month= time.getMonth().toString();
      var day = time.getDay().toString();
      var hour = time.getHours().toString();
      var miutin = time.getMinutes().toString();
      var st = year+'年'+month+'月'+day+"日"+hour+'时'+miutin+'分'
      db.collection("blog")
      .add({
        data:{
          title:title1,
          author:author1,
          content:content1,
          tip:0,
          picture:0,
          time:st
        }
      })
      .then(res=>{
        wx.showToast({
          title: '发送成功...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        this.setData({
          docid:res._id,
          btndis:true
        })
      })
    }
      
    
  },

  //选择图片

  ChooseImg: function () {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认最多9张图片，可自行更改
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePath
        })
      }
    })
  },

  //预览图片
  PreviewImg: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    //console.log(that.data.tempFilePaths[index]);
    //console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
    })
  },
  //长按删除图片
  DeleteImg: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          //console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          //console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  onReady: function () {
    const time = new Date()
    const hour = time.getHours()%3
    this.setData({
      hour:hour
    })
  }


})




