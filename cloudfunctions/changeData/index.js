// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db= wx.cloud.database
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var _openid = event.openid
  var name = event.name
  var stuId  =event.stuId
  try{
     return await db.collection("user")
     .where({
       _openid:_openid
     })
     .update({
       data:{
         name:name,
         stuId:stuId
       }
     })
  }catch(e){
    console.log(e)
  }

  
}