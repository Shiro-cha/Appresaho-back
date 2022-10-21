module.exports=function(http){
  const io = require("socket.io")(http)

  io.on("connection",function(socket){

    socket.on("msg_send",function(msg){
      require("./message.controller").newMessage(io,socket,msg)
    })
    socket.on("get_messages",function(msg){

      require("./message.controller").getMessages(io,socket,msg)
    })
    socket.on("get_rooms",function(msg){

      require("./room.controller").getRooms(io,socket,msg)
    })
  })


}
