const mongoose = require("mongoose")
const db = require("../../config/database.config")

module.exports = function(){

  mongoose.connect(`mongodb://${db.host}:${db.port}/${db.dbname}`)
  mongoose.connection.once("open",function(){
    console.log(db.message)
  }).on("error",function(err){
    
    console.log("err")
  })

}
