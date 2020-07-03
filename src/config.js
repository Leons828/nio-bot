/*
 * @Author: Leon  
 * @Date: 2020-05-03
 * @Desc: 配置项
 */

module.exports = {
  // puppet_padplus Token
  token: "puppet_padplus_2638ffd6c3afc0b8",
  // Wechaty Bot cache
  name: "NIO",
  // 名称校验格式
  pattern: '.+-(ES6|ES8)-[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川黔云藏陕甘青宁新][A-Z]D[A-Z0-9]{5}',
  // 车牌校验格式
  platePattern: '[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川黔云藏陕甘青宁新][A-Z]D[A-Z0-9]{5}',
  // DB Connection
  DB:  'mongodb://admin:B4bUcvLUYw@49.232.109.92:27017/nio?authSource=admin',
}
