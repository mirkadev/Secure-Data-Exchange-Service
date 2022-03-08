/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class DataAdapter {
  constructor(dataStorage) {
    this._dataStorage = dataStorage;
  }

  async get(filename) {
    return this._dataStorage.get(filename);
  }

  async save(data, metadata) {
    return this._dataStorage.upload(data, metadata.filename);
  }

  async delete(metadata) {
    return this._dataStorage.delete(metadata.filename);
  }
}

module.exports = { DataAdapter };
