import { ApiProperty } from '@nestjs/swagger';

export class SalesVolume {
  @ApiProperty({
    description: 'ID fixo do volume de vendas',
    default: 'current',
  })
  id: string;

  @ApiProperty({ description: 'Volume de vendas' })
  volume: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
