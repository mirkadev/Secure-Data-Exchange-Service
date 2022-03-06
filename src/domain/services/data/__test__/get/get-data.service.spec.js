const { NotFoundException, LimitExceededException } = require('../../../../exceptions');
const { GetDataService } = require('../../get/get-data.service');
const { loadDataPort, loadDeletedDataLogPort, loadMetadataPort } = require('../ports');

const dataService = new GetDataService(loadDataPort, loadMetadataPort, loadDeletedDataLogPort);

describe('Test GetDataService', () => {
  it('should get exists data', async () => {
    const data = await dataService.get('testShareCode');
    expect(data).toBe('My secret data');
  });

  it('should get error if share code is wrong', async () => {
    expect.assertions(1);

    try {
      await dataService.get('wrongShareCode');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should get error if data was deleted', async () => {
    expect.assertions(2);

    try {
      await dataService.get('deletedShareCode');
    } catch (error) {
      expect(error.message).toBe('The data was deleted');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should get error if data was expired', async () => {
    expect.assertions(2);

    try {
      await dataService.get('expiredShareCode');
    } catch (error) {
      expect(error.message).toBe('The data was deleted');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should get error if request limit exceeded', async () => {
    expect.assertions(2);

    try {
      await dataService.get('exceededShareCode');
    } catch (error) {
      expect(error.message).toBe('Data request limit exceeded');
      expect(error).toBeInstanceOf(LimitExceededException);
    }
  });
});
