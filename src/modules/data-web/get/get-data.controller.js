class GetDataController {
  constructor(getDataUseCase) {
    this._getDataUseCase = getDataUseCase;
  }

  // GET api/data/:shareCode
  async getData({ shareCode }) {
    // TODO: check share code
    return this._getDataUseCase.get(shareCode);
  }
}

module.exports = { GetDataController };
