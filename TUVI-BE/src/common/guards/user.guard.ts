import { UserRole } from 'src/common/constants/index.constant';
import { RoleGuard } from './role.guard';

export const UserGuard = RoleGuard(UserRole.USER);
