const { DateEntity } = require('../../../entities/date.entity');
const { ValidationException, NotFoundException } = require('../../../exceptions');

class UpdateDataService {
  constructor(saveDataPort, saveMetadataPort, loadMetadataPort) {
    this._saveDataPort = saveDataPort;
    this._saveMetadataPort = saveMetadataPort;
    this._loadMetadataPort = loadMetadataPort;
  }

  async update({ data, accessTimeCount, expirationTime, adminCode }) {
    if (!adminCode) {
      throw ValidationException('The adminCode should be provided');
    }

    const metadata = await this._loadMetadataPort.findByAdminCode(adminCode);

    if (!metadata) {
      throw new NotFoundException('Cannot find data for this admin code');
    }

    if (accessTimeCount) {
      if (typeof accessTimeCount !== 'number' || accessTimeCount < 1) {
        throw new ValidationException('The accessTimeCount should be a number more then 0');
      }

      metadata.accessTimeCount = accessTimeCount;
    }

    if (expirationTime) {
      if (!DateEntity.isISODateWithTimestamp(expirationTime)) {
        throw new ValidationException(
          'The expirationTime should be ISO string with timestamp in format YYYY-MM-DDTHH:mm:ss',
        );
      }

      const dateExpirationTime = DateEntity.of(expirationTime);

      if (!dateExpirationTime.isValid) {
        throw new ValidationException('The expirationTime has wrong format');
      }

      metadata.expirationTime = expirationTime;

      if (!metadata.isExpired) {
        throw new ValidationException('The expirationTime should be more then current date');
      }
    }

    await this._saveDataPort.save(data, metadata);
    await this._saveMetadataPort.save(metadata);

    return true;
  }
}

module.exports = { UpdateDataService };
