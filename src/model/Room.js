var mongoose = require('mongoose')

var RoomSchema = new mongoose.Schema({
  name: String,   // 群聊名称
  roomId: String, // Puppet中房间的唯一ID
  index: Number,  // 群号, 类似于1群, 2群, 3群
  welcomeWord: Boolean,   // 是否发送新成员欢迎词
  checkNickname: Boolean, // 是否校验本群乘成员昵称
  collectName: Boolean    // 是否获取本群成员昵称列表以供搜索
})

mongoose.model('Room', RoomSchema)
