// const nodemailer = require("nodemailer");
// const config = require("../config");

// module.exports = async (email, message, title) => {
//   //sendEmail
//   try {
//     // const smtpEndpoint = "smtp.sendgrid.net";

//     // const port = 465;

//     // const senderAddress = `${config.NAME} <${config.EMAIL_ADDRESS}>`;

//     // var toAddress = email;
 
//     // const smtpUsername = config.SENDGRID_USERNAME;

//     // const smtpPassword = config.SENDGRID_PASSWORD;

//     var subject = title;
//     console.log('sending mail');
//     var body_html = `<html>
//     <p>${message}</p>
//     </html>`;

//     // Create the SMTP transport.
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         users: 'djrakes041@gmail.com',
//         pass: '12345$qwertY'
//       }
//     });

//     // Specify the fields in the email.
//     let mailOptions = {
//       from: 'djrakes041@gmail.com',
//       to: 'harshmoradiya576@gmail.com',
//       subject: subject,
//       html: body_html
//     };

//     await transporter.sendMail(mailOptions);
//   // transporter.sendMail(mailOptions, function(error, info){
//   //   if (error) {
//   //     console.log(error);
//   //   } else {
//   //     console.log('Email sent: ' + info.response);
//   //   }
//   // });

//     return { error: false };
//   } catch (error) {
//     console.error("send-email-error", error);
//     return {
//       error: true,
//       message: "Couldn't send email",
//     };
//   }
// };
