// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db =cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var num=event.num;
  var page=event.page;
  return await db.collection("blog")
  .orderBy('time' , 'desc')
  .skip()
  .limit(num)
  .get()
}