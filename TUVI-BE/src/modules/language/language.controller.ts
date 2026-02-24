import { Controller, Get } from '@nestjs/common';
import { LanguageService } from './language.service';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { LanguageDto } from './dto/list-language.dto';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiBaseResponse({ model: [LanguageDto] })
  @Get()
  findAll() {
    return this.languageService.findAll();
  }
}
