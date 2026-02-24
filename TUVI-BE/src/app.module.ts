import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './config/database.config';
import { ScheduleModule } from '@nestjs/schedule';
import {
  IsUniqueFieldConstraint,
  IsDateOnlyConstraint,
  IsTimeOnlyConstraint,
  ExistConstraint,
} from './common/validators/index.validator';
import { PredictionModule } from './modules/prediction/prediction.module';
import { SocialAuthModule } from './modules/user_auth_provider/social-auth.module';
import { EvidenceModule } from './modules/evidence/evidence.module';
import { AreaModule } from './modules/area/area.module';
import { DomainModule } from './modules/domain/domain.module';
import { PredictionStatusModule } from './modules/prediction-status/prediction-status.module';
import { ImpactLevelModule } from './modules/impact-level/impact-level.module';
import { MailModule } from './modules/mail/mail.module';
import { LanguageModule } from './modules/language/language.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { TaskModule } from './modules/task/task.module';
import { HoroScopeModule } from './modules/horoscope/horoscope.module';
import { ToolModule } from './modules/tools/tool.module';
import { FileModule } from './modules/file/file.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    MailModule,
    AuthModule,
    UserModule,
    AreaModule,
    DomainModule,
    PredictionStatusModule,
    ImpactLevelModule,
    LanguageModule,
    PredictionModule,
    SocialAuthModule,
    EvidenceModule,
    SystemConfigModule,
    TaskModule,
    HoroScopeModule,
    ToolModule,
    FileModule,
    FirebaseModule,
  ],
  providers: [
    IsUniqueFieldConstraint,
    IsDateOnlyConstraint,
    IsTimeOnlyConstraint,
    ExistConstraint,
  ],
  exports: [
    IsUniqueFieldConstraint,
    IsDateOnlyConstraint,
    IsTimeOnlyConstraint,
  ],
})
export class AppModule {}
