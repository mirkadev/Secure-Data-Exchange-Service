const { DeleteDataService } = require('../../delete/delete-data.service');
const { deleteDataPort, deleteMetadataPort, loadMetadataPort, saveDeletedDataLogPort } = require('../ports');
const { Logger } = require('../logger');
const { ValidationException, NotFoundException } = require('../../../../exceptions');

const dataService = new DeleteDataService(
  deleteDataPort,
  deleteMetadataPort,
  loadMetadataPort,
  saveDeletedDataLogPort,
  new Logger(),
);

describe('Test DeleteDataService', () => {
  it('should delete exists data', async () => {
    const result = await dataService.delete('testAdminCode');
    expect(result).toBeTruthy();
  });

  it('should throw error if admin code is not provided', async () => {
    expect.assertions(2);

    try {
      await dataService.delete();
    } catch (error) {
      expect(error.message).toBe('The adminCode should be provided');
      expect(error).toBeInstanceOf(ValidationException);
    }
  });

  it('should throw error if data not found', async () => {
    expect.assertions(2);

    try {
      await dataService.delete('wrongAdminCode');
    } catch (error) {
      expect(error.message).toBe('Cannot find data for this admin code');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
