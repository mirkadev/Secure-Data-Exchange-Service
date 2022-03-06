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
  ) {
    this._loadClearCodePort = loadClearCodePort;
    this._saveClearCodePort = saveClearCodePort;
    this._deleteDataPort = deleteDataPort;
    this._loadAllMetadataGeneratorPort = loadAllMetadataGeneratorPort;
    this._deleteMetadataPort = deleteMetadataPort;
    this._saveDeletedDataLogPort = saveDeletedDataLogPort;
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
        await this._deleteDataPort.delete(metadata);
        await this._deleteMetadataPort.delete(metadata);
        await this._saveDeletedDataLogPort.save(metadata);
      }
    });

    const newClearCodeUUID = randomUUID();
    await this._saveClearCodePort.save(newClearCodeUUID);

    return newClearCodeUUID;
  }
}

module.exports = { DeleteAllDataService };
