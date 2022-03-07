// mongodb
// loadExpiredMetadataGeneratorPort; [loadExpiredGenerator]
// loadAllMetadataGeneratorPort; [loadAllGenerator]
// loadMetadataPort; [findByShareCode, findByAdminCode]
// deleteMetadataPort; [delete]
// saveMetadataPort; [save]

class MetadataAdapter {
  constructor(metadataStorage) {
    this._metadataStorage = metadataStorage;
  }

  loadExpiredGenerator() {}

  loadAllGenerator() {}

  findByAdminCode() {}

  findByShareCode() {}

  delete() {}

  save() {}
}

module.exports = { MetadataAdapter };
