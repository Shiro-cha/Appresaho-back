class Room{
  createRoom(req,res){
    //verify if Information are complete

    if(!req.body.roomname.trim()){
      res.status(401)
      res.json({message:"message are not complete"})
    }else{
      const Room =require("../models/schemas/Rooms")
      Room.findOne({roomname:req.body.roomname,creator_id:req.user._id}).exec(function(err,r){
        if(r){
          res.status(401)
          res.json({message:"Ce groupe existe déja"})
        }else{
          //-----
          const newRoom = new Room({
            roomname:req.body.roomname,
            creator_id:req.user._id
          })
          newRoom.save(function(err){
            if(err) throw err
            res.status(200)
            const User_In_Room =require("../models/schemas/User_In_Room")
            Room.findOne({roomname:req.body.roomname,creator_id:req.user._id}).exec(function(er,room){
              if(!er){
                User_In_Room.findOne({user_id:req.user._id,room_id:room._id}).exec(function(e,useroom){
                  if(useroom){
                    res.status(404)
                    res.json({message:"Une erreur s'est produit"})
                  }else{
                    const newUseRoom = new User_In_Room({
                      user_id:req.user._id,
                      room_id:room._id
                    })
                    newUseRoom.save(function(errr){
                      if(errr) throw errr
                      res.json({message:"creation du room réussi"})
                    })
                  }
                })


              }
            })

          })

          //------
        }
      })

    }
  }
  deleteRoom(req,res){
    //verify if Information are complete
    if(req.user && req.body.room_id){
      const User_In_Room =require("../models/schemas/User_In_Room")
      User_In_Room.findOneAndRemove({room_id:req.body.room_id,user_id:req.user._id}).then(function(){

        const Room =require("../models/schemas/Rooms")
        Room.findOneAndRemove({_id:req.body.room_id}).then(function(){
          res.status(200)
          res.json({message:"Suppression du groupe réussi"})
        }).catch(function(){
          res.status(401)
          res.json({message:"Une erreur s'est produit"})
        })
      }).catch(function(err){
        res.status(401)
        res.json({message:"Une erreur s'est produit"})
      })

    }

  }
  getRooms(io,socket,msg){
    const User_In_Room =require("../models/schemas/User_In_Room")
    if(msg.user_id){
      User_In_Room.find({user_id:msg.user_id}).exec(function(err,items){
        if(items){
            const Room =require("../models/schemas/Rooms")
            let rooms_with_name = []
            items.forEach((item) => {
              Room.findById(item.room_id).exec(function(err,room){
                if(room){
                  rooms_with_name.push({room_id:room._id,room_name:room.roomname})
                }
              })
            });

          socket.emit("all_rooms",rooms_with_name)
        }
      })
    }
  }


}
module.exports = new Room()
