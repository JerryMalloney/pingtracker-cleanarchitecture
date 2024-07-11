import { CronJob } from "cron";

export class CronService {
  static createJob(cronTime: string | Date, cronTick: () => void): CronJob {
    const job = new CronJob(cronTime, cronTick);

    job.start();

    return job;
  }
}
