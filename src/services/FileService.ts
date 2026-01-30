import sharp from 'sharp';
import path from 'path';

/**
 * Сервис для работы с файлами
 */
export abstract class FileService {
  /**
   * Максимальный размер большей стороны изображения
   */
  private static readonly MAX_IMAGE_CORNER_PX = 1200;

  /**
   * Абсолютный путь до папки со шрифтами
   */
  private static readonly MAIN_FONT_PATH = path.resolve('static', 'fonts', 'Inter-Regular.ttf');

  /**
   * Получение локального шрифта в формате base64
   */
  private static async getFontInBase64(fontPath: string): Promise<string> {
    return Buffer.from(await Bun.file(fontPath).arrayBuffer()).toString('base64');
  }

  /**
   * Создания буффера с вотермаркой
   */
  private static createWatermark(fontBase64: string, text: string): Buffer {
    return Buffer.from(`
      <svg width="400" height="200">
        <style>
          @font-face {
            font-family: 'Inter';
            src: url(data:font/truetype;base64,${fontBase64});
          }
        </style>
        <text x="50%" y="50%" text-anchor="middle" font-size="40" fill="white" font-family="Inter" opacity="0.5">
          ${text}
        </text>
      </svg>
    `);
  }

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

    // prettier-ignore
    const resizedImage = metadata.height > metadata.width
        ? image.resize({ height: FileService.MAX_IMAGE_CORNER_PX })
        : image.resize({ width: FileService.MAX_IMAGE_CORNER_PX });

    const fontBase64 = await FileService.getFontInBase64(FileService.MAIN_FONT_PATH);
    const watermark = FileService.createWatermark(fontBase64, 'Вотермарочка');

    return resizedImage
      .webp({ quality: 90 })
      .composite([{ input: watermark, gravity: 'center' }])
      .toBuffer();
  }
}
