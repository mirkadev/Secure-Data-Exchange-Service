const { DataLogMapper } = require('./data-log.mapper');

class DataLogAdapter {
  constructor(dataLogStorage) {
    this._dataLogStorage = dataLogStorage;
  }

  async save(metadata) {
    const mappedData = DataLogMapper.mapToDataLog(metadata);
    const pool = this._clearCodeStorage.getPool();
    const result = await pool.query(
      `
        insert into
          "data_log"
        ("filename", "shareCode", "expirationTime")
          values
        ($1, $2, $3)
        returning "id"
      `,
      [mappedData.filename, mappedData.shareCode, mappedData.expirationTime],
    );

    return result.rows[0].id;
  }

  async findByShareCode(shareCode) {
    const pool = this._clearCodeStorage.getPool();
    const result = await pool.query('select * from "data_log" where "shareCode" = $1', [shareCode]);
    const metadata = DataLogMapper.mapToMetadata(result.rows[0]);
    return metadata;
  }
}

module.exports = { DataLogAdapter };
