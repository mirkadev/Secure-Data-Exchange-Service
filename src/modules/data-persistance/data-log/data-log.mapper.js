const { DateEntity } = require('../../../domain/entities/date.entity');
const { MetadataEntity } = require('../../../domain/entities/metadata.entity');

class DataLogMapper {
  static mapToDataLog(metadata) {
    return {
      filename: metadata.filename,
      shareCode: metadata.shareCode,
      expirationTime: metadata.expirationTime,
    };
  }

  static mapToMetadata(data) {
    return new MetadataEntity(0, DateEntity.of(data.expirationTime), data.shareCode, '', data.filename);
  }
}

module.exports = { DataLogMapper };
