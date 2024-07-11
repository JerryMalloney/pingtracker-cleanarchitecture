import { CronJob } from "cron";

console.log("test");

const job = new CronJob(
  "*/5 * * * * *",
  () => {
    console.log(new Date().getTime());
  },
  null,
  true
);
