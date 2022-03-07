class PushDataController {
  constructor(saveDataUseCase) {
    this._saveDataUseCase = saveDataUseCase;
  }

  // POST api/data/push
  async push({ data, accessTimeCount, expirationTime }) {
    // TODO: check all params
    return this._saveDataUseCase.save({ data, accessTimeCount, expirationTime });
  }
}

module.exports = { PushDataController };
