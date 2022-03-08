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

  async find() {
    const pool = this._clearCodeStorage.getPool();
    const result = await pool.query('select "code" from "clear_code" limit 1');

    if (result.rows[0]) {
      return result.rows[0].code.trimEnd();
    }

    return null;
  }
}

module.exports = { ClearCodeAdapter };
