import sharp from 'sharp';

/**
 * Сервис для работы с файлами
 */
export abstract class FileService {
  /**
   * Максимальный размер большей стороны изображения
   */
  private static readonly MAX_IMAGE_CORNER_PX = 1200;

  /**
   * Проверка что файл обладает поддерживаемым сервисом форматом
   */
  static checkFileFormatIsAvailable(file: File): boolean {
    return FileService.checkFileIsImage(file) || FileService.checkFileIsVideo(file);
  }

  /**
   * Проверка что файл является изображением
   */
  static checkFileIsImage(file: File): boolean {
    return (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.type === 'image/avif'
    );
  }

  /**
   * Проверка что файл является видео
   */
  static checkFileIsVideo(file: File): boolean {
    return file.type === 'video/mp4' || file.type === 'video/webm' || file.type === 'video/mpeg';
  }

  /**
   * Предварительная обработка изображения
   */
  static async prepareImage(file: File): Promise<Buffer> {
    const image = sharp(await file.arrayBuffer());
    const metadata = await image.metadata();

    const resizedImage = metadata.height > metadata.width
      ? image.resize({ height: FileService.MAX_IMAGE_CORNER_PX })
      : image.resize({ width: FileService.MAX_IMAGE_CORNER_PX });

    return resizedImage.webp({ quality: 90 }).toBuffer();
  }
}
