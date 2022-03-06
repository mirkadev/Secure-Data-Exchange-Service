const { DateEntity } = require('../../../entities/date.entity');
const { MetadataEntity } = require('../../../entities/metadata.entity');

function createMetadataEntity(
  accessTimeCount = 10,
  expirationTime = '2030-01-01T10:10:10',
  shareCode = 'testShareCode',
  adminCode = 'testAdminCode',
) {
  const dateExpirationTime = DateEntity.of(expirationTime);

  const metadata = new MetadataEntity(
    accessTimeCount,
    dateExpirationTime,
    MetadataEntity.generateCode(5),
    MetadataEntity.generateCode(5),
    MetadataEntity.generateFilename(),
  );

  metadata.shareCode = shareCode;
  metadata.adminCode = adminCode;
  metadata._filename = 'test_filename.data';
  metadata.id = 'testId';

  return metadata;
}

module.exports = { createMetadataEntity };
