require("dotenv").config()

class Auth{

  constructor(){
    this.jwt = require("jsonwebtoken")
  }

   signUser(user,resolve,reject){
     const randomHex = require("crypto").randomBytes(64).toString('hex')
     console.log(randomHex);
    const token = this.jwt.sign({user:user},randomHex)
    //verify if already in session table
    const Token_JWT =require("../models/schemas/Token_JWT")
    console.log(user._id)
    Token_JWT.findOne({id_user:user._id}).exec(function(err,tkn){
      if(err) throw err

      if(tkn){
        reject({message:"Vous êtes déja connecté"})
      }else{
        if(token){
          const newSession = new Token_JWT({
            id_user:user._id,
            token:token
          })
        newSession.save(function(error){
            if(error){
              reject(error)
            }else{

              resolve({token:token,user:user})

            }

          })

        }
      }
    })



  }
  verifyUserAuth(req,res,next){

    const token = req.headers["authorization"].split(" ")[1]
    if(token){

      const Token_JWT =require("../models/schemas/Token_JWT")
      Token_JWT.findOne({token:token}).exec(function(err,tkn){
        if(err) throw err

        if(tkn){
          const User =require("../models/schemas/User")
          User.findById(tkn.id_user).exec(function(err,user){
            if(err) throw err
            req.user = user
            next()
          })
        }else{

          res.status(403)
          res.json({message:"Vous n'êtes pas connecté"})
        }
      })
    }else{
      res.status(403)
      res.json({message:"Vous n'êtes pas connecté"})
    }

  }
  deleteSession(token,resolve,reject){

    if(token){
    const Token_JWT =require("../models/schemas/Token_JWT")
    console.log(token)
    Token_JWT.findOneAndRemove({token:token}).then(function(){

        resolve({message:"Vous n'êtes plus connecté"})

    }).catch(function(err){
        reject({message:"Vous n'êtes pas connecté"})
    })
  }

}


}

module.exports = new Auth()
