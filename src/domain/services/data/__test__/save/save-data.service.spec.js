const { ValidationException } = require('../../../../exceptions');
const { SaveDataService } = require('../../save/save-data.service');
const { saveDataPort, saveMetadataPort } = require('../ports');

const dataService = new SaveDataService(saveDataPort, saveMetadataPort);

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('Test SaveDataService', () => {
  it('should save data', async () => {
    const result = await dataService.save({
      data: 'Save my secret data',
      accessTimeCount: 10,
      expirationTime: '2030-01-01T10:10:10',
    });

    expect(saveDataPort.save.mock.calls[0][0]).toBe('Save my secret data');
    expect(result).toBeTruthy();
  });

  it('should throw error if expirationTime is wrong', async () => {
    expect.assertions(2);

    try {
      await dataService.save({
        data: 'Save my secret data',
        accessTimeCount: 10,
        expirationTime: '2030-10-20',
      });
    } catch (error) {
      expect(error.message).toBe(
        'The expirationTime should be ISO string with timestamp in format YYYY-MM-DDTHH:mm:ss',
      );
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if accessTimeCount less than 1', async () => {
    expect.assertions(2);

    try {
      await dataService.save({
        data: 'Save my secret data',
        accessTimeCount: 0,
        expirationTime: '2030-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('The accessTimeCount should be a number more then 0');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if expirationTime less than current date', async () => {
    expect.assertions(2);

    try {
      await dataService.save({
        data: 'Save my secret data',
        accessTimeCount: 10,
        expirationTime: '2010-01-01T10:10:10',
      });
    } catch (error) {
      expect(error.message).toBe('The expirationTime should be more then current date');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });
});
