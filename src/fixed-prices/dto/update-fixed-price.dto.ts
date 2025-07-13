import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateFixedPriceDto {
  @ApiProperty({ description: 'Valor do preço fixo' })
  @IsNumber()
  @IsPositive()
  value: number;
}
