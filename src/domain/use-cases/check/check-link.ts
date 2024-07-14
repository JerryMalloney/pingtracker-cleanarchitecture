import { PingChecker } from "../../../config/plugins/ping.plugin";
import { LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export class CheckLink {
  constructor(private readonly logRepository: LogRepository) {}

  public async execute(url: string) {
    try {
      const result = await PingChecker.check(url);
      let level;
      if (result.alive == true) {
        level = LogSeverityLevel.low;
      } else {
        level = LogSeverityLevel.high;
      }
      this.logRepository.saveLogs({
        level,
        origin: url,
        ping: result.ping.toString(),
        createdAt: new Date(),
      });
      return result.ping;
    } catch (error) {
      console.log(error);
    }
  }
}
