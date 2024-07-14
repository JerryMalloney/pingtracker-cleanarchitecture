import { envs } from "../config/plugins/envs.plugin";
import { CheckLink } from "../domain/use-cases/check/check-link";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const postgresRepository = new LogRepositoryImpl(new PostgresLogDataSource());

export class Server {
  public static async start() {
    CronService.createJob("*/2 * * * * *", () => {
      const url = envs.URL;
      new CheckLink(postgresRepository)
        .execute(url)
        .then((link) => console.log(link));
    });
  }
}
