import { server } from "@config/http";

class Logger {
  public static log(message: string): void {
    server.log.info(message);
  }

  public static error(message: string): void {
    server.log.error(message);
  }
}

export default Logger;
