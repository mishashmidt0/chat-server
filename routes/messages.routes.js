const Router = require('express');
const MessagesController = require("../controller/messages.controller.js");

const messagesController = new MessagesController()
const router = new Router()


router.post('/messages/newMessage', messagesController.createMessage)

router.get('/messages/all', messagesController.getMessages)

module.exports = router