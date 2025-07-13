import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ description: 'ID fixo do token', default: 'current' })
  id: string;

  @ApiProperty({ description: 'Token atual', nullable: true })
  token: string | null;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
