var mongoose = require('mongoose')

var WhitelistSchema = new mongoose.Schema({
  name: String
})

mongoose.model('Whitelist', WhitelistSchema)
