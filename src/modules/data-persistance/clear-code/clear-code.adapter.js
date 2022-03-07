class ClearCodeAdapter {
  constructor(clearCodeStorage) {
    this._clearCodeStorage = clearCodeStorage;
  }

  async save(clearCode) {
    const pool = this._clearCodeStorage.getPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`delete from "clear_code" where id is not null`);
      await client.query('insert into "clear_code" ("code") values ($1)', [clearCode]);
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async find(clearCode) {
    const pool = this._clearCodeStorage.getPool();
    const result = await pool.query('select "code" from "clear_code" where "code" = $1 limit 1', [clearCode]);

    if (result.rows[0]) {
      return result.rows[0].code;
    }

    return null;
  }
}

module.exports = { ClearCodeAdapter };
