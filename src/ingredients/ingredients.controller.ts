import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo ingrediente' })
  @ApiResponse({
    status: 201,
    description: 'Ingrediente criado com sucesso',
    type: Ingredient,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os ingredientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ingredientes',
    type: [Ingredient],
  })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ingrediente por ID' })
  @ApiParam({ name: 'id', description: 'ID do ingrediente' })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente encontrado',
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar ingrediente completamente' })
  @ApiParam({ name: 'id', description: 'ID do ingrediente' })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente atualizado com sucesso',
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar ingrediente parcialmente' })
  @ApiParam({ name: 'id', description: 'ID do ingrediente' })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente atualizado com sucesso',
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  patch(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover ingrediente' })
  @ApiParam({ name: 'id', description: 'ID do ingrediente' })
  @ApiResponse({ status: 204, description: 'Ingrediente removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  remove(@Param('id') id: string) {
    return this.ingredientsService.remove(id);
  }
}
