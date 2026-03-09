const express = require("express")
const { protect } = require("../middlewares/authMiddleware")

const {
getMessages,
checkChatAccess,
getConversations
} = require("../controllers/chatController")

const router = express.Router()

router.get("/access/:applicationId", protect, checkChatAccess)

router.get("/messages/:roomId", protect, getMessages)

router.get("/conversations", protect, getConversations)

module.exports = router