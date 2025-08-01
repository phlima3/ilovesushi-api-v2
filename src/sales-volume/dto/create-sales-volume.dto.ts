import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateSalesVolumeDto {
  @ApiProperty({ description: 'Volume de vendas' })
  @IsNumber()
  @IsPositive()
  volume: number;
}
