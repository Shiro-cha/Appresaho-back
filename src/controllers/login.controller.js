require("dotenv").config()
const jwt  = require("jsonwebtoken")

class Login{

  connect(req,res){

    const username = req.body.username
    const password = req.body.password
    if(username && password){
      const User = require("../models/schemas/User")
      User.findOne({username:username,password:password}).exec(function(err,user){
        if(err)  throw error
        if(!user){
          res.status(404)
          res.json({message:"Utilisateur introuvable"})
        }else{

          res.status(200)
          const tokenGetter =new Promise(function(resolve, reject) {
            require("../middlewares/Auth").signUser(user,resolve,reject)
          });
          tokenGetter.then(function(value){
            console.log(user)
            res.json(value)
          }).catch(function(err){
              res.status(301)
              res.json(err)
          })

        }
      })
    }else{
      res.status(401)
      res.json({message:"Information de connexion invalid"})
    }


  }
  disconnect(req,res){
    const token = req.headers["authorization"].split(" ")[1]
    const dec =new Promise(function(resolve, reject) {
      require("../middlewares/Auth").deleteSession(token,resolve,reject)
    })
    dec.then(function(message){
      res.status(200)
      res.json(message)
    }).catch(function(errMessage){
      res.status(404)
      res.json(errMessage)
    })

  }

}
module.exports = new Login()
