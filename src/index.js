/*
 * @Author: Leon  
 * @Date: 2020-05-03
 * @Desc: main
 */

const { Wechaty } = require("wechaty") // Wechaty核心包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包
const config = require("./config") // 配置文件

const onScan = require("./onScan") // 机器人需要扫描二维码时监听回调
const onRoomJoin = require("./onRoomJoin") // 加入房间监听回调
const onLogin = require("./onLogin") // 消息监听回调

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








