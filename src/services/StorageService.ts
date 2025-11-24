import { STATIC_FOLDER_NAME } from '$env/static/private';
import fs from 'fs/promises';
import path from 'path';

export abstract class StorageService {
  private static readonly staticFolder = path.resolve(STATIC_FOLDER_NAME);

  /**
   * Создание папки со статикой
   */
  private static createStaticFolder(): Promise<void> {
    return fs.mkdir(StorageService.staticFolder, { recursive: true }) as Promise<void>;
  }

  /**
   * Убеждение в существовании папки со статикой
   */
  private static ensureStaticFolderCreated(): Promise<void> {
    return fs.access(StorageService.staticFolder).catch(StorageService.createStaticFolder);
  }

  /**
   * Сохранение файла
   */
  static async saveFile(file: File): Promise<string> {
    const filename = crypto.randomUUID() + path.extname(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await StorageService.ensureStaticFolderCreated();
    await fs.writeFile(path.join(StorageService.staticFolder, filename), buffer);
    return filename;
  }
}
