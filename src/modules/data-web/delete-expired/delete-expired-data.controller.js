class DeleteExpiredDataController {
  constructor(deleteExpiredDataUseCase) {
    this._deleteExpiredDataUseCase = deleteExpiredDataUseCase;
  }

  // POST api/data/cron
  async update() {
    return this._deleteExpiredDataUseCase.deleteExpired();
  }
}

module.exports = { DeleteExpiredDataController };
