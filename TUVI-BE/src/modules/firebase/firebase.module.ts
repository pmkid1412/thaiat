import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';
import { env } from 'src/config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmToken } from 'src/database/entities/fcm-token.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FcmToken])],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        try {
          if (admin.apps.length === 0) {
            admin.initializeApp({
              credential: admin.credential.cert({
                projectId: env.FIREBASE.FIREBASE_PROJECT_ID,
                clientEmail: env.FIREBASE.FIREBASE_CLIENT_EMAIL,
                privateKey: env.FIREBASE.FIREBASE_PRIVATE_KEY?.replace(
                  /\\n/g,
                  '\n',
                ).trim(),
              }),
              databaseURL: env.FIREBASE.FIREBASE_DATABASE_URL,
            });
          }
        } catch (e) {
          console.error(e);
          throw e;
        }

        return admin;
      },
    },
    FirebaseService,
  ],
  exports: ['FIREBASE_ADMIN', FirebaseService],
})
export class FirebaseModule {}
