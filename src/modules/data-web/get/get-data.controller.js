class GetDataController {
  constructor(getDataUseCase) {
    this._getDataUseCase = getDataUseCase;
  }

  // GET api/data/:shareCode
  async getData({ shareCode }) {
    // TODO: check share code
    const data = await this._getDataUseCase.get(shareCode);
    return { data };
  }
}

module.exports = { GetDataController };
