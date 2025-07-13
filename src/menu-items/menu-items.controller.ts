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
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './entities/menu-item.entity';

@ApiTags('menu-items')
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo item do menu' })
  @ApiResponse({
    status: 201,
    description: 'Item do menu criado com sucesso',
    type: MenuItem,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens do menu' })
  @ApiResponse({
    status: 200,
    description: 'Lista de itens do menu',
    type: [MenuItem],
  })
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item do menu por ID' })
  @ApiParam({ name: 'id', description: 'ID do item do menu' })
  @ApiResponse({
    status: 200,
    description: 'Item do menu encontrado',
    type: MenuItem,
  })
  @ApiResponse({ status: 404, description: 'Item do menu não encontrado' })
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar item do menu completamente' })
  @ApiParam({ name: 'id', description: 'ID do item do menu' })
  @ApiResponse({
    status: 200,
    description: 'Item do menu atualizado com sucesso',
    type: MenuItem,
  })
  @ApiResponse({ status: 404, description: 'Item do menu não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar item do menu parcialmente' })
  @ApiParam({ name: 'id', description: 'ID do item do menu' })
  @ApiResponse({
    status: 200,
    description: 'Item do menu atualizado com sucesso',
    type: MenuItem,
  })
  @ApiResponse({ status: 404, description: 'Item do menu não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  patch(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover item do menu' })
  @ApiParam({ name: 'id', description: 'ID do item do menu' })
  @ApiResponse({
    status: 204,
    description: 'Item do menu removido com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Item do menu não encontrado' })
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(id);
  }
}
