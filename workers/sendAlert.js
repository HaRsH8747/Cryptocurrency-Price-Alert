const CronJob = require("cron").CronJob;
var Queue = require("bull");

const alerts = require("../alerts");

const config = require("../config");
const currentPrice = require("../helpers/currentPrice");
const sendEmailNotification = require("../helpers/sendEmailNotification");
var nodemailer = require('nodemailer');

var sendAlert = new CronJob("*/25 * * * * *", async function () {
  const currentPrices = await currentPrice();

  if (currentPrices.error) return;

  let priceObj = {
    BTC: currentPrices.data.BTC,
    ETH: currentPrices.data.ETH,
  };
  alerts.alertsList.forEach((alert) => {
    let message, title, recipient;
    var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'maheshbharvad8747@gmail.com',
          pass: '@bharvad8747@'
      }
  };
  var transporter = nodemailer.createTransport(smtpConfig);
    // var transporter = nodemailer.createTransport({
    //   service: 'smtp.gmail.com',
    //   auth: {
    //     users: 'maheshbharvad8747@gmail.com',
    //     pass: '@bharvad8747@'
    //   }
    // });


    if (
      alert.type == "above" &&
      parseFloat(alert.price) <= parseFloat(priceObj[alert.asset])
    ) {
      console.log('above');
      // var mailOptions = {
      //   from: 'maheshbharvad8747@gmail.com',
      //   to: 'harshmoradiya576@gmail.com',
      //   subject: 'Sending Email using node.js',
      //   text: `Price of ${
      //     alert.asset
      //   } has just exceeded your alert price of ${alert.price} USD.
      //   Current price is ${priceObj[alert.asset]} USD.`
      // };
  
      // transporter.sendMail(mailOptions, function(error,info){
        
      // });
      message = `Price of ${
        alert.asset
      } has just exceeded your alert price of ${alert.price} USD.
      Current price is ${priceObj[alert.asset]} USD.`;

      title = `${alert.asset} is up!`;
      recipient = alert.email;

      var mailOptions = {
        from: 'maheshbharvad8747@gmail.com',
        to: alert.email,
        subject: 'Sending Email using node.js',
        text: message
      };
  
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      });
    } else if (
      alert.type == "below" &&
      parseFloat(alert.price) > parseFloat(priceObj[alert.asset])
    ) {
      console.log('below');
      message = `Price of ${alert.asset} fell below your alert price of ${
        alert.price
      }.
      Current price is ${priceObj[alert.asset]} USD.`;

      recipient = alert.email;
      title = `${alert.asset} is down!`;

      var mailOptions = {
        from: 'maheshbharvad8747@gmail.com',
        to: alert.email,
        subject: 'Sending Email using node.js',
        text: message
      };
  
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('error' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      });
    }
    // var alertQueue = new Queue("alerts", config.REDIS_URL);

    // alertQueue.process(async function (job, done) {
    //   const { recipient, title, message } = job.data;
    //   let sendEmailResponse = await sendEmailNotification(
    //     recipient,
    //     message,
    //     title
    //   );
    //   if (sendEmailResponse.error) {
    //     done(new Error("Error sending alert"));
    //   }

    //   done();
    // });
  });
});

sendAlert.start();