const { MetadataEntity } = require('../../../domain/entities/metadata.entity');
const { MetadataModel } = require('./metadata.odm-entity');

class MetadataMapper {
  static mapToModel(metadata) {
    const model = new MetadataModel();
    model.accessTimeCount = metadata.accessTimeCount;
    model.expirationTime = metadata.expirationTime;
    model.shareCode = metadata.shareCode;
    model.adminCode = metadata.adminCode;
    model.filename = metadata.filename;

    if (metadata.id) {
      model._id = metadata.id;
    }

    return model;
  }

  static mapToMetadataEntity(data) {
    return new MetadataEntity(
      data.accessTimeCount,
      data.expirationTime,
      data.shareCode,
      data.adminCode,
      data.filename,
      data._id,
    );
  }
}

module.exports = { MetadataMapper };
