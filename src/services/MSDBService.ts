import { Connection, createConnection } from 'typeorm';

export class MSDBService {
  private static connection: Connection;

  static async init(): Promise<Connection> {
    this.connection = await createConnection();
    return this.connection;
  }

  static getConnection(): Connection {
    return this.connection;
  }
}
