import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { UserStatus, UserType } from 'src/common/constants/index.constant';
import { PaginationDto } from 'src/common/dtos/index.dto';
import { PaginationResponseDto } from 'src/common/dtos/pagination.dto';

export class ListUserRequestDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsEnum(UserType)
  type?: number;

  @ApiProperty({ required: false, enum: UserStatus })
  @IsOptional()
  @IsString()
  @IsEnum(UserStatus)
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  userType: number;

  @ApiProperty()
  registeredAt: string;

  @ApiProperty({ enum: UserStatus })
  status: string;
}

export class ListUserResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [User] })
  data: User[];
}
