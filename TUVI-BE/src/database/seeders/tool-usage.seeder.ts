import { DataSource } from 'typeorm';
import { ToolUsage, User } from '../entities/index.entity';
import { UserRole } from 'src/common/constants/user.constant';
import { ToolCode } from 'src/common/constants/tool.constant';

export class ToolUsageSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const userRepository = this.dataSource.getRepository(User);
    const toolUsageRepository = this.dataSource.getRepository(ToolUsage);

    const users = await userRepository.find({
      where: { userRole: UserRole.USER },
      select: ['id'],
    });

    const toolCodes: { code: string; maxUsage: number }[] = [
      {
        code: ToolCode.INVESTMENT_TOOL,
        maxUsage: 3,
      },
    ];

    for (const user of users) {
      for (const toolCode of toolCodes) {
        const { code, maxUsage } = toolCode;
        const exists = await toolUsageRepository.findOne({
          where: { toolCode: code, user: { id: user.id } },
          select: ['id'],
        });

        if (!exists) {
          const toolUsage = toolUsageRepository.create({
            toolCode: code,
            user: user,
            usedCount: 0,
            maxUsage: maxUsage,
          });
          await toolUsageRepository.save(toolUsage);
        }
      }
    }
  }
}
