const cors = require('cors');
const { Server } = require('socket.io'); // Add this

module.exports=function(http){
  // Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


  io.on("connection",function(socket){
    console.log("User connected "+socket.id)
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
