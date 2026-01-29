import { StorageService } from '$src/services/StorageService';
import { json, type RequestHandler } from '@sveltejs/kit';
import { FileService } from '$src/services/FileService';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const files = formData.getAll('files') as File[];
  const savedFiles: string[] = [];

  for (const file of files) {
    if (!FileService.checkFileIsImage(file)) continue;
    const preparedFileBuffer = await FileService.prepareImage(file);
    savedFiles.push(await StorageService.saveBufferToFile(preparedFileBuffer));
  }

  return json(savedFiles);
};
