/*
 * @Author: Leon  
 * @Date: 2020-05-03
 * @Desc: 扫码登录
 */

const Qrterminal = require("qrcode-terminal")

module.exports = function onScan(qrcode, status) {
  Qrterminal.generate(qrcode, { small: true })
}
