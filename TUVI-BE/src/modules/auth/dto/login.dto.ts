import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SocialProvider } from 'src/common/constants/auth.constant';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

export class LoginRequestDto {
  @ApiProperty({ example: 'admin@mail.com' })
  @IsEmail({}, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  email: string;

  @ApiProperty({ example: 'admin123' })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  password: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  fcmToken?: string;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class SocialLoginRequestDto {
  @ApiProperty({ enum: SocialProvider, example: SocialProvider.GOOGLE })
  @IsEnum(SocialProvider, { message: ErrorResponseMessage.INVALID_VALUE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  provider: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  idToken: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  fcmToken?: string;
}
