import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/database/entities/index.entity';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageService],
  controllers: [LanguageController],
  exports: [LanguageService],
})
export class LanguageModule {}
