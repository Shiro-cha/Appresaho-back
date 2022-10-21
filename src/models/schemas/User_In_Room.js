const UserRoomSchema = require("mongoose").Schema({
  user_id:{
    type:String,
    required:true
  },
  room_id:{
    type:String,
    required:true
  }
})

module.exports = require("mongoose").model("user_in_room",UserRoomSchema)
