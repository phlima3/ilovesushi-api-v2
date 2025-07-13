import { ApiProperty } from '@nestjs/swagger';

export class FixedPrice {
  @ApiProperty({
    description: 'ID do preço fixo',
    examples: ['agua', 'luz', 'internet', 'salario', 'pro_labore'],
  })
  id: string;

  @ApiProperty({ description: 'Valor do preço fixo' })
  value: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
