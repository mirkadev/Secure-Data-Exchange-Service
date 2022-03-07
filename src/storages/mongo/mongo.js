/* eslint-disable global-require */
class Mongoose {
  constructor() {
    this.mongo = require('mongoose');
  }

  async getConnection() {
    return this.mongo;
  }

  async connect(url) {
    this.url = url;
    await this.mongo.connect(this.url);
  }
}

module.exports = { Mongoose };
