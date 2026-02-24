import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { FileService } from './file.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AdminGuard)
  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.fileService.getFile(filename);
  }
}
