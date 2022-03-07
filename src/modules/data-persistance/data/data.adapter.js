/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class DataAdapter {
  constructor(dataStorage) {
    this._dataStorage = dataStorage;
  }

  get(metadata) {
    return metadata.filename;
  }

  save(data, metadata) {
    return true;
  }

  delete(metadata) {
    return true;
  }
}

module.exports = { DataAdapter };
