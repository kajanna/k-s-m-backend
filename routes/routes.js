const express = require('express');
const sendMessage = require('../controllers/send-mail');
const router = express.Router();

router.post('/', sendMessage);

module.exports = router;