import { ApiProperty } from '@nestjs/swagger';

export class Ingredient {
  @ApiProperty({ description: 'ID único do ingrediente' })
  id: string;

  @ApiProperty({ description: 'Nome do ingrediente' })
  nome: string;

  @ApiProperty({ description: 'Categoria do ingrediente' })
  categoria: string;

  @ApiProperty({ description: 'Unidade de medida' })
  unidade_medida: string;

  @ApiProperty({ description: 'Quantidade total' })
  quantidade_total: number;

  @ApiProperty({ description: 'Custo total' })
  custo_total: number;

  @ApiProperty({ description: 'Custo por unidade' })
  custo_por_unidade: number;

  @ApiProperty({ description: 'Fornecedor', required: false })
  fornecedor?: string;

  @ApiProperty({ description: 'Data da compra (ISO string)', required: false })
  data_compra?: string;

  @ApiProperty({
    description: 'Data de validade (ISO string)',
    required: false,
  })
  validade?: string;

  @ApiProperty({ description: 'Descrição do ingrediente', required: false })
  descricao?: string;

  @ApiProperty({ description: 'Custo adicional', required: false })
  custo_adicional?: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
