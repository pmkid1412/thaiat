import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { UserType } from 'src/common/constants/user.constant';
import { FcmToken } from 'src/database/entities/fcm-token.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseAdmin: typeof admin,
    @InjectRepository(FcmToken)
    private readonly fcmTokenRepository: Repository<FcmToken>,
  ) {}

  async setData(path: string, data: any) {
    try {
      await this.firebaseAdmin.database().ref(path).set(data);
    } catch (e) {
      console.error('Set firebase data failed: ', e);
    }
  }

  async setUserData(user: User) {
    try {
      const path = `users/${user.id}`;
      const data = {
        email: user.email,
        type: user.userType === UserType.PRO ? 'Pro' : 'Free',
        updatedAt: Date.now(),
      };
      await this.setData(path, data);
    } catch (e) {
      console.error('Set firebase data failed: ', e);
    }
  }

  async updateData(path: string, data: any) {
    try {
      await this.firebaseAdmin.database().ref(path).update(data);
    } catch (e) {
      console.error('Update firebase data failed: ', e);
    }
  }

  async updateUserData(userId: number, data: any) {
    try {
      const path = `users/${userId}`;
      await this.updateData(path, data);
    } catch (e) {
      console.error('Update firebase data failed: ', e);
    }
  }

  async sendNotification(fcmToken: string, data?: Record<string, string>) {
    try {
      const message: admin.messaging.Message = {
        token: fcmToken,
        data,
      };

      await this.firebaseAdmin.messaging().send(message);
    } catch (e) {
      console.error('Send firebase notification failed: ', e);
    }
  }

  async sendChangePlanNotification(userId: number, newPlanType: number) {
    try {
      const fcmTokens = await this.fcmTokenRepository.find({
        where: { userId },
      });

      const tokens: string[] = fcmTokens.map((fcmToken) => fcmToken.token);

      if (tokens.length > 0) {
        const notification: { title: string; body: string } = {
          title: 'Bạn đã trở về gói Miễn phí',
          body: 'Nâng cấp Pro để mở khóa nội dung không giới hạn.',
        };
        let packageData = 'free';
        if (newPlanType === UserType.PRO) {
          notification.title = 'Nâng cấp thành công!';
          notification.body = 'Tài khoản Pro của bạn đã sẵn sàng.';

          packageData = 'pro';
        }
        const message: admin.messaging.MulticastMessage = {
          tokens,
          notification,
          data: {
            type: 'PACKAGE_CHANGED',
            package: packageData,
          },
        };

        const response = await this.firebaseAdmin
          .messaging()
          .sendEachForMulticast(message);

        response.responses.forEach((resp, index) => {
          if (!resp.success) {
            const errorCode = resp.error?.code;

            if (
              errorCode === 'messaging/registration-token-not-registered' ||
              errorCode === 'messaging/invalid-registration-token'
            ) {
              // remove token from DB
              const badToken = tokens[index];
              this.fcmTokenRepository.delete({ token: badToken });
            }
          }
        });
      }
    } catch (e) {
      console.error('Send firebase notification failed: ', e);
    }
  }
}
