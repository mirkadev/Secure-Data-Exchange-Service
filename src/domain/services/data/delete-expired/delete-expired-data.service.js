/* eslint-disable no-restricted-syntax */
class DeleteExpiredDataService {
  constructor(loadExpiredMetadataGeneratorPort, deleteDataPort, deleteMetadataPort, saveDeletedDataLogPort) {
    this._loadExpiredMetadataGeneratorPort = loadExpiredMetadataGeneratorPort;
    this._deleteDataPort = deleteDataPort;
    this._deleteMetadataPort = deleteMetadataPort;
    this._saveDeletedDataLogPort = saveDeletedDataLogPort;
  }

  async deleteExpired() {
    const expiredMetadataGenerator = this._loadExpiredMetadataGeneratorPort();

    process.nextTick(async () => {
      for await (const metadata of expiredMetadataGenerator) {
        await this._deleteDataPort.save(metadata);
        await this._deleteMetadataPort.save(metadata);
        await this._saveDeletedDataLogPort.save(metadata);
      }
    });

    return true;
  }
}

module.exports = { DeleteExpiredDataService };
