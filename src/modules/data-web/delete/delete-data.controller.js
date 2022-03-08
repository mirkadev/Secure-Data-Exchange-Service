class DeleteDataController {
  constructor(deleteDataUseCase) {
    this._deleteDataUseCase = deleteDataUseCase;
  }

  // POST api/data/delete
  async delete({ adminCode }) {
    // TODO: check all params
    return this._deleteDataUseCase.delete(adminCode);
  }
}

module.exports = { DeleteDataController };
