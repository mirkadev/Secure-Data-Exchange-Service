const { postgres } = require('../../storages/postgres/postgres');
const { ClearCodeAdapter } = require('./clear-code/clear-code.adapter');
const { DataAdapter } = require('./data/data.adapter');
const { DataLogAdapter } = require('./data-log/data-log.adapter');
const { MetadataAdapter } = require('./metadata/metadata.adapter');
const { MetadataModel } = require('./metadata/metadata.odm-entity');

const clearCodeAdapter = new ClearCodeAdapter(postgres);
const dataAdapter = new DataAdapter();
const dataLogAdapter = new DataLogAdapter(postgres);
const metadataAdapter = new MetadataAdapter(MetadataModel);

module.exports = {
  clearCodeAdapter,
  dataAdapter,
  dataLogAdapter,
  metadataAdapter,
};
