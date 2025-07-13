import { ApiProperty } from '@nestjs/swagger';

export class IngredientItem {
  @ApiProperty({ description: 'ID do ingrediente' })
  id: string;

  @ApiProperty({ description: 'Quantidade do ingrediente' })
  quantidade: number;
}

export class MenuItem {
  @ApiProperty({ description: 'ID único do item do menu' })
  id: string;

  @ApiProperty({ description: 'Nome do item do menu' })
  nome: string;

  @ApiProperty({ description: 'Descrição do item', required: false })
  descricao?: string;

  @ApiProperty({ description: 'Margem de lucro', required: false })
  margem_lucro?: number;

  @ApiProperty({
    description: 'Lista de ingredientes e suas quantidades',
    type: [IngredientItem],
  })
  ingredientes: IngredientItem[];

  @ApiProperty({ description: 'Total dos ingredientes', required: false })
  total_ingredientes?: number;

  @ApiProperty({ description: 'Total com preços fixos', required: false })
  total_com_precos_fixos?: number;

  @ApiProperty({ description: 'Total iFood', required: false })
  total_ifood?: number;

  @ApiProperty({ description: 'Total Goomer', required: false })
  total_goomer?: number;

  @ApiProperty({
    description: 'Tipo do item',
    enum: ['individual', 'combo'],
    required: false,
  })
  tipo?: 'individual' | 'combo';

  @ApiProperty({ description: 'Preço final iFood', required: false })
  preco_final_ifood?: number;

  @ApiProperty({ description: 'Preço final Goomer', required: false })
  preco_final_goomer?: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
