import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserRole, UserType } from 'src/common/constants/index.constant';

export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const userRepository = this.dataSource.getRepository(User);

    const exists = await userRepository.findOne({
      where: { email: 'admin@mail.com' },
    });
    if (!exists) {
      await this.dataSource.transaction(async (manager) => {
        const admin = manager.create(User, {
          email: 'admin@mail.com',
          password: await bcrypt.hash('admin123', 10),
          userRole: UserRole.ADMIN,
        });
        await manager.save(admin);

        console.log('Seeder: admin created');
      });
    } else {
      console.log('Seeder: admin already exists');
    }

    const userEmails: string[] = ['freeuser@mail.com', 'prouser@mail.com'];
    for (const [index, email] of userEmails.entries()) {
      const exists = await userRepository.findOne({
        where: { email },
      });
      if (!exists) {
        await this.dataSource.transaction(async (manager) => {
          const user = manager.create(User, {
            email,
            password: await bcrypt.hash('user123', 10),
            userRole: UserRole.USER,
            userType: index,
            emailVerifiedAt: new Date(),
            language: { id: 1 },
          });
          await manager.save(user);

          console.log(`Seeder: user ${email} created`);
        });
      } else {
        console.log(`Seeder: user ${email} already exists`);
      }
    }
  }
}
