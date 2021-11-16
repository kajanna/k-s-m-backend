const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const sendMessage = (req, res, next) => {
 const errors =  validationResult(req);

 if (!errors.isEmpty()) {
     throw new HttpError('Invalid inputs, check your form', 422)
 }
 const { name, message, email } = req.body;

 
 let mailDetails = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `message from ${email}- via contact form`,
    text: ` ${name} send a message : ${message}`
 };

 let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
 });

 mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        res.json(err);
    } else {
        res.status(200).json('Your message was sent');
    }
 });     
}

module.exports = sendMessage;