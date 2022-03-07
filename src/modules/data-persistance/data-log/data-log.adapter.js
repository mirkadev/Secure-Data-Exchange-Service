// postgres
// saveDeletedDataLogPort; [save]
// loadDeletedDataLogPort; [findByShareCode]

class DataLogAdapter {
  constructor(dataLogStorage) {
    this._dataLogStorage = dataLogStorage;
  }

  save() {}

  findByShareCode() {}
}

module.exports = { DataLogAdapter };
