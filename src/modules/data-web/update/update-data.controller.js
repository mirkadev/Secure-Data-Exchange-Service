class UpdateDataController {
  constructor(updateDataUseCase) {
    this._updateDataUseCase = updateDataUseCase;
  }

  // POST api/data/update
  async update({ adminCode, data, accessTimeCount, expirationTime }) {
    // TODO: check all params
    return this._updateDataUseCase.save({ adminCode, data, accessTimeCount, expirationTime });
  }
}

module.exports = { UpdateDataController };
