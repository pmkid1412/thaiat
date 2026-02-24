import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area, Language } from 'src/database/entities/index.entity';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Area, Language])],
  providers: [AreaService],
  controllers: [AreaController],
  exports: [AreaService],
})
export class AreaModule {}
