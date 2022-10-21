const MessageScheme = require("mongoose").Schema({
  message:{
    type:String,
    required:true
  },
  user_id:{
    type:String,
    required:true
  },
  room_id:{
    type:String,
    required:true
  },
  message_type:{
    type:String,
    required:true
  }
})

module.exports = require("mongoose").model("messages",MessageScheme)
