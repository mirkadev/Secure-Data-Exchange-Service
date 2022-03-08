/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class DataAdapter {
  constructor(dataStorage) {
    this._dataStorage = dataStorage;
  }

  async get(filename) {
    return filename;
  }

  async save(data, metadata) {
    return true;
  }

  async delete(metadata) {
    return true;
  }
}

module.exports = { DataAdapter };
