/* eslint-disable no-restricted-syntax */
const { randomUUID } = require('crypto');
const { CLEAR_CODE_UUID } = require('../../../constants');
const { ValidationException } = require('../../../exceptions');

class DeleteAllDataService {
  constructor(
    loadClearCodePort,
    saveClearCodePort,
    deleteDataPort,
    loadAllMetadataGeneratorPort,
    deleteMetadataPort,
    saveDeletedDataLogPort,
    logger,
  ) {
    this._loadClearCodePort = loadClearCodePort;
    this._saveClearCodePort = saveClearCodePort;
    this._deleteDataPort = deleteDataPort;
    this._loadAllMetadataGeneratorPort = loadAllMetadataGeneratorPort;
    this._deleteMetadataPort = deleteMetadataPort;
    this._saveDeletedDataLogPort = saveDeletedDataLogPort;
    this._logger = logger;

    this._logger.setName('DELETE-ALL-DATA-SERVICE');
  }

  async deleteAll(clearCode) {
    let allowDelete = false;
    const foundClearCode = await this._loadClearCodePort.find();

    if (!foundClearCode) {
      if (clearCode === CLEAR_CODE_UUID) {
        allowDelete = true;
      }

      throw new ValidationException('Clear code is wrong');
    }

    if (!allowDelete && clearCode !== foundClearCode) {
      throw new ValidationException('Clear code is wrong');
    }

    const allMetadataGenerator = this._loadAllMetadataGeneratorPort();

    process.nextTick(async () => {
      for await (const metadata of allMetadataGenerator) {
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
      }
    });

    const newClearCodeUUID = randomUUID();
    await this._saveClearCodePort.save(newClearCodeUUID);

    return newClearCodeUUID;
  }
}

module.exports = { DeleteAllDataService };
