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
import { FixedPricesService } from './fixed-prices.service';
import { CreateFixedPriceDto } from './dto/create-fixed-price.dto';
import { UpdateFixedPriceDto } from './dto/update-fixed-price.dto';
import { FixedPrice } from './entities/fixed-price.entity';

@ApiTags('fixed-prices')
@Controller('fixed-prices')
export class FixedPricesController {
  constructor(private readonly fixedPricesService: FixedPricesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo preço fixo' })
  @ApiResponse({
    status: 201,
    description: 'Preço fixo criado com sucesso',
    type: FixedPrice,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createFixedPriceDto: CreateFixedPriceDto) {
    return this.fixedPricesService.create(createFixedPriceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os preços fixos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preços fixos',
    type: [FixedPrice],
  })
  findAll() {
    return this.fixedPricesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar preço fixo por ID' })
  @ApiParam({ name: 'id', description: 'ID do preço fixo' })
  @ApiResponse({
    status: 200,
    description: 'Preço fixo encontrado',
    type: FixedPrice,
  })
  @ApiResponse({ status: 404, description: 'Preço fixo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.fixedPricesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar preço fixo' })
  @ApiParam({ name: 'id', description: 'ID do preço fixo' })
  @ApiResponse({
    status: 200,
    description: 'Preço fixo atualizado com sucesso',
    type: FixedPrice,
  })
  @ApiResponse({ status: 404, description: 'Preço fixo não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(
    @Param('id') id: string,
    @Body() updateFixedPriceDto: UpdateFixedPriceDto,
  ) {
    return this.fixedPricesService.update(id, updateFixedPriceDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar preço fixo parcialmente' })
  @ApiParam({ name: 'id', description: 'ID do preço fixo' })
  @ApiResponse({
    status: 200,
    description: 'Preço fixo atualizado com sucesso',
    type: FixedPrice,
  })
  @ApiResponse({ status: 404, description: 'Preço fixo não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  patch(
    @Param('id') id: string,
    @Body() updateFixedPriceDto: UpdateFixedPriceDto,
  ) {
    return this.fixedPricesService.update(id, updateFixedPriceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover preço fixo' })
  @ApiParam({ name: 'id', description: 'ID do preço fixo' })
  @ApiResponse({ status: 204, description: 'Preço fixo removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Preço fixo não encontrado' })
  remove(@Param('id') id: string) {
    return this.fixedPricesService.remove(id);
  }
}
