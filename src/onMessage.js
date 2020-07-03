/*
 * @Author: Leon  
 * @Date: 2020-07-03
 * @Desc: 收到消息时的处理
 */
var mongoose = require('mongoose')
require("./model/Member")
var Member = mongoose.model('Member')

module.exports = async function onMessage(bot, message) {
  const contact = message.from()
  const text = message.text().trim()
  const room = message.room()
  const isSelf = message.self()
  const atSelf = await message.mentionSelf()  

  
  if (room) {
    if (room.id !== '24788054959@chatroom') {
      return
    }

    // 别人@到我
    if (atSelf && !isSelf) {
      if (text.indexOf('车友') > 0) {
        let list = text.split(' ')
        let plate = list[list.length -1].toUpperCase()
        if (plate.length !== 4) {
          message.say("请您使用后四位进行查询")
          return
        }
        // 搜索
        Member.find({name: {$regex :plate}}, function (err, members) {
          if (err) {console.log(err)}
          if (members) {
            if (members.length > 0) {
              let res = '您要找的车友可能是:\n'
              for (let member of members) {
                res += member.name + '\n'
                res += member.groupName + '\n'
              }
              message.say(res)
            } else {
              message.say('没有找到呢')
            }
          }
        })
      } else {
        let res = '您说的我听不懂呢, 请参考:\n' +
        '查询车友: 车友 + 空格 + 车牌号后四位 例:\n' + 
        '车友 A123'
        message.say(res)
      }
    }
  } else {
    // 个人发
    if (isSelf) {
      // 如果是自己发送给自己
      if (text === '群列表') {
        let res = ''
        for (let room of await bot.Room.findAll()) {
          res += await room.topic() + "\n" + room.id + "\n\n"
        }
        message.say(res)
      }
    }
    // 别人发的无视掉
  }
}
