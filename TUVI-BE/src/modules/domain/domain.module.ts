import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain, Language } from 'src/database/entities/index.entity';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Domain, Language])],
  providers: [DomainService],
  controllers: [DomainController],
  exports: [DomainService],
})
export class DomainModule {}
