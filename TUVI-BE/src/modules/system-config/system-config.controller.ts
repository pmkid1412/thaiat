import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiBaseResponse,
  CurrentUser,
} from 'src/common/decorators/index.decorator';
import { SystemConfigService } from './system-config.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListSystemConfigDto } from './dto/list-system-config.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import {
  ErrorResponseMessage,
  SuccessResponseMessage,
} from 'src/common/constants/message.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { ValidatorUtil } from 'src/common/utils/validator.util';

@ApiBearerAuth()
@Controller('configs')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBaseResponse({ model: [ListSystemConfigDto] })
  findAll(@CurrentUser() currentUser): Promise<ListSystemConfigDto[]> {
    return this.systemConfigService.findAll(currentUser);
  }

  @UseGuards(AdminGuard)
  @Put(':code')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const timestamp = Date.now();

          // remove extension from original name
          const name = basename(file.originalname, extname(file.originalname));

          // optional: clean filename (recommended)
          const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '');

          const extension = extname(file.originalname);

          cb(null, `${timestamp}_${safeName}${extension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv') {
          cb(null, true);
        } else {
          const error = ValidatorUtil.addCustomError('file', {
            isInvalid: ErrorResponseMessage.INVALID_FILE_TYPE,
          });
          cb(new BadRequestException({ errors: [error] }), false);
        }
      },
    }),
  )
  @ApiBaseResponse({ badRequest: true })
  async update(
    @Param('code') code: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateSystemConfigDto,
    @CurrentUser() currentUser,
  ) {
    await this.systemConfigService.update(code, dto, file, currentUser);

    return { message: SuccessResponseMessage.DATA_UPDATED };
  }
}
