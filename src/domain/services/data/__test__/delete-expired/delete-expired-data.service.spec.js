const { DeleteExpiredDataService } = require('../../delete-expired/delete-expired-data.service');
const {
  loadExpiredMetadataGeneratorPort,
  deleteDataPort,
  deleteMetadataPort,
  saveDeletedDataLogPort,
} = require('../ports');
const { Logger } = require('../logger');

const dataService = new DeleteExpiredDataService(
  loadExpiredMetadataGeneratorPort,
  deleteDataPort,
  deleteMetadataPort,
  saveDeletedDataLogPort,
  new Logger(),
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test DeleteExpiredDataService', () => {
  it('should delete expired data', (done) => {
    dataService.deleteExpired('');
    setImmediate(() => {
      expect(deleteDataPort.delete.mock.calls.length).toBe(10);
      expect(deleteMetadataPort.delete.mock.calls.length).toBe(10);
      expect(saveDeletedDataLogPort.save.mock.calls.length).toBe(10);

      expect(deleteDataPort.delete.mock.calls[0][0].filename).toBe('test_filename.data');
      expect(deleteMetadataPort.delete.mock.calls[0][0].id).toBe('testId');
      expect(saveDeletedDataLogPort.save.mock.calls[0][0].id).toBe('testId');
      expect(saveDeletedDataLogPort.save.mock.calls[0][0].filename).toBe('test_filename.data');
      expect(saveDeletedDataLogPort.save.mock.calls[0][0].shareCode).toBe('testShareCode');

      done();
    });
  });
});
