// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  async uploadFile(file: any): Promise<string> {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}-${filename}`;
    const filePath = join(process.cwd(), 'uploads', uniqueFilename);

    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => resolve(uniqueFilename))
        .on('error', (error) => reject(error)),
    );
  }
}
