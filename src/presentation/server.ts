import { CheckLink } from "../domain/use-cases/check/check-link";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const postgresRepository = new LogRepositoryImpl(new PostgresLogDataSource());

export class Server {
  public static async start() {
    CronService.createJob("*/2 * * * * *", () => {
      const url = "8.8.8.8";
      new CheckLink(postgresRepository).execute(url);
    });
  }
}
