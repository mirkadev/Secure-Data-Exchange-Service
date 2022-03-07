/* eslint-disable no-console */
class Logger {
  setName(name) {
    this.name = name;
  }

  log(...data) {
    console.log(`[${this.name}] [log]`, ...data);
  }

  info(...data) {
    console.info(`[${this.name}] [info]`, ...data);
  }

  warn(...data) {
    console.warn(`[${this.name}] [warn]`, ...data);
  }

  error(...data) {
    console.error(`[${this.name}] [error]`, ...data);
  }
}

module.exports = { Logger };
