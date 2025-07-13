import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateFixedPriceDto {
  @ApiProperty({
    description: 'ID do preço fixo',
    examples: ['agua', 'luz', 'internet', 'salario', 'pro_labore'],
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Valor do preço fixo' })
  @IsNumber()
  @IsPositive()
  value: number;
}
