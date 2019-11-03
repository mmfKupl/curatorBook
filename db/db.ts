import { ConnectionPool } from 'mssql';
import { dbConfig } from '../db.config';

export class DatabaseInterface {
  connection: ConnectionPool;

  constructor(connection: ConnectionPool) {
    this.connection = connection;
  }

  static async init() {
    const pool = new ConnectionPool(dbConfig);
    const conn = await pool.connect();
    return new DatabaseInterface(conn);
  }
}
