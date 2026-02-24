import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from 'src/database/entities/system-config.entity';
import { ToolMetadata } from 'src/database/entities/tool-metadata.entity';
import { Language } from 'src/database/entities/language.entity';
import { ToolUsage } from 'src/database/entities/tool-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemConfig, ToolMetadata, Language, ToolUsage]),
  ],
  providers: [ToolService],
  controllers: [ToolController],
  exports: [ToolService],
})
export class ToolModule {}
