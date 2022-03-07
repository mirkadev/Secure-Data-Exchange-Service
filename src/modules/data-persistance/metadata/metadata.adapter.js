/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */

const { MetadataMapper } = require('./metadata.mapper');

class MetadataAdapter {
  constructor(metadataStorage) {
    this._metadataStorage = metadataStorage;
  }

  loadExpiredGenerator() {
    async function* expiredGenerator() {
      let next = true;
      while (next) {
        const result = await this._metadataStorage
          .find({ expirationTime: { $lt: new Date() } })
          .limit(1)
          .exec();
        if (result) {
          yield result;
        } else {
          next = false;
        }
      }
    }

    return expiredGenerator();
  }

  loadAllGenerator() {
    async function* allGenerator() {
      let next = true;
      while (next) {
        const result = await this._metadataStorage.findOne();
        if (result) {
          yield result;
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

    if (model._id) {
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
