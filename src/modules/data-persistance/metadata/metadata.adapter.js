/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */

const { MetadataMapper } = require('./metadata.mapper');

class MetadataAdapter {
  constructor(metadataStorage) {
    this._metadataStorage = metadataStorage;
  }

  loadExpiredGenerator() {
    const self = this;
    async function* expiredGenerator() {
      let next = true;
      while (next) {
        const result = await self._metadataStorage
          .findOne({ expirationTime: { $lt: new Date() } })
          .limit(1)
          .exec();

        if (result) {
          const metadata = MetadataMapper.mapToMetadataEntity(result);
          yield metadata;
        } else {
          next = false;
        }
      }
    }

    return expiredGenerator();
  }

  loadAllGenerator() {
    const self = this;
    async function* allGenerator() {
      let next = true;
      while (next) {
        const result = await self._metadataStorage.findOne();
        if (result) {
          const metadata = MetadataMapper.mapToMetadataEntity(result);
          yield metadata;
        } else {
          next = false;
        }
      }
    }

    return allGenerator();
  }

  async findByAdminCode(adminCode) {
    const result = await this._metadataStorage.findOne({ adminCode });
    if (!result) {
      return null;
    }

    const metadata = MetadataMapper.mapToMetadataEntity(result);
    return metadata;
  }

  async findByShareCode(shareCode, { decreaseAccessCounter = false }) {
    const result = await this._metadataStorage.findOne({ shareCode });

    if (!result) {
      return null;
    }

    const oldAccessTimeCount = result.accessTimeCount;

    // there is problem with concurrency
    // in SQL database I would use select for update operator
    // but in mongodb... I do not know
    if (decreaseAccessCounter) {
      if (result.accessTimeCount > 0) {
        result.accessTimeCount -= 1;
        await result.save();
      }
    }

    const metadata = MetadataMapper.mapToMetadataEntity(result);
    metadata.accessTimeCount = oldAccessTimeCount;

    return metadata;
  }

  async delete(metadata) {
    const result = await this._metadataStorage.deleteOne({ filename: metadata.filename });
    if (result.deletedCount) {
      return true;
    }

    return false;
  }

  async save(metadata) {
    const model = MetadataMapper.mapToModel(metadata);

    if (metadata.id) {
      await this._metadataStorage.updateOne(
        { filename: metadata.filename },
        {
          accessTimeCount: metadata.accessTimeCount,
          expirationTime: metadata.expirationTime,
        },
      );

      return model._id;
    }

    const result = await model.save();
    return result.id;
  }
}

module.exports = { MetadataAdapter };
