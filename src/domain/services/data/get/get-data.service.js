const { NotFoundException, LimitExceededException } = require('../../../exceptions');

class GetDataService {
  constructor(loadDataPort, loadMetadataPort, loadDeletedDataLogPort) {
    this._loadDataPort = loadDataPort;
    this._loadMetadataPort = loadMetadataPort;
    this._loadDeletedDataLogPort = loadDeletedDataLogPort;
  }

  async get(shareCode) {
    const metadata = await this._loadMetadataPort.findByShareCode(shareCode, { decreaseAccessCounter: true });

    if (!metadata) {
      const isDeletedData = await this._loadDeletedDataLogPort.findByShareCode(shareCode);

      if (isDeletedData) {
        throw new NotFoundException('The data was deleted');
      }

      throw new NotFoundException('Cannot find data for this share code');
    }

    if (metadata.isExpired()) {
      throw new NotFoundException('The data was deleted');
    }

    if (metadata.accessTimeCount < 1) {
      throw new LimitExceededException('Data request limit exceeded');
    }

    const data = await this._loadDataPort.get(metadata.filename);
    return data;
  }
}

module.exports = { GetDataService };
