const { ValidationException, NotFoundException } = require('../../../exceptions');

class DeleteDataService {
  constructor(deleteDataPort, deleteMetadataPort, loadMetadataPort, saveDeletedDataLogPort) {
    this._deleteDataPort = deleteDataPort;
    this._deleteMetadataPort = deleteMetadataPort;
    this._loadMetadataPort = loadMetadataPort;
    this._saveDeletedDataLogPort = saveDeletedDataLogPort;
  }

  async delete(adminCode) {
    if (!adminCode) {
      throw ValidationException('The adminCode should be provided');
    }

    const metadata = await this._loadMetadataPort.findByAdminCode(adminCode);

    if (!metadata) {
      throw new NotFoundException('Cannot find data for this admin code');
    }

    await this._deleteDataPort.delete(metadata);
    await this._deleteMetadataPort.delete(metadata);
    await this._saveDeletedDataLogPort.save(metadata);

    return true;
  }
}

module.exports = { DeleteDataService };
