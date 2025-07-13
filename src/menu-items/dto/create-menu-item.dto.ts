import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIngredientItemDto {
  @ApiProperty({ description: 'ID do ingrediente' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Quantidade do ingrediente' })
  @IsNumber()
  quantidade: number;
}

export class CreateMenuItemDto {
  @ApiProperty({ description: 'Nome do item do menu' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição do item', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'Margem de lucro', required: false })
  @IsOptional()
  @IsNumber()
  margem_lucro?: number;

  @ApiProperty({
    description: 'Lista de ingredientes e suas quantidades',
    type: [CreateIngredientItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientItemDto)
  ingredientes: CreateIngredientItemDto[];

  @ApiProperty({ description: 'Total dos ingredientes', required: false })
  @IsOptional()
  @IsNumber()
  total_ingredientes?: number;

  @ApiProperty({ description: 'Total com preços fixos', required: false })
  @IsOptional()
  @IsNumber()
  total_com_precos_fixos?: number;

  @ApiProperty({ description: 'Total iFood', required: false })
  @IsOptional()
  @IsNumber()
  total_ifood?: number;

  @ApiProperty({ description: 'Total Goomer', required: false })
  @IsOptional()
  @IsNumber()
  total_goomer?: number;

  @ApiProperty({
    description: 'Tipo do item',
    enum: ['individual', 'combo'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['individual', 'combo'])
  tipo?: 'individual' | 'combo';

  @ApiProperty({ description: 'Preço final iFood', required: false })
  @IsOptional()
  @IsNumber()
  preco_final_ifood?: number;

  @ApiProperty({ description: 'Preço final Goomer', required: false })
  @IsOptional()
  @IsNumber()
  preco_final_goomer?: number;
}
