/*
 * @Author: Leon  
 * @Date: 2020-05-03
 * @Desc: 对新成员进入房间进行回调
 */

// 配置文件
var mongoose = require('mongoose')
require("./model/Room")
var Room = mongoose.model('Room')

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
module.exports = async function onRoomJoin(room, inviteeList, inviter) {
  // 判断配置项群组id数组中是否存在该群聊id
  let p = Room.findOne({roomId: room.id, welcomeWord: true}, async function(err, res) {
    if (err) {console.log(err)}
    if (res) {
      await room.sync()
      inviteeList.map(c => {
        // 发送消息并@
        room.say(generateWelcome(c.name()), c)
      })
    }
  })
}

function generateWelcome (username) {
    // 加入房间回复
    return  '欢迎加入京蔚軍大家庭!\n\n' +
            '① 请复制并修改群昵称:\n\n' +
            '蔚来昵称-ES6-京ADXXXXX\n\n' +
            '(无牌请先使用\"京ADXXXXX\")\n\n' +
	          '② 注册京蔚军会员小程序\n' +
	          'nbc.9.sart.cc/d/193\n\n' +
            '③ 和大家打个招呼\n' +
            '④ 正式成为京蔚軍的一员'
}
