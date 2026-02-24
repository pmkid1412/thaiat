import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

export class RefreshTokenRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  refreshToken: string;
}
