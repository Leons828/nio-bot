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
  let roomList = []
  // 选择群, 进行群成员名称筛选
  for (let room of await bot.Room.findAll()) {
    if (config.roomList.indexOf(room.id) >= 0) {
      roomList.push(room)
    }
  }

  // 每天早上10点进行提醒
  schedule.scheduleJob('59 9 * * *', function() {
    let illegalMembers = []
    let illegalNames = []
    for (let room of roomList) {
      room.memberAll().then(members=>{
        for (let member of members) {
          room.alias(member).then((nickname) => {
            if (!nickname || (nickname.search(config.pattern) < 0 && config.whitelist.indexOf(nickname) < 0)) {  
	      illegalMembers.push(member)
	      illegalNames.push(nickname ? nickname : member.name())
             }
          }).catch((err) => {console.log(err)})
        }
      })
      setTimeout(function() {
        room.say(generateAdvice(), ...illegalMembers)
        console.log(illegalNames)
      }, 60 * 1000)
    }
  })
}

function generateAdvice () {
  // 加入房间回复
  return  '\n您的昵称不符合规范, 请参考:\n\n' +
          '蔚来APP昵称-ES6-京ADXXXXX\n\n' +
          '(未上牌牌请先使用\"京ADXXXXX\")\n'
}
