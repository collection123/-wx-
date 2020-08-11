// pages/index/index.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
Page({
    data: {
        text:'',
        image: ''
    },
    onLoad: function (options) {
        var time = new Date()
        wx.cloud.callFunction({
            name:'login',
            data:{}
        }).then(res=>{
            qrcode = new QRCode('canvas', {
                // usingIn: this,
                text: time+res.result.openid,
                image:'/image/bg.jpg',
                width: 150,
                height: 150,
                colorDark: "#1CA4FC",
                colorLight: "white",
                correctLevel: QRCode.CorrectLevel.H,
            });
        })
        
    },
    confirmHandler: function (e) {
        var value = e.detail.value
        qrcode.makeCode(value)
    },
    inputHandler: function (e) {
        var value = e.detail.value
        this.setData({
            text: value
        })
    },
    tapHandler: function () {
        // 传入字符串生成qrcode
        qrcode.makeCode(this.data.text)
    },
    // 长按保存
    save: function () {
        wx.showActionSheet({
            itemList: ['保存图片'],
            success: function (res) {
                
                if (res.tapIndex == 0) {
                    qrcode.exportImage(function (path) {
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                        })
                    })
                }
            }
        })
    }
})