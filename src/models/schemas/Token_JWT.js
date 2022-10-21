const JWTScheme = require("mongoose").Schema({
  id_user:{
    type:String,
    required:true
  },
  token:{
    type:String,
    required:true
  }
})

module.exports = require("mongoose").model("token_jwt",JWTScheme)
