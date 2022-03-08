const { ValidationException } = require('../../../../exceptions');
const { DeleteAllDataService } = require('../../delete-all/delete-all-data.service');
const {
  deleteDataPort,
  deleteMetadataPort,
  saveDeletedDataLogPort,
  loadClearCodePort,
  saveClearCodePort,
  loadAllMetadataGeneratorPort,
} = require('../ports');
const { Logger } = require('../logger');

const dataService = new DeleteAllDataService(
  loadClearCodePort,
  saveClearCodePort,
  deleteDataPort,
  loadAllMetadataGeneratorPort,
  deleteMetadataPort,
  saveDeletedDataLogPort,
  new Logger(),
);

const regexUUID = /[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}/;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test DeleteAllDataService', () => {
  it('should delete all data', (done) => {
    const result = dataService.deleteAll('testClearCode');
    setImmediate(() => {
      expect(result.then((r) => r.code)).resolves.toMatch(regexUUID);

      expect(deleteDataPort.delete.mock.calls.length).toBe(10);
      expect(deleteMetadataPort.delete.mock.calls.length).toBe(10);
      expect(saveDeletedDataLogPort.save.mock.calls.length).toBe(10);
      expect(saveClearCodePort.save.mock.calls.length).toBe(1);

      expect(deleteDataPort.delete.mock.calls[0][0].filename).toBe('test_filename.data');
      expect(deleteMetadataPort.delete.mock.calls[0][0].id).toBe('testId');
      expect(saveDeletedDataLogPort.save.mock.calls[0][0].id).toBe('testId');
      expect(saveDeletedDataLogPort.save.mock.calls[0][0].filename).toBe('test_filename.data');
      expect(saveDeletedDataLogPort.save.mock.calls[0][0].shareCode).toBe('testShareCode');
      expect(saveClearCodePort.save.mock.calls[0][0]).toMatch(regexUUID);

      done();
    });
  });

  it('should get clear code from env if clear code not found', (done) => {
    loadClearCodePort.find = jest.fn(() => undefined);
    const result = dataService.deleteAll('TEST_CLEAR_CODE_UUID');
    setImmediate(() => {
      expect(saveClearCodePort.save.mock.calls[0][0]).toMatch(regexUUID);
      expect(result.then((r) => r.code)).resolves.toMatch(regexUUID);
      done();
    });
  });

  it('should throw error if clear code from env does not equal received clear code', async () => {
    expect.assertions(2);
    loadClearCodePort.find = jest.fn(() => undefined);

    try {
      await dataService.deleteAll('WRONG_TEST_CLEAR_CODE_UUID');
    } catch (error) {
      expect(error.message).toBe('Clear code is wrong');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if received clear code not equals found clear code', async () => {
    expect.assertions(2);
    loadClearCodePort.find = jest.fn(() => 'testClearCode');

    try {
      await dataService.deleteAll('wrongClearCode');
    } catch (error) {
      expect(error.message).toBe('Clear code is wrong');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });
});
