import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({ description: 'Token' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
