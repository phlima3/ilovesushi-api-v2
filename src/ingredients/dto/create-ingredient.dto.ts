import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({ description: 'Nome do ingrediente' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Categoria do ingrediente' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ description: 'Unidade de medida' })
  @IsString()
  @IsNotEmpty()
  unidade_medida: string;

  @ApiProperty({ description: 'Quantidade total' })
  @IsNumber()
  @IsPositive()
  quantidade_total: number;

  @ApiProperty({ description: 'Custo total' })
  @IsNumber()
  @IsPositive()
  custo_total: number;

  @ApiProperty({ description: 'Custo por unidade' })
  @IsNumber()
  @IsPositive()
  custo_por_unidade: number;

  @ApiProperty({ description: 'Fornecedor', required: false })
  @IsOptional()
  @IsString()
  fornecedor?: string;

  @ApiProperty({ description: 'Data da compra (ISO string)', required: false })
  @IsOptional()
  @IsString()
  data_compra?: string;

  @ApiProperty({
    description: 'Data de validade (ISO string)',
    required: false,
  })
  @IsOptional()
  @IsString()
  validade?: string;

  @ApiProperty({ description: 'Descrição do ingrediente', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'Custo adicional', required: false })
  @IsOptional()
  @IsNumber()
  custo_adicional?: number;
}
