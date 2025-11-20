import { DATABASE_CONNECTION_STRING } from '$env/static/private';
import { Pool, type PoolClient, type QueryResult, type QueryResultRow } from 'pg';

export abstract class Database {
  /**
   * Пул клиентов для работы с БД
   */
  private static readonly pool = new Pool({ connectionString: DATABASE_CONNECTION_STRING });

  /**
   * Запрос к базе данных
   */
  static readonly query = Database.pool.query.bind(Database.pool);

  /**
   * Оптимизация запроса
   */
  static compileQuery<TRow extends QueryResultRow>(query: string) {
    const optimizedQuery = query.replaceAll(/\s{2,}/g, ' ').trim();
    return (args?: unknown[]): Promise<QueryResult<TRow>> => Database.query<TRow>(optimizedQuery, args);
  }

  /**
   * Транзакция
   */
  static async transaction<TResult = void>(callback: (client: PoolClient) => Promise<TResult>): Promise<TResult> {
    const client = await Database.pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
