/*
 * @Author: Leon  
 * @Date: 2020-05-03
 * @Desc: main
 */

const { Wechaty } = require("wechaty") // Wechaty核心包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包
// var express = require('express')
var mongoose = require('mongoose')
var schedule = require('node-schedule')

const config = require("./config") // 配置文件
const onScan = require("./onScan") // 机器人需要扫描二维码时监听回调
const onRoomJoin = require("./onRoomJoin") // 加入房间监听回调
const onLogin = require("./onLogin") // 消息监听回调

require("./model/Member")
require("./model/Room")
require("./model/Whitelist")

// connect db
mongoose.connect(config.DB, {server: { 
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000 
  }}, function (err) { 
    if (err) console.log(err); 
});

var Whitelist = mongoose.model('Whitelist')
var Member = mongoose.model('Member')
var Room = mongoose.model('Room')

// 初始化
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: config.token
  }),
  name: config.name
})

// 注册事件
bot.on("scan", onScan) // 机器人需要扫描二维码时监听
bot.on("message", (msg) => {
  //console.log(msg.text())
})
bot.on('login', (user) => onLogin(bot)) // 登录后, 对定时任务进行注册 
bot.on("room-join", onRoomJoin) // 加入房间监听
bot.start()


// 每天23:59拉取所有人昵称
schedule.scheduleJob('* * * * *', async () => {
  let rooms = []
  let promises = []
  // 清除所有成员
  promises.push(Member.remove({}))

  // 查看群是否在管理
  for (let room of await bot.Room.findAll()) {
    let p = Room.findOne({roomId: room.id, collectName: true}, function(err, res) {
      if (err) {console.log(err)}
      if (res) {
        // 如果开启了获取群昵称设置
        rooms.push(room)
      }
    })
    promises.push(p)
  }

  // 每个群依次获取所有成员
  Promise.all(promises).then(async ()=>{
    for (let room of rooms) {
      room.memberAll().then(members=>{
        for (let member of members) {
          room.alias(member).then(async (nickname) => {
            if (nickname) {
              let member = new Member()
              member.name = nickname
              member.groupName = await room.topic()
              Member.create(member)
            }
          }).catch((err) => {console.log(err)})
        }
      })
      console.log('Collected member nickname for: ' + await room.topic())
    }
  })

})

// 每天早上10点进行提醒 59 9
schedule.scheduleJob('* * * * *', async function() {
  let rooms = []
  let promises = []

  // 查看群是否在管理
  for (let room of await bot.Room.findAll()) {
    let p = Room.findOne({roomId: room.id, checkNickname: true}, function(err, res) {
      if (err) {console.log(err)}
      if (res) {
        // 如果开启了校验群昵称
        rooms.push(room)
      }
    })
    promises.push(p)
  }

  // 每个群依次获取所有成员
  Promise.all(promises).then(async ()=>{
    for (let room of rooms) {
      // 记录每个群里不合法昵称
      let illegalMembers = []
      let illegalNames = []

      await room.sync()
      console.log(await room.topic())
      room.memberAll().then(members=>{
        for (let member of members) {
          room.alias(member).then((nickname) => {
            if (!nickname || (nickname.search(config.pattern) < 0)) {
              Whitelist.find({'name': nickname}).then((res, err) => {
                if (err) {console.log(err)}
                if (!res) {
                  illegalMembers.push(member)
                  illegalNames.push(nickname ? nickname : member.name())
                }
              })
            }
          }).catch((err) => {console.log(err)})
        }
      })
      setTimeout(function() {
        // room.say(generateAdvice(), ...illegalMembers)
        console.log(illegalNames)
      }, 60 * 1000)
    }
    
  })
})

function generateAdvice () {
  // 加入房间回复
  return  '\n您的昵称不符合规范, 请参考:\n\n' +
          '蔚来APP昵称-ES6-京ADXXXXX\n\n' +
          '(未上牌牌请先使用\"京ADXXXXX\")\n'
}





