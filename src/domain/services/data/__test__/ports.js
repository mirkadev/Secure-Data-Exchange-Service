const { createMetadataEntity } = require('./create-metadata-entity');

const metadataEntity = createMetadataEntity();

const loadDataPort = {
  get: jest.fn((filename) => {
    if (filename === 'test_filename.data') {
      return 'My secret data';
    }

    return null;
  }),
};

const loadMetadataPort = {
  findByShareCode: jest.fn((shareCode) => {
    if (shareCode === 'testShareCode') {
      return metadataEntity;
    }

    if (shareCode === 'expiredShareCode') {
      return createMetadataEntity(10, '2000-01-01T10:10:10');
    }

    if (shareCode === 'exceededShareCode') {
      return createMetadataEntity(0);
    }

    return null;
  }),
  findByAdminCode: jest.fn((adminCode) => {
    if (adminCode === 'testAdminCode') {
      return metadataEntity;
    }

    return null;
  }),
};

const loadDeletedDataLogPort = {
  findByShareCode: jest.fn((shareCode) => {
    if (shareCode === 'deletedShareCode') {
      return {
        filename: metadataEntity.filename,
        shareCode: metadataEntity.shareCode,
      };
    }

    return null;
  }),
};

const saveDataPort = {
  save: jest.fn(() => {
    return true;
  }),
};

const saveMetadataPort = {
  save: jest.fn(() => {
    return true;
  }),
};

const deleteDataPort = {
  delete: jest.fn(async (metadata) => {
    if (metadata.filename && /.*\.data$/.test(metadata.filename)) {
      return true;
    }

    throw new Error('Metadata should have filename');
  }),
};

const deleteMetadataPort = {
  delete: jest.fn(async (metadata) => {
    if (!metadata.id) {
      throw new Error('Metadata should have id');
    }

    return true;
  }),
};

const saveDeletedDataLogPort = {
  save: jest.fn(async (metadata) => {
    if (!metadata.filename) {
      throw new Error('Metadata should have filename');
    }

    if (!metadata.shareCode) {
      throw new Error('Metadata should have shareCode');
    }

    return true;
  }),
};

const loadClearCodePort = {
  find: jest.fn(async () => {
    return 'testClearCode';
  }),
};

const saveClearCodePort = {
  save: jest.fn(async (newCode) => {
    if (!newCode) {
      throw new Error('New clear code should be provided');
    }

    return true;
  }),
};

const loadAllMetadataGeneratorPort = {
  load: jest.fn(() => {
    let counter = 10;
    async function* allMetadataGenerator() {
      while (counter) {
        yield createMetadataEntity();
        counter -= 1;
      }
    }

    return allMetadataGenerator();
  }),
};

module.exports = {
  loadDataPort,
  loadMetadataPort,
  loadDeletedDataLogPort,
  saveDataPort,
  saveMetadataPort,
  deleteDataPort,
  deleteMetadataPort,
  saveDeletedDataLogPort,
  loadClearCodePort,
  saveClearCodePort,
  loadAllMetadataGeneratorPort,
};
