/* eslint-disable no-restricted-syntax */
class DeleteExpiredDataService {
  constructor(loadExpiredMetadataGeneratorPort, deleteDataPort, deleteMetadataPort, saveDeletedDataLogPort, logger) {
    this._loadExpiredMetadataGeneratorPort = loadExpiredMetadataGeneratorPort;
    this._deleteDataPort = deleteDataPort;
    this._deleteMetadataPort = deleteMetadataPort;
    this._saveDeletedDataLogPort = saveDeletedDataLogPort;
    this._logger = logger;

    this._logger.setName('DELETE-EXPIRED-DATA-SERVICE');
  }

  async deleteExpired() {
    const expiredMetadataGenerator = this._loadExpiredMetadataGeneratorPort.loadExpiredGenerator();

    process.nextTick(async () => {
      let processedCount = 0;
      for await (const metadata of expiredMetadataGenerator) {
        await this._deleteDataPort
          .delete(metadata)
          .then(() => this._logger.info(`File ${metadata.filename} was deleted`))
          .catch((e) =>
            this._logger.error(`Cannot delete data ${e}, filename: ${metadata.filename}, id: ${metadata.id}`, e),
          );
        await this._deleteMetadataPort
          .delete(metadata)
          .then(() => this._logger.info(`Metadata ${metadata.filename} was deleted`))
          .catch((e) =>
            this._logger.error(`Cannot delete metadata ${e}, filename: ${metadata.filename}, id: ${metadata.id}`, e),
          );
        await this._saveDeletedDataLogPort
          .save(metadata)
          .then(() => this._logger.info(`File ${metadata.filename} was logged`))
          .catch((e) =>
            this._logger.error(
              `Cannot save deleted data log ${e}, filename: ${metadata.filename}, id: ${metadata.id}`,
              e,
            ),
          );

        processedCount += 1;
      }

      this._logger.info(`Deleting expiring data is done. Processed data: ${processedCount}`);
    });

    return true;
  }
}

module.exports = { DeleteExpiredDataService };
