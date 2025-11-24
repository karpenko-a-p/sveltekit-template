export abstract class FileApi {
  static async createImage(files: FileList): Promise<void> {
    if (!files.length) return;

    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file);
    }

    await fetch('/api/v1/file/image', { method: 'POST', body: formData });
  }
}
