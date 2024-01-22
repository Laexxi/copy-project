// fileService.js
export class FileService {
  constructor() {
    this.files = [];
  }

  setFiles(files) {
    this.files = files;
  }

  getFiles() {
    return this.files;
  }
}

export const fileService = new FileService();
