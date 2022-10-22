require("dotenv").config()
const mongoose = require("mongoose")
const db = require("../../config/database.config")

module.exports = function(){

  mongoose.connect(process.env.DATABASE)
  mongoose.connection.once("open",function(){
    console.log(db.message)
  }).on("error",function(err){
    
    console.log("err")
  })

}
