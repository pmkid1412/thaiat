import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesController } from './file.controller';

@Module({
  imports: [],
  providers: [FileService],
  controllers: [FilesController],
  exports: [FileService],
})
export class FileModule {}
