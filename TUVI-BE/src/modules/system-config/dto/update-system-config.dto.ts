import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { SystemConfigCode } from 'src/common/constants/system-config.constant';

export class UpdateSystemConfigDto {
  @ApiProperty({
    required: false,
    description: `Required if code is ${SystemConfigCode.ZALO_NUMBER}, ${SystemConfigCode.AI_API_KEY}`,
  })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  value: string;
}
