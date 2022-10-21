
class SignUp{


    saveuser(req,res){
      //verify manually if data from user are correct
      console.log(req.body)
      if(req.body.username==="" || req.body.name==="" || req.body.firstname==="" || req.body.password.length <8 || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)){
        res.status(401)
        res.json({message:"Information are incorrect"})
      }else{
        const User = require("../models/schemas/User")
        User.find({username:req.body.username}).exec(function(err,user){
          if (err) throw err
          if(user.length!==0 && user.length!==-1 ){
            
            res.status(401)
            res.json({message:"Le nom d'utilisateur existe déja"})
          }else{
            const newUser = new User({
              username:req.body.username,
              name: req.body.name,
              firstname:req.body.firstname,
              email:req.body.email,
              password:req.body.password
            })
            newUser.save(function(err){
              if(err) throw err
              res.status(200)
              res.json({message:"Création du compte réussi"})
            })
          }
        })


      }
    }

      verifyUserName(req,res){
        if(!req.body.username){
          res.status(404)
          res.json({message:"Aucun username à rechercer"})
        }else{
          const User = require("../models/schemas/User")
          User.find({username:req.body.username}).exec(function(err,user){
            if (err) throw err
            if(user.length!==0 && user.length!==-1 ){
              res.status(401)
              res.json({message:"Le nom d'utilisateur existe déja"})
            }else{
              res.status(200)
              res.json({message:"Le nom d'utilisateur est disponible "})
            }
          })
        }


    }


}

module.exports = new SignUp()
