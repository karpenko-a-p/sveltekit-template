import { STATIC_FOLDER_NAME } from '$env/static/private';
import fs from 'fs/promises';
import path from 'path';

export abstract class StorageService {
  /**
   * Путь к медиа файлам
   */
  private static readonly STATIC_FOLDER = path.resolve(STATIC_FOLDER_NAME);

  /**
   * Создание папки со статикой
   */
  private static createStaticFolder(): Promise<void> {
    return fs.mkdir(StorageService.STATIC_FOLDER, { recursive: true }) as Promise<void>;
  }

  /**
   * Убеждение в существовании папки со статикой
   */
  private static ensureStaticFolderCreated(): Promise<void> {
    return fs.access(StorageService.STATIC_FOLDER).catch(StorageService.createStaticFolder);
  }

  /**
   * Сохранение файла
   */
  static async saveFile(file: File): Promise<string> {
    const filename = crypto.randomUUID() + path.extname(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await StorageService.ensureStaticFolderCreated();
    await fs.writeFile(path.join(StorageService.STATIC_FOLDER, filename), buffer);
    return filename;
  }
}
