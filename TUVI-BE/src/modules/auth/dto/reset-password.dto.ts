import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

export class SendEmailResetPasswordRequestDto {
  @ApiProperty()
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  email: string;
}

export class VerifyPasswordResetCodeRequestDto {
  @ApiProperty()
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  email: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  code: string;
}

export class ResetPasswordRequestDto extends VerifyPasswordResetCodeRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  newPassword: string;
}
