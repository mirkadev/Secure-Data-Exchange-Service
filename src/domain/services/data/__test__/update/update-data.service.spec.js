const { ValidationException, NotFoundException } = require('../../../../exceptions');
const { UpdateDataService } = require('../../update/update-data.service');
const { saveDataPort, saveMetadataPort, loadMetadataPort } = require('../ports');

const dataService = new UpdateDataService(saveDataPort, saveMetadataPort, loadMetadataPort);

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('Test UpdateDataService', () => {
  it('should update data', async () => {
    const result = await dataService.update({
      adminCode: 'testAdminCode',
      data: 'My new secret data',
      accessTimeCount: 105,
      expirationTime: '2080-01-01T10:10:10',
    });

    const dataSaveDatePortCall = saveDataPort.save.mock.calls[0][0];
    expect(dataSaveDatePortCall).toBe('My new secret data');

    const metadataSaveDataPortCall = saveDataPort.save.mock.calls[0][1];
    expect(metadataSaveDataPortCall._expirationTime._date.year).toBe(2080);
    expect(metadataSaveDataPortCall.accessTimeCount).toBe(105);
    expect(metadataSaveDataPortCall.filename).toBe('test_filename.data');
    expect(metadataSaveDataPortCall.id).toBe('testId');

    const metadataSaveMetadataPortCall = saveMetadataPort.save.mock.calls[0][0];
    expect(metadataSaveMetadataPortCall === metadataSaveDataPortCall).toBeTruthy();

    expect(result).toBeTruthy();
  });

  it('should throw error if admin code is not provided', async () => {
    expect.assertions(2);

    try {
      await dataService.update({
        data: 'My new secret data',
        accessTimeCount: 105,
        expirationTime: '2080-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('The adminCode should be provided');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if data not found', async () => {
    expect.assertions(2);

    try {
      await dataService.update({
        adminCode: 'wrongAdminCode',
        data: 'My new secret data',
        accessTimeCount: 105,
        expirationTime: '2080-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('Cannot find data for this admin code');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw error if accessTimeCount <= 0', async () => {
    expect.assertions(2);

    try {
      await dataService.update({
        adminCode: 'testAdminCode',
        data: 'My new secret data',
        accessTimeCount: 0,
        expirationTime: '2080-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('The accessTimeCount should be a number more then 0');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if accessTimeCount is not number', async () => {
    expect.assertions(2);

    try {
      await dataService.update({
        adminCode: 'testAdminCode',
        data: 'My new secret data',
        accessTimeCount: 'test',
        expirationTime: '2080-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('The accessTimeCount should be a number more then 0');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if expirationTime is in wrong format', async () => {
    expect.assertions(2);

    try {
      await dataService.update({
        adminCode: 'testAdminCode',
        data: 'My new secret data',
        accessTimeCount: 10,
        expirationTime: '2080-01',
      });
    } catch (error) {
      expect(error.message).toBe(
        'The expirationTime should be ISO string with timestamp in format YYYY-MM-DDTHH:mm:ss',
      );
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if expirationTime less than current date', async () => {
    expect.assertions(2);

    try {
      await dataService.update({
        adminCode: 'testAdminCode',
        data: 'My new secret data',
        accessTimeCount: 10,
        expirationTime: '2010-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('The expirationTime should be more then current date');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });
});
