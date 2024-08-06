const express = require('express')
const messageController = require('../controller/messageController')

const router = express.Router()

router.post('/message',messageController)

module.exports = router