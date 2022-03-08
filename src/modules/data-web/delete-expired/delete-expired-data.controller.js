class DeleteExpiredDataController {
  constructor(deleteExpiredDataUseCase) {
    this._deleteExpiredDataUseCase = deleteExpiredDataUseCase;
  }

  // POST api/data/cron
  async deleteExpired() {
    return this._deleteExpiredDataUseCase.deleteExpired();
  }
}

module.exports = { DeleteExpiredDataController };
