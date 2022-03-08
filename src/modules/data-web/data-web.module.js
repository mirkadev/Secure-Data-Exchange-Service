const {
  clearCodeAdapter,
  dataAdapter,
  dataLogAdapter,
  metadataAdapter,
} = require('../data-persistance/data-persistance.module');
const { logger } = require('../logger/logger.module');

const { DeleteAllDataService } = require('../../domain/services/data/delete-all/delete-all-data.service');
const { DeleteDataService } = require('../../domain/services/data/delete/delete-data.service');
const { DeleteExpiredDataService } = require('../../domain/services/data/delete-expired/delete-expired-data.service');
const { GetDataService } = require('../../domain/services/data/get/get-data.service');
const { SaveDataService } = require('../../domain/services/data/save/save-data.service');
const { UpdateDataService } = require('../../domain/services/data/update/update-data.service');

const { ClearAllDataController } = require('./clear/clear-all-data.controller');
const { DeleteDataController } = require('./delete/delete-data.controller');
const { DeleteExpiredDataController } = require('./delete-expired/delete-expired-data.controller');
const { GetDataController } = require('./get/get-data.controller');
const { PushDataController } = require('./push/push-data.controller');
const { UpdateDataController } = require('./update/update-data.controller');

const deleteAllDataUseCase = new DeleteAllDataService(
  clearCodeAdapter,
  clearCodeAdapter,
  dataAdapter,
  metadataAdapter,
  metadataAdapter,
  dataLogAdapter,
  logger,
);
const deleteDataUseCase = new DeleteDataService(dataAdapter, metadataAdapter, metadataAdapter, dataLogAdapter, logger);
const deleteExpiredDataUseCase = new DeleteExpiredDataService(
  metadataAdapter,
  dataAdapter,
  metadataAdapter,
  dataLogAdapter,
  logger,
);
const getDataUseCase = new GetDataService(dataAdapter, metadataAdapter, dataLogAdapter);
const saveDataUseCase = new SaveDataService(dataAdapter, metadataAdapter);
const updateDataUseCase = new UpdateDataService(dataAdapter, metadataAdapter, metadataAdapter);

const clearAllDataController = new ClearAllDataController(deleteAllDataUseCase);
const deleteController = new DeleteDataController(deleteDataUseCase);
const deleteExpiredDataController = new DeleteExpiredDataController(deleteExpiredDataUseCase);
const getDataController = new GetDataController(getDataUseCase);
const pushDataController = new PushDataController(saveDataUseCase);
const updateDataController = new UpdateDataController(updateDataUseCase);

module.exports = {
  clearAllDataController,
  deleteController,
  deleteExpiredDataController,
  getDataController,
  pushDataController,
  updateDataController,
};
