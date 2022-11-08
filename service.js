var nodemailer = require('nodemailer')
 var transporter = nodemailer.createTransport({
    service: "gmail",
     auth: {
         user: "testtoolon07@gmail.com",
         pass: "lhhoejhyxozzogln"

     }
 });

//send out email throguh nodemailer
 var mailOptions = {
     from: "testtoolon07@gmail.com",
     to: "arun.lal@graffersid.com",
     subject: "Hye this is test mail",
     text: "hye this is body part"  
 }

 module.exports ={
    transporter,
    mailOptions
 }
