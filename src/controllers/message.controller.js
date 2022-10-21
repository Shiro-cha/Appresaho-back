class Message{

  newMessage(io,socket,msg){
    
      const Message =require("../models/schemas/Messages")
      const newmsg = new Message({
        user_id:msg.user_id,
        room_id: msg.room_id,
        message:msg.message,
        message_type:"text"
      })
      newmsg.save(function(err){
        if(err){
            console.log(err)
        }else{
            console.log(msg)
        }
        io.emit("msg_receive",{message:msg.message})
      })

  }

  getMessages(io,socket,msg){

      const Message =require("../models/schemas/Messages")
      Message.find({room_id:msg.room_id}).exec(function(err,messages){
        if(err){
          console.log("and me")
          socket.emit("all_msg",{message:"Une erreur s'est produit"})
        }else{
          socket.emit("all_msg",{messages:messages})
        }
      })

  }

}

module.exports = new Message()
