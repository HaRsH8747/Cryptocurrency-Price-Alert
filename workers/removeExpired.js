const CronJob = require("cron").CronJob;
const alerts = require("../alerts");

var removeExpired = new CronJob("*/10 * * * * *", async function () {
  alerts.alertsList.forEach((alert, index) => {
    if (new Date(alert.createdAt).getTime() + 10 * 1000 < new Date().getTime())
      alerts.alertsList.splice(index, 1);
  });
});

removeExpired.start();