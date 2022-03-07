// awsS3
// loadDataPort; [get]
// saveDataPort; [save]
// deleteDataPort; [delete]

class DataAdapter {
  constructor(dataStorage) {
    this._dataStorage = dataStorage;
  }

  get() {}

  save() {}

  delete() {}
}

module.exports = { DataAdapter };
