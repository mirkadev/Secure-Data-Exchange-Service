const { ValidationException, NotFoundException } = require('../../../exceptions');

class DeleteDataService {
  constructor(deleteDataPort, deleteMetadataPort, loadMetadataPort, saveDeletedDataLogPort, logger) {
    this._deleteDataPort = deleteDataPort;
    this._deleteMetadataPort = deleteMetadataPort;
    this._loadMetadataPort = loadMetadataPort;
    this._saveDeletedDataLogPort = saveDeletedDataLogPort;
    this._logger = logger;

    this._logger.setName('DELETE-DATA-SERVICE');
  }

  async delete(adminCode) {
    if (!adminCode) {
      throw ValidationException('The adminCode should be provided');
    }

    const metadata = await this._loadMetadataPort.findByAdminCode(adminCode);

    if (!metadata) {
      throw new NotFoundException('Cannot find data for this admin code');
    }

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
        this._logger.error(`Cannot save deleted data log ${e}, filename: ${metadata.filename}, id: ${metadata.id}`, e),
      );

    return true;
  }
}

module.exports = { DeleteDataService };
