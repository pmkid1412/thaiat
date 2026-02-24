import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';
import { StreamableFile } from '@nestjs/common';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

@Injectable()
export class FileService {
  getFile = (fileName: string) => {
    const filePath = path.resolve(__dirname, '../../../', fileName);
    console.log('filePath', filePath);

    if (!existsSync(filePath)) {
      throw new NotFoundException(ErrorResponseMessage.DATA_NOT_FOUND);
    }

    const file = createReadStream(filePath);

    return new StreamableFile(file, {
      disposition: `attachment; filename="${fileName}"`,
    });
  };
}
