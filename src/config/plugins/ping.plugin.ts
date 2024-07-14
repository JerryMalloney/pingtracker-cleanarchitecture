import ping from "ping";

export class PingChecker {
  constructor(public url: string) {}

  static async check(url: string): Promise<{ alive: boolean; ping: number }> {
    const result = await ping.promise.probe(url);
    if (result.time !== "unknown") {
      return { alive: result.alive, ping: result.time };
    } else {
      return { alive: result.alive, ping: 0 };
    }
  }
}
