# nio-bot
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

基于 wechaty-puppet-padplus 的微信机器人助手


#### 目前实现功能

- 加入群聊自动欢迎
  - 当新的成员加入群聊后自动 `@[新的小伙伴]` 并文字欢迎
- 每日定时校验群成员名称
  - 每条早上十点定时扫描所有群成员名称, 并校验是否符合格式
