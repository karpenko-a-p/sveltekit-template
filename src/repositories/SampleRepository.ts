import { Database } from '$src/database/Database';

export abstract class SampleRepository {
  static async sampleRetSomething(): Promise<void> {
    const { rows } = await Database.query('SELECT 1 FROM table;');
    return void rows;
  }
}
