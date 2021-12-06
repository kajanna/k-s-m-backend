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
    from: process.env.EMAIL_SERVICE,
    to: process.env.EMAIL_SERVICE,
    subject: `message from ${email}- via contact form`,
    text: ` ${name} send a message : ${message}`
 };
 let mailDetailsCustomer = {
    from: process.env.EMAIL_SERVICE,
    to: email,
    subject: `Kaja Szokalska-Masłyk Frontend Developer - Your message/Twoja wiadomość`,
    text: `Your message : ${message}`
 }
 let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVICE,
        pass: process.env.EMAIL_PASSWORD
    }
 });
 let error;

 mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        error = err
    } 
 });

 mailTransporter.sendMail(mailDetailsCustomer, function(err, data) {
    if (err) {
        error = err
    } 
 });
 if (error) {
    const err = new HttpError("Something went wrong. Your Message is not delivered"); 
    res.status(503).json(err);
 }  else {
    res.status(200).json({message : "Your message has been send/Twoja wiadomość została wysłana"});
 }  
}

module.exports = sendMessage;