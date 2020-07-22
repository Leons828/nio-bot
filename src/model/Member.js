var mongoose = require('mongoose')

var MemberSchema = new mongoose.Schema({
  name: String,
  groupName: String,
})

mongoose.model('Member', MemberSchema)
