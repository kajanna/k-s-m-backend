const express = require('express');
const { check } = require('express-validator');
const sendMessage = require('../controllers/send-mail');

const router = express.Router();

router.use(express.json());

router.post(
 '/message', 
 [check('name').notEmpty().isLength({max: 60}),
 check('email').notEmpty().isEmail().isLength({max: 60}),
 check('message').notEmpty().isLength({ min: 20, max: 500 })
 ],
 sendMessage);

module.exports = router;