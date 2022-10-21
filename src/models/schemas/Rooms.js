const RoomSchema = require("mongoose").Schema({
  roomname:{
    type:String,
    required:true
  },
  creator_id:{
    type:String,
    required:true
  }
})

module.exports = require("mongoose").model("room",RoomSchema)
