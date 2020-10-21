/*
 * @Author: Leon  
 * @Date: 2020-07-03
 * @Desc: 收到消息时的处理
 */
var mongoose = require('mongoose')
const config = require("./config") // 配置文件
const { FileBox } = require("file-box")
require("./model/Member")
var Member = mongoose.model('Member')

module.exports = async function onMessage(bot, message) {
  const contact = message.from()
  const text = message.text().trim()
  const room = message.room()
  const isSelf = message.self()

  
  if (room) {
    if (text.indexOf("查车牌") === 0 && !isSelf) {
      let list = text.split(' ')
      if (list.length !== 2) {
        res = '\n\n查车牌请发送【查车牌 京ADXXXXX】中间一个空格' +
              '\n\n查询更多信息请使用小程序：nbc.9.sart.cc/d/193'
        room.say(res, contact)
        return
      }
      let plate = list[1].toUpperCase()
      
      if (plate === '京ADXXXXX') {
        res = "\n你想累死我吗?那么多没改车牌的![旺柴]"
        room.say(res, contact)
        return
      }
      
      if (plate.search(config.platePattern) >= 0) {
        // 如果输入的是车牌格式
        Member.find({name: {$regex :plate}}, function (err, members) {
          if (err) {console.log(err)}
          if (members) {
            if (members.length > 0) {
              // 找到了
              let res = ''
              for (let member of members) {
                res += '\n在' + member.groupName + '找到车友: ' + member.name 
              }
              res += '\n\n查询更多信息请使用小程序：nbc.9.sart.cc/d/193'
              room.say(res, contact)
            } else {
              // 没有找到
              room.say('\n在京蔚军车友群中未找到 ' + plate + ' 车牌的车友' + '\n\n可尝试使用小程序查询：nbc.9.sart.cc/d/193', contact)
            }
          }
        })
      } else {
        // 如果输入的不为车牌格式
        res = '\n\n查车牌请发送【查车牌 京ADXXXXX】中间一个空格' +
        '\n\n查询更多信息请使用小程序：nbc.9.sart.cc/d/193'
        room.say(res, contact)
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
