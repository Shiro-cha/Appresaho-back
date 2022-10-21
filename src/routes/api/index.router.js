const express = require("express")
const router = express.Router()

router.post("/login",require("../../controllers/login.controller").connect)
router.post("/logout",require("../../controllers/login.controller").disconnect)
router.post("/signup",require("../../controllers/signup.controller").saveuser)
router.post("/verify-user",require("../../controllers/signup.controller").verifyUserName)
router.post("/new-room",require("../../middlewares/Auth").verifyUserAuth,require("../../controllers/room.controller").createRoom)
router.post("/delete-room",require("../../middlewares/Auth").verifyUserAuth,require("../../controllers/room.controller").deleteRoom)
router.post("/message",require("../../middlewares/Auth").verifyUserAuth,require("../../controllers/message.controller").getMessages)


module.exports = router
