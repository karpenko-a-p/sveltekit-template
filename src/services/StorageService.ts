import { STATIC_FOLDER_NAME } from '$env/static/private';
import fs from 'fs/promises';
import path from 'path';

/**
 * Хранилище медиафайлов
 */
export abstract class StorageService {
  /**
   * Путь к медиа файлам
   */
  private static readonly STATIC_FOLDER = path.resolve(STATIC_FOLDER_NAME);

  /**
   * Создание уникального имени для файла
   */
  private static async createFileName(filename: string): Promise<string> {
    let newFilename: string;

    do {
      newFilename = crypto.randomUUID() + path.extname(filename);
    } while (await StorageService.checkFileExists(filename));

    return newFilename;
  }

  /**
   * Получение пути папки текущего дня
   */
  private static createTodayFolderPath(): string {
    const today = new Date();

    // prettier-ignore
    return path.join(
      String(today.getFullYear()),
      String(today.getMonth() + 1),
      String(today.getDate())
    );
  }

  /**
   * Создание папки
   */
  private static createFolder(folderPath: string): Promise<void> {
    return fs.mkdir(folderPath, { recursive: true }) as Promise<void>;
  }

  /**
   * Убеждение в существовании папки
   */
  private static ensureFolderCreated(folderPath: string): Promise<void> {
    return fs.access(folderPath).catch(() => StorageService.createFolder(folderPath));
  }

  /**
   * Проверка что файл существует
   */
  static checkFileExists(filename: string): Promise<boolean> {
    return Bun.file(filename).exists();
  }

  /**
   * Сохранение файла
   */
  static async saveFile(file: File): Promise<string> {
    const filename = await StorageService.createFileName(file.name);
    const fileFutureLocation = StorageService.createTodayFolderPath();
    const buffer = Buffer.from(await file.arrayBuffer());
    await StorageService.ensureFolderCreated(path.join(StorageService.STATIC_FOLDER, fileFutureLocation));
    await fs.writeFile(path.join(StorageService.STATIC_FOLDER, fileFutureLocation, filename), buffer);
    return path.join(fileFutureLocation, filename);
  }
}
