export class Logger {
  static log(...message: string[]): void {
    // eslint-disable-next-line no-console
    console.log(...message);
  }

  static error(...message: string[]): void {
    // eslint-disable-next-line no-console
    console.error(...message);
  }

  static warn(...message: string[]): void {
    // eslint-disable-next-line no-console
    console.warn(...message);
  }

  static info(...message: string[]): void {
    // eslint-disable-next-line no-console
    console.info(...message);
  }

  static debug(...message: string[]): void {
    // eslint-disable-next-line no-console
    console.debug(...message);
  }
}
