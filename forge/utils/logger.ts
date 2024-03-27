import { app } from "../main";

class Logger {
  public static log(message: string): void {
    app.log.info(message);
  }

  public static error(message: string): void {
    app.log.error(message);
  }
}

export default Logger;
