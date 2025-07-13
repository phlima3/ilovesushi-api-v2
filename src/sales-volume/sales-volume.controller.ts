import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalesVolumeService } from './sales-volume.service';
import { UpdateSalesVolumeDto } from './dto/update-sales-volume.dto';
import { SalesVolume } from './entities/sales-volume.entity';

@ApiTags('sales-volume')
@Controller('sales-volume')
export class SalesVolumeController {
  constructor(private readonly salesVolumeService: SalesVolumeService) {}

  @Get('current')
  @ApiOperation({ summary: 'Obter volume de vendas atual' })
  @ApiResponse({
    status: 200,
    description: 'Volume de vendas atual',
    type: SalesVolume,
  })
  getCurrent() {
    return this.salesVolumeService.getCurrent();
  }

  @Put('current')
  @ApiOperation({ summary: 'Definir volume de vendas' })
  @ApiResponse({
    status: 200,
    description: 'Volume de vendas atualizado com sucesso',
    type: SalesVolume,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  updateCurrent(@Body() updateSalesVolumeDto: UpdateSalesVolumeDto) {
    return this.salesVolumeService.updateCurrent(updateSalesVolumeDto);
  }
}
