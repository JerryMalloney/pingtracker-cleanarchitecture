import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaclient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDatasource {
  async saveLogs(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prismaclient.logModel.create({
      data: {
        ...log,
        level,
      },
    });
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const logs = await prismaclient.logModel.findMany({
      where: { level },
    });

    return logs.map((log) => LogEntity.fromObject(log));
  }
}
