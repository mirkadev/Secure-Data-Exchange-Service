class ClearAllDataController {
  constructor(deleteAllDataUseCase) {
    this._deleteAllDataUseCase = deleteAllDataUseCase;
  }

  // POST api/data/clear
  async clearAll({ code: clearCode }) {
    // TODO: check all params
    return this._deleteAllDataUseCase.deleteAll(clearCode);
  }
}

module.exports = { ClearAllDataController };
