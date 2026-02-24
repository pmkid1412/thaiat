import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

export class RegisterRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  name: string;

  @ApiProperty()
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  email: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  password: string;
}

export class VerifyEmailRequestDto {
  @ApiProperty()
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  email: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @Length(6, 6, { message: ErrorResponseMessage.INVALID_RANGE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  code: string;
}

export class ResendVerificationRequestDto {
  @ApiProperty()
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  email: string;
}
