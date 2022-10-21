const UserScheme = require("mongoose").Schema({
  username:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  firstname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

module.exports = require("mongoose").model("user",UserScheme)
