import { StorageService } from '$src/services/StorageService';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const files = formData.getAll('files') as File[];
  const savedFiles = await Promise.all(files.map(StorageService.saveFile));
  return json(savedFiles);
};
