export enum LogSeverityLevel {
  low = "low",
  high = "high",
}

interface LogEntityOptions {
  level: LogSeverityLevel;
  ping: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public ping: string;
  public origin: string;
  public createdAt: Date;

  constructor(options: LogEntityOptions) {
    const { level, origin, ping, createdAt = new Date() } = options;

    this.level = level;
    this.ping = ping;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, ping, origin, createdAt } = object;
    const log = new LogEntity({ level, ping, origin, createdAt });
    return log;
  };
}
