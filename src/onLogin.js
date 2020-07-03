/*
 * @Author: Leon  
 * @Date: 2020-05-03
 * @Desc: 登录时对定时任务进行注册
 */

// 配置文件
const config = require("./config")
var schedule = require('node-schedule')

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
module.exports = async function onLogin(bot) {
  // 选择群, 进行群成员名称筛选
  // for (let room of await bot.Room.findAll()) {
  //   console.log(await room.topic() + "   " + room.id)
  // }

  
}
