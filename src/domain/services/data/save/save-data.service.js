const { MetadataEntity } = require('../../../entities/metadata.entity');
const { SHARE_CODE_SIZE, ADMIN_CODE_SIZE } = require('../../../constants');
const { DateEntity } = require('../../../entities/date.entity');
const { ValidationException } = require('../../../exceptions');

class SaveDataService {
  constructor(saveDataPort, saveMetadataPort) {
    this._saveDataPort = saveDataPort;
    this._saveMetadataPort = saveMetadataPort;
  }

  async save({ data, accessTimeCount, expirationTime }) {
    if (!DateEntity.isISODateWithTimestamp(expirationTime)) {
      throw new ValidationException(
        'The expirationTime should be ISO string with timestamp in format YYYY-MM-DDTHH:mm:ss',
      );
    }

    const dateExpirationTime = DateEntity.of(expirationTime);

    if (!dateExpirationTime.isValid) {
      throw new ValidationException('The expirationTime has wrong format');
    }

    if (typeof accessTimeCount !== 'number' || accessTimeCount < 1) {
      throw new ValidationException('The accessTimeCount should be a number more then 0');
    }

    const metadata = new MetadataEntity(
      accessTimeCount,
      dateExpirationTime,
      MetadataEntity.generateCode(SHARE_CODE_SIZE),
      MetadataEntity.generateCode(ADMIN_CODE_SIZE),
      MetadataEntity.generateFilename(),
    );

    if (!metadata.isExpired) {
      throw new ValidationException('The expirationTime should be more then current date');
    }

    await this._saveDataPort.save(data, metadata);
    await this._saveMetadataPort.save(metadata);

    return true;
  }
}

module.exports = { SaveDataService };
