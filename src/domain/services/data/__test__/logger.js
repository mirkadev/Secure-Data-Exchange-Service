class Logger {
  setName(name) {
    this.name = name;
  }

  log(...data) {
    console.log(`[${this.name}]`, ...data);
  }

  info(...data) {
    console.info(`[${this.name}]`, ...data);
  }

  warn(...data) {
    console.warn(`[${this.name}]`, ...data);
  }

  error(...data) {
    console.error(`[${this.name}]`, ...data);
  }
}

module.exports = { Logger };
