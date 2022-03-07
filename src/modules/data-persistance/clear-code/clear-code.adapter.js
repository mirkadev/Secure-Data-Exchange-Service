// file or mongodb
// saveClearCodePort; [save]
// loadClearCodePort; [find]

class ClearCodeAdapter {
  constructor(clearCodeStorage) {
    this._clearCodeStorage = clearCodeStorage;
  }

  save() {}

  find() {}
}

module.exports = { ClearCodeAdapter };
