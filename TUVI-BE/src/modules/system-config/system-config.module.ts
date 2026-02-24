import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from 'src/database/entities/index.entity';
import { SystemConfigService } from './system-config.service';
import { SystemConfigController } from './system-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfig])],
  providers: [SystemConfigService],
  controllers: [SystemConfigController],
  exports: [SystemConfigService],
})
export class SystemConfigModule {}
